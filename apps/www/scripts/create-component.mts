#!/usr/bin/env node
import { promises as fs } from "fs"
import path from "path"
import prompts from "prompts"

async function createComponent() {
  const response = await prompts([
    {
      type: "text",
      name: "name",
      message: "组件名称 (kebab-case):",
      validate: (value) => /^[a-z]+(-[a-z]+)*$/.test(value) || "请使用 kebab-case"
    },
    {
      type: "text",
      name: "title",
      message: "组件标题:",
    },
    {
      type: "text",
      name: "description",
      message: "组件描述:",
    },
    {
      type: "multiselect",
      name: "types",
      message: "创建哪些类型?",
      choices: [
        { title: "Primitive (原语)", value: "primitive", selected: true },
        { title: "Composed (组合)", value: "composed", selected: true },
        { title: "Example (示例)", value: "example", selected: true },
        { title: "Documentation (文档)", value: "doc", selected: true },
      ],
    }
  ])

  const { name, title, description, types } = response
  
  const results: string[] = []
  
  // 创建 primitive
  if (types.includes("primitive")) {
    await createPrimitive(name, title, description)
    results.push(`✅ Primitive: registry/wuhan/blocks/${name}/${name}-01.tsx`)
  }
  
  // 创建 composed
  if (types.includes("composed")) {
    await createComposed(name, title, description)
    results.push(`✅ Composed: registry/wuhan/composed/${name}/${name}.tsx`)
  }
  
  // 创建 example
  if (types.includes("example")) {
    await createExample(name)
    results.push(`✅ Example: registry/wuhan/examples/${name}/${name}-default.tsx`)
  }
  
  // 创建文档
  if (types.includes("doc")) {
    await createDocumentation(name, title, description)
    results.push(`✅ Documentation: content/docs/blocks/${name}.mdx`)
  }
  
  console.log(`\n✅ 组件 ${name} 创建成功！\n`)
  results.forEach(r => console.log(`   ${r}`))
  console.log(`\n📝 下一步：`)
  console.log(`1. 编辑组件代码`)
  console.log(`2. 运行 pnpm registry:build 构建注册表`)
  console.log(`3. 访问 http://localhost:3000/docs/blocks/${name}`)
}

async function createPrimitive(name: string, title: string, description: string) {
  const dir = path.join(process.cwd(), `registry/wuhan/blocks/${name}`)
  await fs.mkdir(dir, { recursive: true })
  
  const componentCode = `import * as React from "react"
import { cn } from "@/lib/utils"

export const ${toPascalCase(name)}ContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
${toPascalCase(name)}ContainerPrimitive.displayName = "${toPascalCase(name)}ContainerPrimitive"
`
  
  await fs.writeFile(path.join(dir, `${name}-01.tsx`), componentCode)
  
  // 自动注册到 _registry.ts
  await autoRegisterBlock(name, title, description)
}

async function createComposed(name: string, title: string, description: string) {
  const dir = path.join(process.cwd(), `registry/wuhan/composed/${name}`)
  await fs.mkdir(dir, { recursive: true })
  
  const componentCode = `import * as React from "react"
import { ${toPascalCase(name)}ContainerPrimitive } from "@/registry/wuhan/blocks/${name}/${name}-01"

export interface ${toPascalCase(name)}Props {
  children?: React.ReactNode
  className?: string
}

export function ${toPascalCase(name)}({
  children,
  className,
}: ${toPascalCase(name)}Props) {
  return (
    <${toPascalCase(name)}ContainerPrimitive className={className}>
      {children || "${toPascalCase(name)}"}
    </${toPascalCase(name)}ContainerPrimitive>
  )
}
`
  
  await fs.writeFile(path.join(dir, `${name}.tsx`), componentCode)
  
  // 自动注册到 _registry.ts
  await autoRegisterComposed(name, title, description)
}

async function createExample(name: string) {
  const dir = path.join(process.cwd(), `registry/wuhan/examples/${name}`)
  await fs.mkdir(dir, { recursive: true })
  
  const exampleCode = `import { ${toPascalCase(name)} } from "@/registry/wuhan/composed/${name}/${name}"

export default function ${toPascalCase(name)}Default() {
  return <${toPascalCase(name)} />
}
`
  
  await fs.writeFile(path.join(dir, `${name}-default.tsx`), exampleCode)
  
  // 自动注册到 _registry.ts
  await autoRegisterExample(name)
}

