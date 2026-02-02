"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== 样式原语层（Primitives）====================
// 这些组件只提供样式，不包含任何逻辑和业务假设

// ==================== Sidebar Main Primitives ====================

/**
 * 侧边栏容器样式原语
 */
const SidebarPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "flex flex-col",
        "h-full",
        "justify-between",
        className,
      )}
      {...props}
    />
  );
});
SidebarPrimitive.displayName = "SidebarPrimitive";

/**
 * 侧边栏内容区域样式原语
 */
const SidebarContentPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "min-h-0",
        "flex flex-col",
        "gap-[var(--gap-md)]",
        className,
      )}
      {...props}
    />
  );
});
SidebarContentPrimitive.displayName = "SidebarContentPrimitive";

/**
 * 侧边栏分隔线样式原语
 */
const SidebarDividerPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "my-[var(--gap-lg)]",
        "border-t",
        "border-t-[var(--divider-neutral-basic)]",
        className,
      )}
      {...props}
    />
  );
});
SidebarDividerPrimitive.displayName = "SidebarDividerPrimitive";

// ==================== Sidebar Header Primitives ====================

/**
 * 侧边栏头部容器样式原语
 */
const SidebarHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "flex items-center justify-between",
        "gap-[var(--gap-md)]",
        className,
      )}
      {...props}
    />
  );
});
SidebarHeaderPrimitive.displayName = "SidebarHeaderPrimitive";

/**
 * 侧边栏头部左侧区域样式原语（图标+标题）
 */
const SidebarHeaderLeading = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center",
        "gap-[var(--gap-sm)]",
        className,
      )}
      {...props}
    />
  );
});
SidebarHeaderLeading.displayName = "SidebarHeaderLeading";

/**
 * 侧边栏头部图标容器样式原语
 */
const SidebarHeaderIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        "size-8",
        "rounded-md",
        "bg-[var(--bg-neutral-light)]",
        "text-[var(--text-primary)]",
        className,
      )}
      {...props}
    />
  );
});
SidebarHeaderIcon.displayName = "SidebarHeaderIcon";

/**
 * 侧边栏头部标题样式原语
 */
const SidebarHeaderTitle = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "text-[var(--text-primary)]",
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-600)]",
        "font-size-2",
        "leading-[var(--line-height-2)]",
        "tracking-[0px]",
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
SidebarHeaderTitle.displayName = "SidebarHeaderTitle";

/**
 * 侧边栏头部操作按钮容器样式原语
 */
const SidebarHeaderAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("shrink-0", className)} {...props} />;
});
SidebarHeaderAction.displayName = "SidebarHeaderAction";

// ==================== Sidebar New Button Primitives ====================

/**
 * 侧边栏新建按钮样式原语
 */
const SidebarNewButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "appearance-none border-0 bg-transparent p-0",
        "w-full",
        "h-8",
        "gap-[var(--gap-md)]",
        "rounded-[var(--radius-circle)]",
        "px-[var(--padding-com-xl)]",
        "bg-[var(--bg-brand)]",
        "text-[var(--text-inverse)]",
        "hover:bg-[var(--bg-brand-hover)]",
        "active:bg-[var(--bg-brand-active)]",
        "transition-colors",
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-400)]",
        "text-sm",
        "leading-normal",
        "tracking-[0px]",
        "inline-flex items-center justify-center",
        className,
      )}
      {...props}
    />
  );
});
SidebarNewButtonPrimitive.displayName = "SidebarNewButtonPrimitive";

// ==================== Sidebar History Primitives ====================

/**
 * 侧边栏历史区域容器样式原语
 */
const SidebarHistoryPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "flex-1 min-h-0",
        "flex flex-col",
        className,
      )}
      {...props}
    />
  );
});
SidebarHistoryPrimitive.displayName = "SidebarHistoryPrimitive";

/**
 * 侧边栏历史标题样式原语
 */
const SidebarHistoryTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mb-[var(--gap-sm)]",
        "text-[var(--text-secondary)]",
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-400)]",
        "font-size-1",
        "leading-[var(--line-height-1)]",
        "tracking-[0px]",
        className,
      )}
      style={{
        fontSize: "var(--font-size-1)",
        ...props.style,
      }}
      {...props}
    />
  );
});
SidebarHistoryTitle.displayName = "SidebarHistoryTitle";

