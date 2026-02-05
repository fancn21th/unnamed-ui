"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ToggleButtonPrimitive,
  ToggleButtonPrimitiveProps,
} from "@/registry/wuhan/blocks/toggle-button/toggle-button-01";

// ==================== 类型定义 ====================

/**
 * 卡片选择项属性
 * @public
 */
export type SelectCardItemPrimitiveProps = ToggleButtonPrimitiveProps;

/**
 * 卡片选择项图标占位符属性
 * @public
 */
export type SelectCardItemIconPrimitiveProps =
  React.HTMLAttributes<HTMLDivElement>;

// ==================== 组件 ====================

/**
 * 卡片选择项原语
 * 提供卡片式选择的基础样式和选中/未选中状态
 * 只提供样式，不包含任何业务逻辑
 *
 * @example
 * ```tsx
 * <SelectCardItemPrimitive selected={isSelected} onClick={() => setSelected(!isSelected)}>
 *   <SelectCardItemIconPrimitive />
 *   <span>选项</span>
 * </SelectCardItemPrimitive>
 * ```
 *
 * @public
 */
export const SelectCardItemPrimitive = React.forwardRef<
  HTMLButtonElement,
  SelectCardItemPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <ToggleButtonPrimitive
      ref={ref}
      variant="compact"
      className={cn(
        "h-[40px]",
        "w-full",
        "gap-[var(--gap-md)]",
        "rounded-[var(--radius-lg)]",
        "px-[var(--padding-com-lg)]",
        "py-[var(--margin-com-md)]",
        "justify-start",
        className,
      )}
      {...props}
    />
  );
});
SelectCardItemPrimitive.displayName = "SelectCardItemPrimitive";

/**
 * 卡片选择项图标占位符原语
 * 提供图标占位符的基础样式
 * 只提供样式，不包含任何业务逻辑
 *
 * @example
 * ```tsx
 * <SelectCardItemPrimitive selected={isSelected}>
 *   <SelectCardItemIconPrimitive />
 *   <span>选项</span>
 * </SelectCardItemPrimitive>
 * ```
 *
 * @public
 */
export const SelectCardItemIconPrimitive = React.forwardRef<
  HTMLDivElement,
  SelectCardItemIconPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-6 h-6 shrink-0", className)}
      style={{ backgroundColor: "#D9D9D9", ...props.style }}
      {...props}
    />
  );
});
SelectCardItemIconPrimitive.displayName = "SelectCardItemIconPrimitive";
