"use client";

import * as React from "react";
import { StatusTagPrimitive } from "@/registry/wuhan/blocks/status-tag/status-tag-01";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

/**
 * 状态类型
 * @public
 */
export type StatusType =
  | "pending"
  | "confirmed"
  | "success"
  | "error"
  | "warning"
  | "info";

/**
 * 状态配置
 * @public
 */
export interface StatusConfig {
  /** 显示文本 */
  text: string;
  /** 背景颜色类名 */
  bgColor: string;
  /** 文本颜色类名 */
  textColor: string;
}

/**
 * 状态标签组件属性
 * @public
 */
export interface StatusTagProps {
  /** 状态类型（使用预设配置） */
  status?: StatusType;
  /** 自定义标签文本（优先级高于 status） */
  text?: string;
  /** 自定义背景色类名（优先级高于 status） */
  bgColor?: string;
  /** 自定义文本颜色类名（优先级高于 status） */
  textColor?: string;
  /** 自定义类名 */
  className?: string;
}

// ==================== 常量配置 ====================

/**
 * 状态文本映射
 */
const STATUS_TEXT_MAP: Record<StatusType, string> = {
  pending: "待确认",
  confirmed: "已确认",
  success: "成功",
  error: "失败",
  warning: "警告",
  info: "提示",
};

/**
 * 状态样式映射
 */
const STATUS_STYLE_MAP: Record<
  StatusType,
  Pick<StatusConfig, "bgColor" | "textColor">
> = {
  pending: {
    bgColor: "bg-white",
    textColor: "text-[#666473]",
  },
  confirmed: {
    bgColor: "bg-[#E2F8EC]",
    textColor: "text-[#06BA7E]",
  },
  success: {
    bgColor: "bg-green-50",
    textColor: "text-green-700",
  },
  error: {
    bgColor: "bg-red-50",
    textColor: "text-red-700",
  },
  warning: {
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
  },
  info: {
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
};

// ==================== 主组件 ====================

/**
 * 状态标签组件
 * 用于显示各种状态信息，支持预设状态和自定义样式
 *
 * @example
 * ```tsx
 * // 使用预设状态
 * <StatusTag status="pending" />
 * <StatusTag status="confirmed" />
 *
 * // 自定义文本和样式
 * <StatusTag
 *   text="进行中"
 *   bgColor="bg-purple-50"
 *   textColor="text-purple-700"
 * />
 * ```
 *
 * @param props - 状态标签属性
 * @returns 状态标签组件
 *
 * @public
 */
export function StatusTag({
  status,
  text,
  bgColor,
  textColor,
  className,
}: StatusTagProps) {
  // 优先使用自定义值，否则使用预设值
  const finalText = text ?? (status ? STATUS_TEXT_MAP[status] : "");
  const finalBgColor =
    bgColor ?? (status ? STATUS_STYLE_MAP[status].bgColor : "bg-gray-50");
  const finalTextColor =
    textColor ??
    (status ? STATUS_STYLE_MAP[status].textColor : "text-gray-700");

  return (
    <StatusTagPrimitive className={cn(finalBgColor, finalTextColor, className)}>
      {finalText}
    </StatusTagPrimitive>
  );
}

StatusTag.displayName = "StatusTag";
