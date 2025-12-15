import { promises as fs } from "fs"
import { tmpdir } from "os"
import path from "path"
import { registryItemFileSchema, registryItemSchema } from "shadcn/schema"
import { Project, ScriptKind } from "ts-morph"
import { z } from "zod"

import { Index } from "@/registry/__index__"
import { type Style } from "@/registry/styles"

export function getRegistryComponent(name: string, styleName: Style["name"]) {
  return Index[styleName]?.[name]?.component
}

export async function getRegistryItems(
  styleName: Style["name"],
  filter?: (item: z.infer<typeof registryItemSchema>) => boolean
) {
  const styleIndex = Index[styleName]

  if (!styleIndex) {
    return []
  }

  const entries = Object.values(styleIndex)

  const filteredEntries = filter ? entries.filter(filter) : entries

  return await Promise.all(
    filteredEntries.map(async (entry) => {
      const item = await getRegistryItem(entry.name, styleName)
      return item
    })
  ).then((results) => results.filter(Boolean))
}

export async function getRegistryItem(name: string, styleName: Style["name"]) {
  const item = Index[styleName]?.[name]

  if (!item) {
    return null
  }

  // Convert all file paths to object.
  // TODO: remove when we migrate to new registry.
  item.files = item.files.map((file: unknown) =>
    typeof file === "string" ? { path: file } : file
  )

  // Fail early before doing expensive file operations.
  const result = registryItemSchema.safeParse(item)
  if (!result.success) {
    return null
  }

  let files: typeof result.data.files = []
  for (const file of item.files) {
    const content = await getFileContent(file)
    const relativePath = path.relative(process.cwd(), file.path)

    files.push({
      ...file,
      path: relativePath,
      content,
    })
  }

  // Fix file paths.
  files = fixFilePaths(files, styleName)

  const parsed = registryItemSchema.safeParse({
    ...result.data,
    files,
  })

  if (!parsed.success) {
    console.error(parsed.error.message)
    return null
  }

  return parsed.data
}

async function getFileContent(file: z.infer<typeof registryItemFileSchema>) {
  const raw = await fs.readFile(file.path, "utf-8")

  const project = new Project({
    compilerOptions: {},
  })

  const tempFile = await createTempSourceFile(file.path)
  const sourceFile = project.createSourceFile(tempFile, raw, {
    scriptKind: ScriptKind.TSX,
  })

  // Remove meta variables.
  // removeVariable(sourceFile, "iframeHeight")
  // removeVariable(sourceFile, "containerClassName")
  // removeVariable(sourceFile, "description")

  let code = sourceFile.getFullText()

  // Some registry items uses default export.
  // We want to use named export instead.
  // TODO: do we really need this? - @shadcn.
  if (file.type !== "registry:page") {
    code = code.replaceAll("export default", "export")
  }

  // Fix imports.
  code = fixImport(code)

  return code
}

function getFileTarget(
  file: z.infer<typeof registryItemFileSchema>,
  styleName?: Style["name"]
) {
  let target = file.target

  if (!target || target === "") {
    const fileName = file.path.split("/").pop()
    
    if (file.type === "registry:ui") {
      // UI组件保持扁平结构，因为它们是通用的基础组件
      target = `components/ui/${fileName}`
    } else if (file.type === "registry:block") {
      // Block组件按插件组织：components/{styleName}/blocks/{fileName}
      target = styleName
        ? `components/${styleName}/blocks/${fileName}`
        : `components/blocks/${fileName}`
    } else if (file.type === "registry:component") {
      // Component组件按插件组织：components/{styleName}/components/{fileName}
      target = styleName
        ? `components/${styleName}/components/${fileName}`
        : `components/components/${fileName}`
    } else if (file.type === "registry:example") {
      // Example组件按插件组织：components/{styleName}/examples/{fileName}
      target = styleName
        ? `components/${styleName}/examples/${fileName}`
        : `components/examples/${fileName}`
    } else if (file.type === "registry:hook") {
      target = `hooks/${fileName}`
    } else if (file.type === "registry:lib") {
      target = `lib/${fileName}`
    }
  }

  return target ?? ""
}

async function createTempSourceFile(filename: string) {
  const dir = await fs.mkdtemp(path.join(tmpdir(), "shadcn-"))
  return path.join(dir, filename)
}

function fixFilePaths(
  files: z.infer<typeof registryItemSchema>["files"],
  styleName?: Style["name"]
) {
  if (!files) {
    return []
  }

  // Resolve all paths relative to the first file's directory.
  const firstFilePath = files[0].path
  const firstFilePathDir = path.dirname(firstFilePath)

  return files.map((file) => {
    return {
      ...file,
      path: path.relative(firstFilePathDir, file.path),
      target: getFileTarget(file, styleName),
    }
  })
}

export function fixImport(content: string) {
  // 匹配 registry 路径，例如：
  // @/registry/wuhan/ui/button -> @/components/ui/button
  // @/registry/wuhan/blocks/sender-01 -> @/components/wuhan/blocks/sender-01
  // @/registry/wuhan/examples/sender-default -> @/components/wuhan/examples/sender-default
  const regex = /@\/registry\/([\w-]+)\/(ui|blocks|examples|components)\/([\w-/]+)/g

  const replacement = (
    match: string,
    styleName: string,
    type: string,
    component: string
  ) => {
    if (type === "ui") {
      // UI组件保持扁平结构
      const componentName = component.split("/").pop() || component
      return `@/components/ui/${componentName}`
    } else if (type === "blocks") {
      // Block组件按插件组织
      return `@/components/${styleName}/blocks/${component}`
    } else if (type === "examples") {
      // Example组件按插件组织
      return `@/components/${styleName}/examples/${component}`
    } else if (type === "components") {
      // Component组件按插件组织
      return `@/components/${styleName}/components/${component}`
    }

    return match
  }

  // 先处理新的 registry 路径结构
  let result = content.replace(regex, replacement)

  // 保留原有的通用路径处理（用于其他情况）
  const legacyRegex = /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib))\/([\w-]+)/g

  const legacyReplacement = (
    match: string,
    path: string,
    type: string,
    component: string
  ) => {
    // 如果已经被上面的正则处理过，跳过
    if (match.includes("/components/")) {
      return match
    }

    if (type.endsWith("components")) {
      return `@/components/${component}`
    } else if (type.endsWith("ui")) {
      return `@/components/ui/${component}`
    } else if (type.endsWith("hooks")) {
      return `@/hooks/${component}`
    } else if (type.endsWith("lib")) {
      return `@/lib/${component}`
    }

    return match
  }

  return result.replace(legacyRegex, legacyReplacement)
}

export type FileTree = {
  name: string
  path?: string
  children?: FileTree[]
}

export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>
) {
  const root: FileTree[] = []

  for (const file of files) {
    const path = file.target ?? file.path
    const parts = path.split("/")
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isFile = i === parts.length - 1
      const existingNode = currentLevel.find((node) => node.name === part)

      if (existingNode) {
        if (isFile) {
          // Update existing file node with full path
          existingNode.path = path
        } else {
          // Move to next level in the tree
          currentLevel = existingNode.children!
        }
      } else {
        const newNode: FileTree = isFile
          ? { name: part, path }
          : { name: part, children: [] }

        currentLevel.push(newNode)

        if (!isFile) {
          currentLevel = newNode.children!
        }
      }
    }
  }

  return root
}
