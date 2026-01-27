import type { StatusType } from "./types";

/**
 * 状态文本映射
 */
export const STATUS_TEXT_MAP: Record<StatusType, string> = {
  pending: "待确认",
  confirmed: "已确认",
};

/**
 * 状态颜色映射
 */
export const STATUS_COLOR_MAP: Record<
  StatusType,
  { backgroundColor: string; color: string }
> = {
  pending: {
    backgroundColor: "#FFFFFF",
    color: "#666473",
  },
  confirmed: {
    backgroundColor: "#E2F8EC",
    color: "#06BA7E",
  },
};
