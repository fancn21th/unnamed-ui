"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== 样式原语层（Primitives）====================
// 这些组件只提供样式，不包含任何逻辑和业务假设

/**
 * 引用内容容器样式原语 Props
 * 提供引用内容容器的基础样式配置
 */
interface QuoteContentPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * 引用内容容器样式原语
 * 只提供样式，不包含任何业务逻辑
 */
const QuoteContentPrimitive = React.forwardRef<
  HTMLDivElement,
  QuoteContentPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "h-[30px]",
        "gap-[var(--gap-md)]",
        "rounded-[var(--radius-lg)]",
        "pt-[var(--padding-com-xs)]",
        "pr-[var(--padding-com-md)]",
        "pb-[var(--padding-com-xs)]",
        "pl-[var(--padding-com-md)]",
        "bg-[var(--bg-neutral-light)]",
        "flex items-center",
        className,
      )}
      {...props}
    />
  );
});
QuoteContentPrimitive.displayName = "QuoteContentPrimitive";

/**
 * QuoteContent 子原语：左侧图标容器（回车图标）
 */
const QuoteContentLeading = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "shrink-0",
        "flex items-center justify-center",
        "text-[var(--text-secondary)]",
        className,
      )}
      {...props}
    />
  );
});
QuoteContentLeading.displayName = "QuoteContentLeading";

/**
 * QuoteContent 子原语：内容区域容器
 */
const QuoteContentContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-1", "min-w-0", "overflow-hidden", className)}
      {...props}
    />
  );
});
QuoteContentContent.displayName = "QuoteContentContent";

/**
 * QuoteContent 子原语：文本内容
 * 自动使用中文双引号包裹内容
 */
const QuoteContentText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-400)]",
        "text-sm",
        "leading-[var(--line-height-2)]",
        "tracking-[0px]",
        "align-middle",
        "text-[var(--text-secondary)]",
        "truncate",
        "block",
        className,
      )}
      {...props}
    >
      “{children}”
    </span>
  );
});
QuoteContentText.displayName = "QuoteContentText";

/**
 * QuoteContent 子原语：关闭按钮（仅样式，不包含 stopPropagation 等行为）
 */
const QuoteContentCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "appearance-none border-0 bg-transparent p-0",
        "shrink-0",
        "flex items-center justify-center",
        "w-4 h-4",
        "text-[var(--text-secondary)]",
        "hover:text-[var(--text-primary)]",
        "transition-colors",
        "cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
});
QuoteContentCloseButton.displayName = "QuoteContentCloseButton";

// ==================== 统一导出 ====================

export type { QuoteContentPrimitiveProps };

export {
  QuoteContentPrimitive as QuoteContent,
  QuoteContentLeading,
  QuoteContentContent,
  QuoteContentText,
  QuoteContentCloseButton,
};
