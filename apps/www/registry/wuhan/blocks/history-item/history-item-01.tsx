"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== 样式原语层（Primitives）====================
// 这些组件只提供样式，不包含任何逻辑和业务假设

export interface HistoryItemPrimitiveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 是否为选中状态
   */
  selected?: boolean;
  /**
   * 是否保持“hover 激活态”（例如 popover 打开时）
   * - 选中态下不会生效
   */
  active?: boolean;
}

/**
 * 历史记录项样式原语（可交互）
 */
const HistoryItemPrimitive = React.forwardRef<
  HTMLButtonElement,
  HistoryItemPrimitiveProps
>(
  (
    { selected = false, active = false, className, type = "button", ...props },
    ref,
  ) => {
    const isActive = !selected && active;

    return (
      <button
        ref={ref}
        type={type}
        data-active={isActive ? "true" : undefined}
        className={cn(
          "group/history-item",
          "[&_*]:!box-border",
          "w-[214px] h-[34px]",
          "flex items-center",
          "gap-[var(--gap-md)]",
          "pt-[var(--padding-com-sm)]",
          "pr-[var(--padding-com-lg)]",
          "pb-[var(--padding-com-sm)]",
          "pl-[var(--padding-com-lg)]",
          "rounded-[var(--radius-circle)]",
          "transition-colors",
          "text-left",
          !selected && "hover:bg-[var(--bg-neutral-light)]",
          isActive && "bg-[var(--bg-neutral-light)]",
          selected && "bg-[var(--bg-brand-light)]",
          className,
        )}
        {...props}
      />
    );
  },
);
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
        "text-[var(--font-size-1)]",
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
        "text-[var(--font-size-1)]",
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
        "text-[var(--font-size-1)]",
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

// ==================== 业务组件层（组合组件）====================

export interface HistoryItemProps extends Omit<
  HistoryItemPrimitiveProps,
  "children" | "title"
> {
  /**
   * 标题内容
   */
  title: React.ReactNode;
  /**
   * 尾部内容（始终显示）
   */
  trailing?: React.ReactNode;
  /**
   * 尾部内容（hover 时显示）
   */
  hoverTrailing?: React.ReactNode;
}

/**
 * 历史记录项（组合组件）
 */
const HistoryItem = React.forwardRef<HTMLButtonElement, HistoryItemProps>(
  (
    { title, trailing, hoverTrailing, selected, active, className, ...props },
    ref,
  ) => {
    return (
      <HistoryItemPrimitive
        ref={ref}
        selected={selected}
        active={active}
        className={className}
        {...props}
      >
        <HistoryItemTitlePrimitive>{title}</HistoryItemTitlePrimitive>
        {trailing != null && (
          <HistoryItemTrailingPrimitive>
            {trailing}
          </HistoryItemTrailingPrimitive>
        )}
        {!selected && hoverTrailing != null && (
          <HistoryItemHoverTrailingPrimitive>
            {hoverTrailing}
          </HistoryItemHoverTrailingPrimitive>
        )}
      </HistoryItemPrimitive>
    );
  },
);
HistoryItem.displayName = "HistoryItem";

// ==================== 统一导出 ====================

export {
  HistoryItemPrimitive,
  HistoryItemTitlePrimitive,
  HistoryItemTrailingPrimitive,
  HistoryItemHoverTrailingPrimitive,
  HistoryItem,
};
