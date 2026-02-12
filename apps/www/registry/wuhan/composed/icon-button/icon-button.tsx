"use client";

import * as React from "react";
import {
  IconButtonPrimitive,
  type IconButtonPrimitiveProps,
  type IconButtonVariant,
  type IconButtonColor,
  type IconButtonSize,
} from "@/registry/wuhan/blocks/icon-button/icon-button-01";
import {
  Tooltip,
  type TooltipProps,
} from "@/registry/wuhan/composed/tooltip/tooltip";

// ==================== 类型定义 ====================

/**
 * IconButton 组件属性
 * @public
 */
export interface IconButtonProps extends IconButtonPrimitiveProps {
  /**
   * 提示内容
   * 设置后会显示 tooltip
   */
  tooltip?: React.ReactNode;
  /**
   * Tooltip 提示框位置
   * @default "top"
   */
  tooltipSide?: "top" | "right" | "bottom" | "left";
  /**
   * Tooltip 与触发器的距离（像素）
   * @default 4
   */
  tooltipSideOffset?: number;
  /**
   * Tooltip 对齐方式
   * @default "center"
   */
  tooltipAlign?: "start" | "center" | "end";
  /**
   * Tooltip 延迟显示时间（毫秒）
   * @default 0
   */
  tooltipDelayDuration?: number;
  /**
   * 自定义 Tooltip 内容容器类名
   */
  tooltipContentClassName?: string;
}

// ==================== 组件实现 ====================

/**
 * IconButton 组件
 * 带 Tooltip 功能的图标按钮，封装了常用的配置和用法
 *
 * @example
 * ```tsx
 * // 基础用法（无 tooltip）
 * <IconButton>
 *   <PlusIcon className="size-4" />
 * </IconButton>
 *
 * // 带 tooltip
 * <IconButton tooltip="添加新内容">
 *   <PlusIcon className="size-4" />
 * </IconButton>
 *
 * * // 指定 tooltip 位置
 * <IconButton
 *   tooltip="删除"
 *   tooltipSide="right"
 *   variant="outline"
 *   color="danger"
 * >
 *   <TrashIcon className="size-4" />
 * </IconButton>
 *
 * // 不同尺寸
 * <IconButton size="sm" tooltip="编辑">
 *   <EditIcon className="size-3.5" />
 * </IconButton>
 *
 * <IconButton size="lg" tooltip="设置">
 *   <SettingsIcon className="size-4.5" />
 * </IconButton>
 * ```
 *
 * @public
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      tooltip,
      tooltipSide = "top",
      tooltipSideOffset = 4,
      tooltipAlign = "center",
      tooltipDelayDuration = 0,
      tooltipContentClassName,
      variant = "solid",
      color = "primary",
      size = "md",
      loading = false,
      disabled = false,
      borderless = false,
      className,
      ...props
    },
    ref,
  ) => {
    const button = (
      <IconButtonPrimitive
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        loading={loading}
        disabled={disabled}
        borderless={borderless}
        className={className}
        {...props}
      >
        {children}
      </IconButtonPrimitive>
    );

    // 如果没有 tooltip，直接返回按钮
    if (!tooltip) {
      return button;
    }

    // 否则用 Tooltip 包装
    return (
      <Tooltip
        content={tooltip}
        side={tooltipSide}
        sideOffset={tooltipSideOffset}
        align={tooltipAlign}
        delayDuration={tooltipDelayDuration}
        contentClassName={tooltipContentClassName}
      >
        {button}
      </Tooltip>
    );
  },
);

IconButton.displayName = "IconButton";

// ==================== 类型导出 ====================

// export type { IconButtonProps };
