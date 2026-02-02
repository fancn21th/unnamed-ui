"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, Plus, ArrowUp } from "lucide-react";
import { ToggleButtonPrimitive } from "@/components/wuhan/blocks/toggle-button-01";

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
  const textareaClassName = cn(
    "resize-none border-none p-0 shadow-none focus-visible:ring-0",
    // 默认两行高度，最多五行，超出显示滚动条
    // 注意：这里假设 line-height 已经包含了行间距，实际高度可能因 padding 而略有差异
    "min-h-[calc(var(--line-height-2)*2)]",
    "max-h-[calc(var(--line-height-2)*5)]",
    "overflow-y-auto",
    "leading-[var(--line-height-2)]",
    "text-sm",
    // 光标颜色使用主题色
    "caret-[var(--primary)]",
    className,
  );

  if (props.children) {
    // 如果使用自定义 textarea，将样式类应用到包裹容器
    // 并尝试将样式类传递给 children（如果 children 可以接收 className）
    const childrenWithClassName = React.isValidElement(props.children)
      ? React.cloneElement(
          props.children as React.ReactElement<{ className?: string }>,
          {
            className: cn(
              textareaClassName,
              (props.children as React.ReactElement<{ className?: string }>)
                .props?.className,
            ),
          },
        )
      : props.children;

    return (
      <div className={cn("flex-1 relative", textareaClassName)}>
        {childrenWithClassName}
      </div>
    );
  }

  return (
    <Textarea ref={ref} rows={rows} {...props} className={textareaClassName} />
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
export type ContainerPrimitiveProps = React.ComponentPropsWithoutRef<"form">;

export const ContainerPrimitive = React.forwardRef<
  HTMLFormElement,
  ContainerPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <form
      ref={ref}
      className={cn(
        "relative flex w-full flex-col border transition-colors",
        "rounded-[var(--radius-2xl)]",
        "p-[var(--padding-com-lg)]",
        "gap-[var(--gap-xl)]",
        className,
      )}
      {...props}
    >
      {children}
    </form>
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

  const borderClasses = bordered
    ? "border-b border-[var(--border-neutral)]"
    : "";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        paddingClasses[verticalPadding],
        borderClasses,
        className,
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
export type AttachmentButtonPrimitiveProps = React.ComponentProps<
  typeof Button
>;

export const AttachmentButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  AttachmentButtonPrimitiveProps
>(({ className, children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      className={cn(
        "p-2 gap-2 border",
        "h-[var(--size-com-md)]",
        "w-[var(--size-com-md)]",
        "text-[var(--text-primary)]",
        "rounded-[var(--radius-lg)]",
        "bg-[var(--bg-container)]",
        "border-[var(--border-neutral)]",
        "hover:bg-[var(--bg-neutral-light)] transition-colors",
        className,
      )}
    >
      {children ?? <Plus className="size-4" />}
    </Button>
  );
});
AttachmentButtonPrimitive.displayName = "AttachmentButtonPrimitive";

/**
 * 模式按钮样式原语（如深度思考、联网搜索等）
 * 提供模式选择按钮的基础样式和状态
 * 基于 ToggleButtonPrimitive，但使用自定义样式
 */
export const ModeButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof ToggleButtonPrimitive>
>(({ className, selected = false, ...props }, ref) => {
  return (
    <ToggleButtonPrimitive
      ref={ref}
      variant="compact"
      selected={selected}
      {...props}
      className={cn(
        // 覆盖边框样式：未选中和选中都无边框
        "!border-0",
        "rounded-[var(--radius-lg)]",
        "px-[var(--padding-com-md)]",
        "py-[var(--padding-com-md)]",
        // 覆盖背景色样式
        !selected && ["!bg-transparent", "hover:!bg-[var(--bg-neutral-light)]"],
        selected && [
          "!bg-[var(--bg-neutral-light)]",
          "hover:!bg-[var(--bg-neutral-light)]",
        ],
        // 覆盖文字颜色：统一使用 text-primary
        "!text-[var(--text-primary)]",
        "hover:!text-[var(--text-primary)]",
        className,
      )}
    />
  );
});
ModeButtonPrimitive.displayName = "ModeButtonPrimitive";

/**
 * 发送按钮样式原语
 * 提供圆形发送按钮的基础样式和状态
 */
export interface SendButtonPrimitiveProps extends React.ComponentProps<
  typeof Button
> {
  /**
   * 是否正在生成中
   */
  generating?: boolean;
  /**
   * 生成中内容（通常是加载动画）
   * - 未提供时，默认复用 children
   */
  generatingContent?: React.ReactNode;
}

export const SendButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  SendButtonPrimitiveProps
>(
  (
    {
      generating = false,
      generatingContent,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        {...props}
        disabled={disabled}
        className={cn(
          "w-8 h-8 rounded-full p-2 gap-2",
          "bg-[var(--primary)]",
          "text-[var(--text-inverse)]",
          "transition-opacity",
          // 禁用状态：添加透明度（使用 bg-mask 的 alpha 值 0.8）
          disabled && "opacity-80",
          className,
        )}
        aria-label={generating ? "Generating" : "Send"}
      >
        {generating
          ? (generatingContent ??
            children ?? <Loader2 className="size-4 animate-spin" />)
          : (children ?? <ArrowUp className="size-4" />)}
      </Button>
    );
  },
);
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
      {attachmentButton && (
        <div className="flex items-center">{attachmentButton}</div>
      )}
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
// 使用 Sender 前缀避免与 UI 组件库中的组件重名

export {
  TextareaPrimitive as SenderTextarea,
  ButtonPrimitive as SenderButton,
  ContainerPrimitive as SenderContainer,
  RegionPrimitive as SenderRegion,
  InputRegionPrimitive as SenderInputRegion,
  ActionBarPrimitive as SenderActionBar,
  AttachmentButtonPrimitive as SenderAttachmentButton,
  ModeButtonPrimitive as SenderModeButton,
  SendButtonPrimitive as SenderSendButton,
};
