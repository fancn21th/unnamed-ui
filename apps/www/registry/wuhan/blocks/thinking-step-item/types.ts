/**
 * 共享类型与工具函数
 * @module thinking-step-item/types
 */

import type * as React from "react";

// ==================== 状态类型 ====================

/**
 * 统一状态语义（组件库层）
 * @public
 */
export type ThinkingSemanticStatus =
  | "idle"
  | "running"
  | "success"
  | "error"
  | "cancelled";

/**
 * 执行步骤状态类型（兼容旧状态）
 * @public
 */
export type ThinkingStepItemStatus =
  | ThinkingSemanticStatus
  | "loading"
  | "cancel";

/**
 * 解析步骤状态为统一语义
 * @public
 */
export const resolveThinkingStepItemStatus = (
  status: ThinkingStepItemStatus | undefined,
): ThinkingSemanticStatus => {
  switch (status) {
    case "loading":
      return "running";
    case "cancel":
      return "cancelled";
    case "success":
    case "error":
    case "idle":
    case "running":
    case "cancelled":
      return status;
    default:
      return "running";
  }
};

/**
 * 文件项状态类型
 * @public
 */
export type ThinkingStepItemFileStatus = "loading" | "ready" | "error";

// ==================== 文案默认值 ====================

/**
 * 文件列表文案默认值
 * @public
 */
export const DEFAULT_FILE_LIST_LABELS = {
  expandFiles: "查看更多",
  collapseFiles: "收起",
} as const;

export type ThinkingStepItemFileListLabels = {
  expandFiles?: React.ReactNode;
  collapseFiles?: React.ReactNode;
};
