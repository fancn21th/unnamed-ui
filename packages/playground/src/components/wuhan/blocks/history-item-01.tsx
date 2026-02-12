"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

// ==================== 样式原语层（Primitives）====================
// 这些组件只提供样式，不包含任何逻辑和业务假设

/**
 * 历史记录项样式原语（可交互）
 */
const HistoryItemPrimitive = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  }
>(({ className, type = "button", asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      type={type}
      className={cn(
        "group/history-item",
        "shrink-0",
        "[&_*]:!box-border",
        "w-[214px] h-[34px]",
        "appearance-none",
        "border-0",
        "bg-transparent",
        "flex items-center",
        "gap-[var(--gap-md)]",
        "pt-[var(--padding-com-sm)]",
        "pr-[var(--padding-com-lg)]",
        "pb-[var(--padding-com-sm)]",
        "pl-[var(--padding-com-lg)]",
        "rounded-[var(--radius-circle)]",
        "transition-colors",
        "text-left",
        "hover:bg-[var(--bg-neutral-light)]",
        "data-[selected=true]:bg-[var(--bg-brand-light)]",
        "data-[selected=true]:hover:bg-[var(--bg-brand-light)]",
        "data-[active=true]:bg-[var(--bg-brand-light)]",
        "data-[selected=true][data-active=true]:bg-[var(--bg-brand-light)]",
        className,
      )}
      {...props}
    />
  );
});
HistoryItemPrimitive.displayName = "HistoryItemPrimitive";

/**
 * 历史记录项标题样式原语
 */
const HistoryItemTitlePrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "min-w-0 flex-1 truncate",
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-400)]",
        "font-size-1",
        "leading-[calc(var(--line-height-1)-4px)]",
        "tracking-[0px]",
        "text-[var(--text-primary)]",
        className,
      )}
      style={{
        fontSize: "var(--font-size-2)",
        ...props.style,
      }}
      {...props}
    />
  );
});
HistoryItemTitlePrimitive.displayName = "HistoryItemTitlePrimitive";

/**
 * 尾部容器样式原语（始终展示）
 */
const HistoryItemTrailingPrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "shrink-0",
        "inline-flex items-center gap-[var(--gap-xs)]",
        "text-[var(--text-secondary)]",
        "font-size-1",
        "leading-[calc(var(--line-height-1)-4px)]",
        className,
      )}
      {...props}
    />
  );
});
HistoryItemTrailingPrimitive.displayName = "HistoryItemTrailingPrimitive";

/**
 * 尾部容器样式原语（仅 hover 时展示）
 */
const HistoryItemHoverTrailingPrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "shrink-0",
        "inline-flex items-center gap-[var(--gap-xs)]",
        "text-[var(--text-secondary)]",
        "font-size-1",
        "leading-[calc(var(--line-height-1)-4px)]",
        "opacity-0 pointer-events-none",
        "group-hover/history-item:opacity-100 group-hover/history-item:pointer-events-auto",
        "group-data-[active=true]/history-item:opacity-100 group-data-[active=true]/history-item:pointer-events-auto",
        "transition-opacity",
        className,
      )}
      {...props}
    />
  );
});
HistoryItemHoverTrailingPrimitive.displayName =
  "HistoryItemHoverTrailingPrimitive";

// ==================== 统一导出 ====================

export {
  HistoryItemPrimitive,
  HistoryItemTitlePrimitive,
  HistoryItemTrailingPrimitive,
  HistoryItemHoverTrailingPrimitive,
};
