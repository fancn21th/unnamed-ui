"use client";

import * as React from "react";
import { Button } from "@/registry/wuhan/ui/button";
import { cn } from "@/lib/utils";

/**
 * QuickAction 按钮样式原语
 * 用于显示快速操作建议的按钮
 */
export interface QuickActionButtonPrimitiveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮内容（可以包含图标、文本或任何组合）
   */
  children: React.ReactNode;
}

export const QuickActionButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  QuickActionButtonPrimitiveProps
>(
  (
    { children, className, type = "button", "aria-label": ariaLabel, ...props },
    ref,
  ) => {
    const resolvedAriaLabel =
      ariaLabel ??
      (typeof children === "string" || typeof children === "number"
        ? String(children)
        : undefined);

    return (
      <Button
        ref={ref}
        type={type}
        variant="outline"
        className={cn(
          "inline-flex items-center justify-center",
          "h-[38px]",
          "p-[var(--padding-com-md)]",
          "gap-[var(--gap-md)]",
          "rounded-[var(--radius-lg)]",
          "bg-[var(--bg-container)]",
          "border border-[var(--border-neutral)]",
          "hover:bg-[var(--bg-neutral-light)]",
          "transition-colors",
          "text-[var(--text-primary)]",
          "font-[var(--font-family-cn)]",
          "font-[var(--font-weight-400)]",
          "font-size-2",
          "leading-[var(--line-height-2)]",
          "tracking-[0px]",
          "disabled:opacity-50",
          "disabled:cursor-not-allowed",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-[var(--border-brand)]",
          "focus-visible:ring-offset-2",
          "[&_*]:!box-border",
          className,
        )}
        aria-label={resolvedAriaLabel}
        {...props}
      >
        {children}
      </Button>
    );
  },
);
QuickActionButtonPrimitive.displayName = "QuickActionButtonPrimitive";

/**
 * QuickAction 图标样式原语
 * 用于在按钮中显示品牌色图标
 */
export interface QuickActionIconPrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const QuickActionIconPrimitive = React.forwardRef<
  HTMLSpanElement,
  QuickActionIconPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("text-[var(--text-brand)]", className)}
      aria-hidden="true"
      {...props}
    >
      {children}
    </span>
  );
});
QuickActionIconPrimitive.displayName = "QuickActionIconPrimitive";

/**
 * QuickAction 按钮组样式原语
 * 用于显示一组快速操作建议按钮
 */
export interface QuickActionGroupPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const QuickActionGroupPrimitive = React.forwardRef<
  HTMLDivElement,
  QuickActionGroupPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center flex-wrap justify-center",
        "gap-[var(--gap-md)]",
        "[&_*]:!box-border",
        className,
      )}
      role="group"
      aria-label="Quick action suggestions"
      {...props}
    >
      {children}
    </div>
  );
});
QuickActionGroupPrimitive.displayName = "QuickActionGroupPrimitive";

// ==================== 导出所有原语 ====================
// 使用 QuickAction 前缀避免与 UI 组件库中的组件重名

export {
  QuickActionButtonPrimitive as QuickActionButton,
  QuickActionGroupPrimitive as QuickActionGroup,
  QuickActionIconPrimitive as QuickActionIcon,
};
