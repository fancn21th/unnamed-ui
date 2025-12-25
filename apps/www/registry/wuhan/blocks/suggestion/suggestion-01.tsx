"use client";

import * as React from "react";
import {
  QuickActionButton,
  QuickActionGroup,
  QuickActionIcon,
} from "@/registry/wuhan/blocks/quick-action/quick-action-01";
import { ChevronRight } from "lucide-react";
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
 * Suggestion 按钮组属性
 */
export interface SuggestionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 按钮组内容
   */
  children: React.ReactNode;
}

/**
 * Suggestion 按钮属性
 */
export interface SuggestionButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /**
   * 文本内容
   */
  children: React.ReactNode;
  /**
   * 自定义图标（默认为 ChevronRight）
   */
  icon?: React.ReactNode;
  /**
   * 是否显示图标
   */
  showIcon?: boolean;
}

// ==================== 组件 ====================

/**
 * Suggestion 按钮组容器
 * 用于包裹 Suggestion 按钮，提供合适的间距
 */
export const SuggestionGroup = React.forwardRef<
  HTMLDivElement,
  SuggestionGroupProps
>(({ children, className, ...props }, ref) => {
  return (
    <QuickActionGroup
      ref={ref}
      className={className}
      aria-label="Next step suggestions"
      {...props}
    >
      {children}
    </QuickActionGroup>
  );
});
SuggestionGroup.displayName = "SuggestionGroup";

/**
 * Suggestion 按钮组件
 * 用于显示下一步建议，内容在前，图标在后
 */
export const SuggestionButton = React.forwardRef<
  HTMLButtonElement,
  SuggestionButtonProps
>(
  (
    {
      children,
      icon = <ChevronRight />,
      showIcon = true,
      className,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const resolvedAriaLabel =
      ariaLabel ??
      (typeof children === "string" || typeof children === "number"
        ? String(children)
        : undefined);

    return (
      <QuickActionButton
        ref={ref}
        aria-label={resolvedAriaLabel}
        className={cn("font-size-1",className)}
        {...props}
      >
        <span>{children}</span>
        {showIcon && (
          <QuickActionIcon className="text-[var(--text-secondary)]">
            {withIconSize(icon, "size-4")}
          </QuickActionIcon>
        )}
      </QuickActionButton>
    );
  },
);
SuggestionButton.displayName = "SuggestionButton";
