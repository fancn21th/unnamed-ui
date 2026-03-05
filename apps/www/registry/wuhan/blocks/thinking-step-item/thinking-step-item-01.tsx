"use client";

/**
 * Thinking Step Item 原语 - 统一导出
 *
 * 本文件为 backward compatibility 的 barrel，实际实现已拆分为：
 * - types.ts          类型与工具函数
 * - step-item-primitives.tsx  容器、头部、内容、时间轴
 * - step-item-status.tsx      状态图标、标题
 * - tool-call-chip.tsx        工具调用块
 * - file-list-chip.tsx        文件列表
 *
 * @module thinking-step-item
 */

// 类型
export type {
  ThinkingSemanticStatus,
  ThinkingStepItemStatus,
  ThinkingStepItemFileStatus,
  ThinkingStepItemFileListLabels,
} from "./types";
export {
  resolveThinkingStepItemStatus,
  DEFAULT_FILE_LIST_LABELS,
} from "./types";

// 布局原语
export {
  ThinkingStepItemContainerPrimitive,
  ThinkingStepItemPrimitive,
  ThinkingStepItemHeaderPrimitive,
  ThinkingStepItemContentPrimitive,
  ThinkingStepItemContentListPrimitive,
  ThinkingStepItemContentItemPrimitive,
  ThinkingStepItemTimelinePrimitive,
  ThinkingStepItemContentAreaPrimitive,
  ThinkingStepItemRegularContentPrimitive,
  ThinkingStepItemCollapseArrowPrimitive,
} from "./step-item-primitives";
export type {
  ThinkingStepItemContainerPrimitiveProps,
  ThinkingStepItemPrimitiveProps,
  ThinkingStepItemHeaderPrimitiveProps,
  ThinkingStepItemContentPrimitiveProps,
  ThinkingStepItemContentListPrimitiveProps,
  ThinkingStepItemContentItemPrimitiveProps,
  ThinkingStepItemTimelinePrimitiveProps,
  ThinkingStepItemContentAreaPrimitiveProps,
  ThinkingStepItemRegularContentPrimitiveProps,
} from "./step-item-primitives";

// 状态与标题
export {
  ThinkingStepItemStatusIconPrimitive,
  ThinkingStepItemTitlePrimitive,
} from "./step-item-status";
export type {
  ThinkingStepItemStatusIconPrimitiveProps,
  ThinkingStepItemTitlePrimitiveProps,
} from "./step-item-status";

// 工具调用块
export {
  ThinkingStepItemToolCallPrimitive,
  ThinkingStepItemToolCallIconPrimitive,
  ThinkingStepItemToolCallTitlePrimitive,
  ThinkingStepItemToolCallContentPrimitive,
} from "./tool-call-chip";
export type {
  ThinkingStepItemToolCallPrimitiveProps,
  ThinkingStepItemToolCallIconPrimitiveProps,
  ThinkingStepItemToolCallTitlePrimitiveProps,
  ThinkingStepItemToolCallContentPrimitiveProps,
} from "./tool-call-chip";

// 文件列表
export {
  ThinkingStepItemFileListPrimitive,
  ThinkingStepItemFileItemPrimitive,
  ThinkingStepItemExpandButtonPrimitive,
} from "./file-list-chip";
export type {
  ThinkingStepItemFileListPrimitiveProps,
  ThinkingStepItemFileItemPrimitiveProps,
  ThinkingStepItemExpandButtonPrimitiveProps,
} from "./file-list-chip";
