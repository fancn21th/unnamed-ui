"use client";

import * as React from "react";
import {
  QuickActionButton,
  QuickActionGroup,
  QuickActionIcon,
} from "@/registry/wuhan/blocks/quick-action/quick-action-01";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

function withIconSize(icon: React.ReactNode, sizeClassName: string) {
  if (!React.isValidElement(icon)) return icon;
  const el = icon as React.ReactElement<{ className?: string }>;
  return React.cloneElement(el, {
    className: cn(sizeClassName, el.props.className),
  });
}

/**
 * Prompt 按钮属性
 */
export interface PromptButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /**
   * 图标
   */
  icon: React.ReactNode;
  /**
   * 文本内容
   */
  children: React.ReactNode;
}

// ==================== 组件 ====================

/**
 * Prompt 按钮组容器
 * 用于包裹 Prompt 按钮，提供合适的间距
 */
export interface PromptGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 按钮组内容
   */
  children: React.ReactNode;
}

export const PromptGroup = React.forwardRef<HTMLDivElement, PromptGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <QuickActionGroup
        ref={ref}
        className={className}
        aria-label="Prompt suggestions"
        {...props}
      >
        {children}
      </QuickActionGroup>
    );
  },
);
PromptGroup.displayName = "PromptGroup";

/**
 * Prompt 按钮组件
 * 用于显示提示操作（水平布局）
 */
export const PromptButton = React.forwardRef<
  HTMLButtonElement,
  PromptButtonProps
>(({ icon, children, className, "aria-label": ariaLabel, ...props }, ref) => {
  const resolvedAriaLabel =
    ariaLabel ??
    (typeof children === "string" || typeof children === "number"
      ? String(children)
      : undefined);

  return (
    <QuickActionButton
      ref={ref}
      aria-label={resolvedAriaLabel}
      className={className}
      {...props}
    >
      <QuickActionIcon>{withIconSize(icon, "size-4")}</QuickActionIcon>
      <span>{children}</span>
    </QuickActionButton>
  );
});
PromptButton.displayName = "PromptButton";
