"use client";

import * as React from "react";
import {
  QuickActionButton,
  QuickActionGroup,
  QuickActionIcon,
} from "@/registry/wuhan/blocks/quick-action/quick-action-01";
import { cn } from "@/lib/utils";

function withIconSize(icon: React.ReactNode, sizeClassName: string) {
  if (!React.isValidElement(icon)) return icon;
  const el = icon as React.ReactElement<{ className?: string }>;
  return React.cloneElement(el, {
    className: cn(sizeClassName, el.props.className),
  });
}

export interface PromptGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 按钮组内容
   */
  children: React.ReactNode;
}

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
 * 用于包裹 Prompt 按钮，提供合适的间距，并让按钮统一高度
 */
export const PromptGroup = React.forwardRef<HTMLDivElement, PromptGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <QuickActionGroup
        ref={ref}
        className={cn("items-stretch", className)}
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
 * Prompt 按钮组件（垂直布局）
 * - icon 容器：24x24 / padding 4 / radius-sm / bg-brand-light，hover 切到 bg-container
 * - icon 本体：16px
 * - 在 PromptGroup 中会自动拉伸到相同高度
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
      className={cn(
        // Equal height in PromptGroup: align-items stretch + each card self-stretch + card height must be auto.
        "flex",
        "self-stretch",
        "h-auto",
        "group/prompt-button",
        "flex-col items-start justify-start",
        "rounded-xl",
        "p-[var(--padding-com-lg)]",
        "max-w-[224px]",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center",
          "size-[var(--space-8)]",
          "p-[var(--padding-com-xs)]",
          "rounded-[var(--radius-sm)]",
          "bg-[var(--bg-brand-light)]",
          "transition-colors",
          "group-hover/prompt-button:bg-[var(--bg-container)]",
        )}
      >
        <QuickActionIcon>{withIconSize(icon, "size-4")}</QuickActionIcon>
      </span>
      <span className="text-left break-words whitespace-normal w-full">
        {children}
      </span>
    </QuickActionButton>
  );
});
PromptButton.displayName = "PromptButton";
