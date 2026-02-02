"use client";

import * as React from "react";
import {
  BlockTooltip,
  BlockTooltipTrigger,
  BlockTooltipContent,
  type BlockTooltipContentProps,
} from "@/registry/wuhan/blocks/tooltip/tooltip-01";

// ==================== 类型定义 ====================

/**
 * Tooltip 组件属性
 * @public
 */
export interface TooltipProps {
  /**
   * 提示内容
   */
  content: React.ReactNode;

  /**
   * 触发器元素
   */
  children: React.ReactNode;

  /**
   * 提示框位置
   * @default "top"
   */
  side?: "top" | "right" | "bottom" | "left";

  /**
   * 与触发器的距离（像素）
   * @default 4
   */
  sideOffset?: number;

  /**
   * 对齐方式
   * @default "center"
   */
  align?: "start" | "center" | "end";

  /**
   * 自定义内容容器类名
   */
  contentClassName?: string;

  /**
   * 延迟显示时间（毫秒）
   * @default 0
   */
  delayDuration?: number;
}

// ==================== Composed 组件 ====================

/**
 * Tooltip 组件
 *
 * 简化的 Tooltip 组件，封装了常用的配置和用法。
 * 适用于快速添加提示信息，无需手动组合多个子组件。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Tooltip content="这是提示信息">
 *   <Button>悬停查看</Button>
 * </Tooltip>
 *
 * // 指定位置
 * <Tooltip content="右侧提示" side="right">
 *   <Info className="w-4 h-4" />
 * </Tooltip>
 *
 * // 长文本提示
 * <Tooltip
 *   content="这是一段比较长的提示文本，会自动换行显示"
 *   side="bottom"
 * >
 *   <Button variant="outline">查看详情</Button>
 * </Tooltip>
 * ```
 *
 * @public
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      side = "top",
      sideOffset = 4,
      align = "center",
      contentClassName,
      delayDuration = 0,
    },
    ref,
  ) => {
    return (
      <BlockTooltip>
        <BlockTooltipTrigger asChild>{children}</BlockTooltipTrigger>
        <BlockTooltipContent
          ref={ref}
          side={side}
          sideOffset={sideOffset}
          align={align}
          className={contentClassName}
        >
          {content}
        </BlockTooltipContent>
      </BlockTooltip>
    );
  },
);

Tooltip.displayName = "Tooltip";
