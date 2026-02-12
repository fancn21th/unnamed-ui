"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import {
  SidebarHistorySearchContainer,
  SidebarHistorySearchInput,
} from "@/registry/wuhan/blocks/sidebar/sidebar-01";
import { Button } from "@/registry/wuhan/ui/button";
import {
  ToggleButtonPrimitive,
  ToggleButtonGroupPrimitive,
} from "@/registry/wuhan/blocks/toggle-button/toggle-button-01";

// ==================== 类型定义 ====================

/**
 * 反馈按钮原语属性
 * 注意：这是 ToggleButtonPrimitive 的别名类型
 * 为了向后兼容保留此类型，建议直接使用 ToggleButtonPrimitiveProps from toggle-button block
 * @public
 */
type FeedbackButtonPrimitiveProps = React.ComponentProps<
  typeof ToggleButtonPrimitive
>;

/**
 * 反馈容器原语属性
 * @public
 */
interface FeedbackContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 关闭按钮点击事件
   */
  onClose?: () => void;
}

/**
 * 反馈头部原语属性
 * @public
 */
interface FeedbackHeaderPrimitiveProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /**
   * 标题文本
   */
  title?: React.ReactNode;
  /**
   * 关闭按钮点击事件
   */
  onClose?: () => void;
}

/**
 * 反馈按钮组原语属性
 * 注意：这是 ToggleButtonGroupPrimitive 的别名类型
 * 为了向后兼容保留此类型，建议直接使用 ToggleButtonGroupPrimitiveProps from toggle-button block
 * @public
 */
type FeedbackButtonGroupPrimitiveProps = React.ComponentProps<
  typeof ToggleButtonGroupPrimitive
>;

/**
 * 反馈输入框原语属性
 * @public
 */
type FeedbackInputPrimitiveProps = React.ComponentProps<
  typeof SidebarHistorySearchInput
>;

/**
 * 反馈提交按钮原语属性
 * @public
 */
interface FeedbackSubmitButtonPrimitiveProps extends React.ComponentProps<
  typeof Button
> {
  /**
   * 提交按钮文本
   */
  children?: React.ReactNode;
}

// ==================== 样式原语层（Primitives）====================

/**
 * 反馈容器样式原语
 * @public
 */
const FeedbackContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  FeedbackContainerPrimitiveProps
>(({ className, onClose, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "w-full",
        "rounded-[var(--radius-xl)]",
        "pt-[var(--margin-com-xl)]",
        "pr-[var(--padding-com-xl)]",
        "pb-[var(--margin-com-xl)]",
        "pl-[var(--padding-com-xl)]",
        "gap-3",
        "bg-[var(--bg-page-secondary)]",
        "flex flex-col",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
FeedbackContainerPrimitive.displayName = "FeedbackContainerPrimitive";

/**
 * 反馈头部样式原语
 * @public
 */
const FeedbackHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  FeedbackHeaderPrimitiveProps
>(({ className, title = "有什么问题?", onClose, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "flex items-center justify-between",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "font-[var(--font-family-cn)]",
          "font-[var(--font-weight-600)]",
          "font-semibold",
          "font-size-3",
          "leading-[var(--line-height-3)]",
          "tracking-[0px]",
          "text-[var(--text-title)]",
        )}
        style={{
          fontSize: "var(--font-size-3)",
        }}
      >
        {title}
      </span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "appearance-none border-0 bg-transparent p-0",
            "inline-flex items-center justify-center",
            "size-4",
            "text-[var(--text-secondary)]",
            "hover:text-[var(--text-primary)]",
            "transition-colors",
            "cursor-pointer",
            "outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-[var(--ring)]",
            "focus-visible:ring-offset-1",
          )}
          aria-label="关闭"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
});
FeedbackHeaderPrimitive.displayName = "FeedbackHeaderPrimitive";

/**
 * 反馈按钮样式原语
 * 注意：这是 ToggleButtonPrimitive 的别名，默认使用 default 变体
 * 为了向后兼容保留此导出，建议直接使用 ToggleButtonPrimitive from toggle-button block
 * @public
 */
const FeedbackButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  FeedbackButtonPrimitiveProps
>(({ variant = "default", ...props }, ref) => {
  return <ToggleButtonPrimitive ref={ref} variant={variant} {...props} />;
});
FeedbackButtonPrimitive.displayName = "FeedbackButtonPrimitive";

/**
 * 反馈按钮组样式原语
 * 注意：这是 ToggleButtonGroupPrimitive 的别名
 * 为了向后兼容保留此导出，建议直接使用 ToggleButtonGroupPrimitive from toggle-button block
 * @public
 */
const FeedbackButtonGroupPrimitive = React.forwardRef<
  HTMLDivElement,
  FeedbackButtonGroupPrimitiveProps
>(({ ...props }, ref) => {
  return <ToggleButtonGroupPrimitive ref={ref} {...props} />;
});
FeedbackButtonGroupPrimitive.displayName = "FeedbackButtonGroupPrimitive";

/**
 * 反馈输入框容器样式原语
 * @public
 */
const FeedbackInputContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("[&_*]:!box-border", "w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
});
FeedbackInputContainerPrimitive.displayName = "FeedbackInputContainerPrimitive";

/**
 * 反馈输入框样式原语（复用 sidebar 搜索框样式）
 * @public
 */
const FeedbackInputPrimitive = React.forwardRef<
  HTMLInputElement,
  FeedbackInputPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <SidebarHistorySearchContainer
      className={cn(
        "w-full",
        "rounded-[var(--radius-md)]",
        "px-[var(--padding-com-md)]",
        "py-[var(--padding-com-xss)]",
        className,
      )}
    >
      <SidebarHistorySearchInput ref={ref} {...props} />
    </SidebarHistorySearchContainer>
  );
});
FeedbackInputPrimitive.displayName = "FeedbackInputPrimitive";

/**
 * 反馈提交按钮样式原语
 * @public
 */
const FeedbackSubmitButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  FeedbackSubmitButtonPrimitiveProps
>(({ className, children = "提交", ...props }, ref) => {
  return (
    <Button
      ref={ref}
      type="submit"
      className={cn(
        "[&_*]:!box-border",
        "h-8",
        "min-w-[60px]",
        "rounded-[var(--radius-md)]",
        "px-[var(--padding-com-xl)]",
        "gap-2",
        "bg-[var(--bg-brand)]",
        "text-[var(--text-inverse)]",
        "hover:bg-[var(--bg-brand-hover)]",
        "transition-colors",
        "transition-opacity",
        "font-[var(--font-family-cn)]",
        "text-sm",
        "leading-normal",
        "tracking-[0px]",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
});
FeedbackSubmitButtonPrimitive.displayName = "FeedbackSubmitButtonPrimitive";

// ==================== 统一导出 ====================

export type {
  FeedbackButtonPrimitiveProps,
  FeedbackContainerPrimitiveProps,
  FeedbackHeaderPrimitiveProps,
  FeedbackButtonGroupPrimitiveProps,
  FeedbackInputPrimitiveProps,
  FeedbackSubmitButtonPrimitiveProps,
};

export {
  FeedbackContainerPrimitive,
  FeedbackHeaderPrimitive,
  FeedbackButtonPrimitive,
  FeedbackButtonGroupPrimitive,
  FeedbackInputContainerPrimitive,
  FeedbackInputPrimitive,
  FeedbackSubmitButtonPrimitive,
};
