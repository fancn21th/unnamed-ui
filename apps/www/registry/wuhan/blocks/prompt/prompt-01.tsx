"use client";

import * as React from "react";
import { Textarea } from "@/registry/wuhan/ui/textarea";
import { Button } from "@/registry/wuhan/ui/button";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================
// 完全通用的类型，不强制任何业务概念
// 用户可以根据自己的需求定义数据结构

// ==================== 样式原语层（Primitives）====================
// 这些组件只提供样式，不包含任何逻辑和业务假设

/**
 * 文本域样式原语
 * 只提供样式，不包含任何逻辑
 */
export const TextareaPrimitive = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<typeof Textarea>
>(({ rows = 2, className, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      rows={rows}
      {...props}
      className={cn(
        "resize-none border-none p-0 shadow-none focus-visible:ring-0",
        // 默认两行高度，最多五行，超出显示滚动条
        // 注意：这里假设 line-height 已经包含了行间距，实际高度可能因 padding 而略有差异
        "min-h-[calc(var(--line-height-2)*2)]",
        "max-h-[calc(var(--line-height-2)*5)]",
        "overflow-y-auto",
        className
      )}
    />
  );
});
TextareaPrimitive.displayName = "TextareaPrimitive";

/**
 * 按钮样式原语
 * 完全通用的按钮组件，不预设任何样式或行为
 * 注意：这是一个简单的转发组件，如果不需要额外逻辑，可以直接使用 Button
 */
export const ButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>((props, ref) => {
  return <Button ref={ref} {...props} />;
});
ButtonPrimitive.displayName = "ButtonPrimitive";

/**
 * 容器样式原语
 * 提供基础的容器样式，用户完全控制内容
 */
export interface ContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  ContainerPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full flex-col border transition-colors has-[:focus-visible]:border-primary",
        "rounded-[var(--radius-2xl)]",
        "p-[var(--padding-com-lg)]",
        "gap-[var(--gap-xl)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ContainerPrimitive.displayName = "ContainerPrimitive";

/**
 * 区域容器样式原语
 * 提供基础的区域布局样式，用户完全控制内容
 */
export interface RegionPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * 是否显示底部边框
   */
  bordered?: boolean;
  /**
   * 垂直内边距
   */
  verticalPadding?: "none" | "sm" | "md" | "lg";
}

