import * as React from "react";

/**
 * 文件卡片状态类型
 * @public
 */
export type FileCardStatus =
  | "loading"
  | "error"
  | "uploading"
  | "warning"
  | "success";

const VALID_FILE_CARD_STATUSES: readonly FileCardStatus[] = [
  "loading",
  "error",
  "uploading",
  "warning",
  "success",
] as const;

/**
 * 解析状态，处理 undefined/null/无效值情况
 * @param status - 输入的状态值
 * @returns 有效的 FileCardStatus
 * @public
 */
export function resolveStatus(
  status: FileCardStatus | undefined | null,
): FileCardStatus {
  if (
    status !== undefined &&
    status !== null &&
    VALID_FILE_CARD_STATUSES.includes(status as FileCardStatus)
  ) {
    return status as FileCardStatus;
  }
  return "loading";
}

/**
 * 检查是否是有效的 React 元素节点（用于图标等）
 * @public
 */
export function isValidIcon(icon: React.ReactNode): icon is React.ReactElement {
  return icon !== null && icon !== undefined && icon !== false;
}
