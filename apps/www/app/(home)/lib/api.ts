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
 * 检查是否是 recruitment block
 */
function isRecruitmentBlock(item: any): boolean {
  if (item.type !== "registry:block") {
    return false
  }
  // 检查文件路径中是否包含 recruitment
  const files = item.files || []
  return files.some(
    (file: any) =>
      file.path?.includes("recruitment/") ||
      file.target?.includes("recruitment/")
  )
}

/**
 * 获取所有 block 的基础示例（每个 block 的 -demo 示例）
 * 排除 recruitment blocks
 */
export async function getAllBlockDemos(styleName: Style["name"] = "wuhan") {
  const index = Index[styleName]

  if (!index) {
    return []
  }

  const blocks = Object.values(index).filter(
    (item) => item.type === "registry:block" && !isRecruitmentBlock(item)
  )

  const demos: Array<{ blockName: string; demoName: string }> = []
  const seenDemoNames = new Set<string>()

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
      if (seenDemoNames.has(demoName)) {
        continue
      }
      seenDemoNames.add(demoName)
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

/**
 * 定义 recruitment blocks 的排序优先级
 * 数字越小优先级越高（显示在前面）
 * 大型复杂组件放在前面，小型简单组件放在后面
 */
const RECRUITMENT_BLOCK_PRIORITY: Record<string, number> = {
  // 大型复杂组件（优先级高，显示在前面）
  "recruitment-activity-overview": 1,
  "candidate-report": 2,
  "resume-evaluation-report": 3,
  "recruitment-scene": 4,
  "recruitment-job-table": 5,
  "interview-process-table": 6,
  "candidates-table": 7,
  "personnel-recommend": 8,
  "report-section": 9,
  "report-card": 10,
  "step-detail": 11,
  "step-overview": 12,
  "work-objective-list": 13,
  "work-result-list": 14,
  "capability-column": 15,
  "confirm-jd-form": 16,
  "interview-info-form": 17,
  "interview-question-panel": 18,
  "data-source-list": 19,
  "markdown": 20,
  
  // 中等组件
  "job-card": 30,
  "similar-job": 31,
  "datasource-guide": 32,
  "todo-list": 33,
  "resource-upload": 34,
  "thinking": 35,
  
  // 小型简单组件（优先级低，显示在后面）
  "action-dropdown": 50,
  "chat-radio": 51,
  "message-bubble": 52,
  "status-tag": 53,
  "delete-confirm-modal": 54,
  "repeat-file-modal": 55,
}

/**
 * 获取组件的排序优先级
 */
function getBlockPriority(blockName: string): number {
  return RECRUITMENT_BLOCK_PRIORITY[blockName] ?? 100 // 未定义的组件放在最后
}

/**
 * 获取所有 recruitment block 的基础示例（每个 block 的 -demo 示例）
 * 按优先级排序：大型复杂组件在前，小型简单组件在后
 */
export async function getRecruitmentBlockDemos(styleName: Style["name"] = "wuhan") {
  const index = Index[styleName]

  if (!index) {
    return []
  }

  // 使用 isRecruitmentBlock 函数来过滤 recruitment blocks
  const blocks = Object.values(index).filter(isRecruitmentBlock)

  const demos: Array<{ blockName: string; demoName: string }> = []

  for (const block of blocks) {
    // 查找对应的 -demo 示例
    let demoName: string | undefined = `${block.name}-demo`

    // 检查示例是否存在
    if (demoName && index[demoName]?.type === "registry:example") {
      demos.push({
        blockName: block.name,
        demoName,
      })
    } else {
      // 如果没有 -demo 示例，直接使用 block 本身
      demos.push({
        blockName: block.name,
        demoName: block.name,
      })
    }
  }

  // 按优先级排序，优先级相同的按名称排序
  return demos.sort((a, b) => {
    const priorityA = getBlockPriority(a.blockName)
    const priorityB = getBlockPriority(b.blockName)
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB
    }
    
    return a.blockName.localeCompare(b.blockName)
  })
}

