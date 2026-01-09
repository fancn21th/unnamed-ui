"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

/**
 * 开关按钮样式原语属性
 * @public
 */
export interface ToggleButtonPrimitiveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 是否选中状态
   */
  selected?: boolean;
  /**
   * 是否多选模式
   */
  multiple?: boolean;
  /**
   * 按钮变体样式
   * - "default": 默认样式（用于反馈组件等场景）
   * - "compact": 紧凑样式（用于sender组件等场景）
   */
  variant?: "default" | "compact";
}

/**
 * 开关按钮组容器样式原语属性
 * @public
 */
export type ToggleButtonGroupPrimitiveProps =
  React.HTMLAttributes<HTMLDivElement>;

// ==================== 样式原语层（Primitives）====================
// 这些组件只提供样式，不包含任何逻辑和业务假设

/**
 * 开关按钮样式原语
 * 提供开关按钮的基础样式和选中/未选中状态
 * 只提供样式，不包含任何业务逻辑
 * @public
 */
export const ToggleButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonPrimitiveProps
>(
  (
    {
      className,
      selected = false,
      multiple = false,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const isCompact = variant === "compact";
    // 多选模式下，选中状态不需要背景色
    const shouldHaveBackground = !multiple || !selected;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "[&_*]:!box-border",
          "rounded-[var(--radius-lg)]",
          "border",
          "gap-1", // gap: 4px
          "transition-colors",
          "font-[var(--font-family-cn)]",
          "text-sm",
          "leading-normal",
          "tracking-[0px]",
          "inline-flex items-center justify-center",
          "cursor-pointer",
          "outline-none",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-[var(--ring-brand)]",
          "focus-visible:ring-offset-2",
          "disabled:pointer-events-none",
          "disabled:opacity-50",
          "min-w-0",
          // 默认样式（用于反馈组件等场景）
          !isCompact && [
            "h-8",
            "px-[var(--padding-com-md)]",
            // default 状态
            !selected && [
              "bg-[var(--bg-container)]",
              "border-[var(--border-neutral)]",
              "text-[var(--text-secondary)]",
              "hover:bg-[var(--bg-neutral-light)]",
              "hover:border-[var(--border-neutral)]",
              "hover:text-[var(--text-secondary)]",
            ],
            // selected 状态
            selected && [
              shouldHaveBackground
                ? "bg-[var(--bg-container)]"
                : "bg-transparent",
              "border-[var(--border-brand-light-hover)]",
              "text-[var(--text-brand)]",
              shouldHaveBackground
                ? "hover:bg-[var(--bg-container)]"
                : "hover:bg-transparent",
            ],
          ],
          // 紧凑样式（用于sender组件等场景）
          isCompact && [
            "h-[var(--size-com-md)]",
            "px-3",
            // default 状态
            !selected && [
              "bg-transparent",
              "border-[var(--border-neutral)]",
              "text-[var(--text-primary)]",
              "hover:bg-[var(--bg-neutral-light)]",
            ],
            // selected 状态
            selected && [
              shouldHaveBackground
                ? "bg-[var(--bg-brand-light)]"
                : "bg-transparent",
              "border-[var(--border-brand-light-hover)]",
              "text-[var(--text-brand)]",
              shouldHaveBackground
                ? "hover:bg-[var(--bg-container)]"
                : "hover:bg-transparent",
            ],
          ],
          className,
        )}
        aria-pressed={selected}
        {...props}
      >
        {props.children}
      </button>
    );
  },
);
ToggleButtonPrimitive.displayName = "ToggleButtonPrimitive";

/**
 * 开关按钮组容器样式原语
 * 提供开关按钮组的容器样式
 * 只提供样式，不包含任何业务逻辑和状态管理
 * @public
 */
export const ToggleButtonGroupPrimitive = React.forwardRef<
  HTMLDivElement,
  ToggleButtonGroupPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("[&_*]:!box-border", "flex flex-wrap gap-2", className)}
      {...props}
    >
      {props.children}
    </div>
  );
});
ToggleButtonGroupPrimitive.displayName = "ToggleButtonGroupPrimitive";
