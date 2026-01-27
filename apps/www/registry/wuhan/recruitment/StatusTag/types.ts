import type { CSSProperties } from "react";

/**
 * 状态类型
 */
export type StatusType = "pending" | "confirmed";

/**
 * StatusTag 组件属性接口
 */
export interface StatusTagProps {
  /** 状态类型（使用预设配置） */
  status?: StatusType;
  /** 标签文本（优先级高于 status） */
  text?: string;
  /** 背景色（优先级高于 status） */
  backgroundColor?: string;
  /** 文本颜色（优先级高于 status） */
  color?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
}
