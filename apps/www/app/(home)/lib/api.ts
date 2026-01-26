import "server-only"

import { type Style } from "@/registry/styles"
import { Index } from "@/registry/__index__"
import { ALLOWED_ITEM_TYPES } from "./constants"

export async function getItemsForStyle(styleName: Style["name"] = "wuhan") {
  const index = Index[styleName]

  if (!index) {
    return []
  }

  return Object.values(index).filter((item) =>
    ALLOWED_ITEM_TYPES.includes(item.type)
  )
}

export async function getStyleItem(name: string, styleName: Style["name"] = "wuhan") {
  const index = Index[styleName]

  if (!index?.[name]) {
    return null
  }

  return index[name]
}

export async function getStyleComponent(name: string, styleName: Style["name"] = "wuhan") {
  const index = Index[styleName]

  if (!index?.[name]) {
    return null
  }

  return index[name].component
}

/**
 * 获取所有 block 的基础示例（每个 block 的 -demo 示例）
 */
export async function getAllBlockDemos(styleName: Style["name"] = "wuhan") {
  const index = Index[styleName]

  if (!index) {
    return []
  }

  const blocks = Object.values(index).filter(
    (item) => item.type === "registry:block"
  )

  const demos: Array<{ blockName: string; demoName: string }> = []

  for (const block of blocks) {
    // 查找对应的 -demo 示例
    // 规则：去掉 -01 后缀，然后加上 -demo
    // 特殊情况：prompt-01 -> prompt-horizontal, prompt-02 -> prompt-vertical
    let demoName: string | undefined

    if (block.name === "prompt-01") {
      demoName = "prompt-horizontal"
    } else if (block.name === "prompt-02") {
      demoName = "prompt-vertical"
    } else {
      demoName = `${block.name.replace(/-01$/, "")}-demo`
    }

    // 检查示例是否存在
    if (demoName && index[demoName]?.type === "registry:example") {
      demos.push({
        blockName: block.name,
        demoName,
      })
    }
  }

  return demos.sort((a, b) => a.blockName.localeCompare(b.blockName))
}

/**
 * 获取指定 block 的所有示例
 */
export async function getBlockExamples(
  blockName: string,
  styleName: Style["name"] = "wuhan"
) {
  const index = Index[styleName]

  if (!index) {
    return []
  }

  const examples = Object.values(index).filter(
    (item) =>
      item.type === "registry:example" &&
      item.registryDependencies?.includes(blockName)
  )

  return examples.map((item) => ({
    name: item.name,
    title: item.title || item.name,
  }))
}