export function RegionPrimitive({
  children,
  className,
  bordered = false,
  verticalPadding = "md",
  ...props
}: RegionPrimitiveProps) {
  const paddingClasses = {
    none: "",
    sm: "py-1",
    md: "py-2",
    lg: "py-3",
  };

  const borderClasses = bordered ? "border-b border-[var(--border-neutral)]" : "";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        paddingClasses[verticalPadding],
        borderClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * 上传附件按钮样式原语
 * 提供上传附件按钮的基础样式
 */
export interface AttachmentButtonPrimitiveProps extends React.ComponentProps<typeof Button> {
  /**
   * 附件图标（建议使用 React.ReactElement 类型的图标组件）
   */
  icon?: React.ReactNode;
}

export const AttachmentButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  AttachmentButtonPrimitiveProps
>(({ icon, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      className={cn(
        "p-2 gap-2 border",
        "h-[var(--size-com-md)]",
        "w-[var(--size-com-md)]",
        "text-[var(--text-primary)]",
        "rounded-lg",
        "bg-[var(--bg-container)]",
        "border-[var(--border-neutral)]",
        "hover:bg-[var(--bg-neutral-light-hover)] transition-colors",
        className
      )}
    >
      {icon}
    </Button>
  );
});
AttachmentButtonPrimitive.displayName = "AttachmentButtonPrimitive";

/**
 * 模式按钮样式原语（如深度思考、联网搜索等）
 * 提供模式选择按钮的基础样式和状态
 */
export interface ModeButtonPrimitiveProps extends React.ComponentProps<typeof Button> {
  /**
   * 是否选中状态
   */
  selected?: boolean;
  /**
   * 按钮图标
   */
  icon?: React.ReactNode;
  /**
   * 按钮文本
   */
  children?: React.ReactNode;
}

export const ModeButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  ModeButtonPrimitiveProps
>(({ selected = false, icon, children, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      className={cn(
        "rounded-lg gap-1 px-3 border border-[var(--border-neutral)]",
        "transition-colors",
        "h-[var(--size-com-md)]",
        // 基础状态：无背景色（透明）
        !selected && "bg-transparent hover:bg-[var(--bg-neutral-light-hover)]",
        // selected 状态
        selected && "bg-[var(--bg-brand-light)] border-[var(--border-brand-light-hover)] hover:bg-[var(--bg-brand-light)]",
        className
      )}
      aria-pressed={selected}
    >
      {icon && (
        <span
          className={cn(
            "flex items-center",
            selected
              ? "text-[var(--text-brand)]"
              : "text-[var(--text-primary)]"
          )}
        >
          {icon}
        </span>
      )}
      {children && (
        <span
          className={cn(
            "text-sm",
            selected
              ? "text-[var(--text-brand)]"
              : "text-[var(--text-primary)]"
          )}
        >
          {children}
        </span>
      )}
    </Button>
  );
});
ModeButtonPrimitive.displayName = "ModeButtonPrimitive";

/**
 * 发送按钮样式原语
 * 提供圆形发送按钮的基础样式和状态
 */
export interface SendButtonPrimitiveProps extends React.ComponentProps<typeof Button> {
  /**
   * 是否正在生成中
   */
  generating?: boolean;
  /**
   * 发送图标
   */
  sendIcon?: React.ReactNode;
  /**
   * 生成中图标（通常是加载动画）
   */
  generatingIcon?: React.ReactNode;
}

export const SendButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  SendButtonPrimitiveProps
>(({ generating = false, sendIcon, generatingIcon, disabled, className, ...props }, ref) => {
  const isDisabled = disabled || generating;
  
  return (
    <Button
      ref={ref}
      {...props}
      disabled={isDisabled}
      className={cn(
        "w-8 h-8 rounded-full p-2 gap-2",
        "bg-[var(--bg-brand)]",
        "text-[var(--text-inverse)]",
        "transition-opacity",
        // 禁用状态：添加透明度（使用 bg-mask 的 alpha 值 0.8）
        isDisabled && !generating && "opacity-80",
        // 生成中状态：完全不透明
        generating && "opacity-100",
        className
      )}
      aria-label={generating ? "Generating" : "Send"}
    >
      {generating ? (generatingIcon || sendIcon) : sendIcon}
    </Button>
  );
});
SendButtonPrimitive.displayName = "SendButtonPrimitive";

/**
 * 输入区域样式原语
 * 提供文本域区域的布局样式
 */
export interface InputRegionPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * 文本域前的上传附件按钮
   */
  attachmentButton?: React.ReactNode;
  /**
   * 文本域后的操作按钮区域
   */
  actions?: React.ReactNode;
}

export function InputRegionPrimitive({
  children,
  attachmentButton,
  actions,
  className,
  ...props
}: InputRegionPrimitiveProps) {
  return (
    <div className={cn("flex items-end gap-2", className)} {...props}>
      {attachmentButton && <div className="flex items-center">{attachmentButton}</div>}
      <div className="flex-1 relative">{children}</div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/**
 * 操作栏样式原语
 * 提供底部操作栏的基础样式，用户完全控制内容结构
 * 注意：这是一个简单的容器组件，仅提供基础的顶部内边距
 */
export interface ActionBarPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function ActionBarPrimitive({
  children,
  className,
  ...props
}: ActionBarPrimitiveProps) {
  return (
    <div className={cn("pt-2", className)} {...props}>
      {children}
    </div>
  );
}

// ==================== 导出所有原语 ====================
// 使用 Prompt 前缀避免与 UI 组件库中的组件重名

export {
  TextareaPrimitive as PromptTextarea,
  ButtonPrimitive as PromptButton,
  ContainerPrimitive as PromptContainer,
  RegionPrimitive as PromptRegion,
  InputRegionPrimitive as PromptInputRegion,
  ActionBarPrimitive as PromptActionBar,
  AttachmentButtonPrimitive as PromptAttachmentButton,
  ModeButtonPrimitive as PromptModeButton,
  SendButtonPrimitive as PromptSendButton,
};