/**
 * 侧边栏历史搜索容器样式原语
 */
const SidebarHistorySearchPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("mb-[var(--gap-md)]", className)} {...props} />
  );
});
SidebarHistorySearchPrimitive.displayName = "SidebarHistorySearchPrimitive";

/**
 * 侧边栏历史搜索框容器样式原语
 */
const SidebarHistorySearchContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "h-8",
        "gap-[var(--gap-md)]",
        "rounded-[var(--radius-circle)]",
        "px-[var(--padding-com-lg)]",
        "border border-[var(--border-neutral)]",
        "bg-[var(--bg-container)]",
        "flex items-center",
        "min-w-0",
        "transition-all",
        "duration-300",
        "ease-in-out",
        "hover:border-[var(--border-brand)]",
        "focus-within:border-[var(--border-brand)]",
        "focus-within:ring-2",
        "focus-within:ring-[var(--ring)]",
        className,
      )}
      {...props}
    />
  );
});
SidebarHistorySearchContainer.displayName = "SidebarHistorySearchContainer";

/**
 * 侧边栏历史搜索图标容器样式原语
 */
const SidebarHistorySearchIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("shrink-0", "text-[var(--text-secondary)]", className)}
      {...props}
    />
  );
});
SidebarHistorySearchIcon.displayName = "SidebarHistorySearchIcon";

/**
 * 侧边栏历史搜索输入框样式原语
 */
const SidebarHistorySearchInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={cn(
        "h-full",
        "flex-1",
        "min-w-0",
        "border-0",
        "bg-transparent",
        "outline-none",
        "focus:outline-none",
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-400)]",
        "font-size-2",
        "leading-[var(--line-height-2)]",
        "tracking-[0px]",
        "text-[var(--text-primary)]",
        "placeholder:text-[var(--text-secondary)]",
        className,
      )}
      style={{
        fontSize: "var(--font-size-2)",
        ...props.style,
      }}
    />
  );
});
SidebarHistorySearchInput.displayName = "SidebarHistorySearchInput";

/**
 * 侧边栏历史列表容器样式原语
 */
const SidebarHistoryListPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col",
        "flex-1 min-h-0",
        "gap-[var(--gap-md)]",
        "overflow-y-auto",
        "overflow-x-hidden",
        "w-full",
        className,
      )}
      {...props}
    />
  );
});
SidebarHistoryListPrimitive.displayName = "SidebarHistoryListPrimitive";

/**
 * 侧边栏历史空状态样式原语
 */
const SidebarHistoryEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "text-center",
        "text-[var(--text-secondary)]",
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-400)]",
        "font-size-1",
        "leading-[var(--line-height-1)]",
        "py-4",
        className,
      )}
      style={{
        fontSize: "var(--font-size-1)",
        ...props.style,
      }}
      {...props}
    />
  );
});
SidebarHistoryEmpty.displayName = "SidebarHistoryEmpty";

// ==================== Sidebar Footer Primitives ====================

/**
 * 侧边栏底部容器样式原语
 */
const SidebarFooterPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "mt-[var(--gap-lg)]",
        "shrink-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarFooterPrimitive.displayName = "SidebarFooterPrimitive";

// ==================== 统一导出 ====================

export {
  // Main Primitives
  SidebarPrimitive,
  SidebarContentPrimitive,
  SidebarDividerPrimitive,
  // Header Primitives
  SidebarHeaderPrimitive,
  SidebarHeaderLeading,
  SidebarHeaderIcon,
  SidebarHeaderTitle,
  SidebarHeaderAction,
  // New Button Primitives
  SidebarNewButtonPrimitive,
  // History Primitives
  SidebarHistoryPrimitive,
  SidebarHistoryTitle,
  SidebarHistorySearchPrimitive,
  SidebarHistorySearchContainer,
  SidebarHistorySearchIcon,
  SidebarHistorySearchInput,
  SidebarHistoryListPrimitive,
  SidebarHistoryEmpty,
  // Footer Primitives
  SidebarFooterPrimitive,
};