async function createDocumentation(name: string, title: string, description: string) {
  const docPath = path.join(process.cwd(), `content/docs/blocks/${name}.mdx`)
  
  const docContent = `---
title: ${title}
description: ${description}
author: AF
---

<ComponentPreview name="${name}-default" description="${description}" className="mb-4" />

${description}

## 快速开始

\`\`\`tsx
import { ${toPascalCase(name)} } from "@/registry/wuhan/composed/${name}";

export function Example() {
  return <${toPascalCase(name)} />;
}
\`\`\`

## 安装

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>

<TabsContent value="cli">

\`\`\`bash
npx shadcn@latest add "https://unnamed-ui.com/r/wuhan/${name}"
\`\`\`

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>复制以下代码到你的项目</Step>

<ComponentSource name="${name}" />

<Step>更新导入路径以匹配你的项目设置</Step>

</Steps>

</TabsContent>

</CodeTabs>

## 代码演示

### 基础用法

<ComponentPreview
  name="${name}-default"
  description="基础用法"
  className="mb-4"
/>

## API

### ${toPascalCase(name)}

${description}

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`children\` | \`ReactNode\` | \`"${toPascalCase(name)}"\` | 组件内容 |
| \`className\` | \`string\` | - | 容器自定义类名 |

## 原语组件

${toPascalCase(name)} 组件基于以下原语组件构建：

- \`${toPascalCase(name)}ContainerPrimitive\`: 容器组件

如需更灵活的定制，可以直接使用这些原语组件。
`
  
  await fs.writeFile(docPath, docContent)
}

async function autoRegisterBlock(name: string, title: string, description: string) {
  const registryPath = path.join(process.cwd(), "registry/wuhan/blocks/_registry.ts")
  const content = await fs.readFile(registryPath, "utf-8")
  
  const newEntry = `  {
    name: "${name}-01",
    type: "registry:block",
    title: "${title}",
    description: "${description}",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/${name}/${name}-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/${name}-01.tsx",
      },
    ],
  },`
  
  // 在最后一个数组元素之前插入
  const insertPosition = content.lastIndexOf("]")
  const updatedContent = content.slice(0, insertPosition) + newEntry + "\n" + content.slice(insertPosition)
  
  await fs.writeFile(registryPath, updatedContent)
  console.log(`   📝 已注册到 blocks/_registry.ts`)
}

async function autoRegisterComposed(name: string, title: string, description: string) {
  const registryPath = path.join(process.cwd(), "registry/wuhan/composed/_registry.ts")
  const content = await fs.readFile(registryPath, "utf-8")
  
  const newEntry = `  {
    name: "${name}",
    type: "registry:block",
    title: "${title}",
    description: "${description}",
    registryDependencies: ["${name}-01"],
    files: [
      {
        path: "composed/${name}/${name}.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/${name}.tsx",
      },
    ],
  },`
  
  // 在最后一个数组元素之前插入
  const insertPosition = content.lastIndexOf("]")
  const updatedContent = content.slice(0, insertPosition) + newEntry + "\n" + content.slice(insertPosition)
  
  await fs.writeFile(registryPath, updatedContent)
  console.log(`   📝 已注册到 composed/_registry.ts`)
}

async function autoRegisterExample(name: string) {
  const registryPath = path.join(process.cwd(), "registry/wuhan/examples/_registry.ts")
  const content = await fs.readFile(registryPath, "utf-8")
  
  const newEntry = `  {
    name: "${name}-default",
    type: "registry:example",
    registryDependencies: ["${name}"],
    files: [
      {
        path: "examples/${name}/${name}-default.tsx",
        type: "registry:example",
      },
    ],
  },`
  
  // 在最后一个数组元素之前插入
  const insertPosition = content.lastIndexOf("]")
  const updatedContent = content.slice(0, insertPosition) + newEntry + "\n" + content.slice(insertPosition)
  
  await fs.writeFile(registryPath, updatedContent)
  console.log(`   📝 已注册到 examples/_registry.ts`)
}

function toPascalCase(str: string): string {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

createComponent().catch(console.error)
