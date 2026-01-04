"use client";

import * as React from "react";
import { Button } from "@/registry/wuhan/ui/button";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

/**
 * 开关按钮样式原语属性
 * @public
 */
export interface ToggleButtonPrimitiveProps extends Omit<
  React.ComponentProps<typeof Button>,
  "variant"
> {
  /**
   * 是否选中状态
   */
  selected?: boolean;
  /**
   * 按钮变体样式
   * - "default": 默认样式（用于反馈组件等场景）
   * - "compact": 紧凑样式（用于sender组件等场景）
   */
  variant?: "default" | "compact";
}

/**
 * 开关按钮组样式原语属性
 * @public
 */
export interface ToggleButtonGroupPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 选项列表
   */
  options?: Array<{
    id: string;
    label: React.ReactNode;
  }>;
  /**
   * 选中的选项ID（单选模式）
   */
  selectedId?: string;
  /**
   * 选中的选项ID列表（多选模式）
   */
  selectedIds?: string[];
  /**
   * 是否支持多选
   */
  multiple?: boolean;
  /**
   * 选项改变回调（单选模式）
   */
  onOptionChange?: (id: string) => void;
  /**
   * 选项改变回调（多选模式）
   */
  onOptionsChange?: (ids: string[]) => void;
  /**
   * 按钮变体样式
   */
  variant?: "default" | "compact";
}

// ==================== 样式原语层（Primitives）====================

/**
 * 开关按钮样式原语
 * 提供开关按钮的基础样式和选中/未选中状态
 * @public
 */
export const ToggleButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonPrimitiveProps
>(({ className, selected = false, variant = "default", ...props }, ref) => {
  const isCompact = variant === "compact";

  return (
    <Button
      ref={ref}
      type="button"
      className={cn(
        "[&_*]:!box-border",
        "rounded-[var(--radius-lg)]",
        "border",
        "gap-1", // gap: 4px
        "transition-colors",
        "font-[var(--font-family-cn)]",
        "text-sm",
        "leading-normal",
        "tracking-[0px]",
        "inline-flex items-center justify-center",
        // 默认样式（用于反馈组件等场景）
        !isCompact && [
          "h-8",
          "px-[var(--padding-com-md)]",
          // default 状态
          !selected && [
            "bg-[var(--bg-container)]",
            "border-[var(--border-neutral)]",
            "text-[var(--text-secondary)]",
            "hover:bg-[var(--bg-neutral-light)]",
            "hover:border-[var(--border-neutral)]",
            "hover:text-[var(--text-secondary)]",
          ],
          // selected 状态
          selected && [
            "bg-[var(--bg-container)]",
            "border-[var(--border-brand-light-hover)]",
            "text-[var(--text-brand)]",
            "hover:bg-[var(--bg-container)]",
          ],
        ],
        // 紧凑样式（用于sender组件等场景）
        isCompact && [
          "h-[var(--size-com-md)]",
          "px-3",
          // default 状态
          !selected && [
            "bg-transparent",
            "border-[var(--border-neutral)]",
            "text-[var(--text-primary)]",
            "hover:bg-[var(--bg-neutral-light)]",
          ],
          // selected 状态
          selected && [
            "bg-[var(--bg-brand-light)]",
            "border-[var(--border-brand-light-hover)]",
            "text-[var(--text-brand)]",
            "hover:bg-[var(--bg-container)]",
          ],
        ],
        className,
      )}
      aria-pressed={selected}
      {...props}
    >
      {props.children}
    </Button>
  );
});
ToggleButtonPrimitive.displayName = "ToggleButtonPrimitive";

/**
 * 开关按钮组样式原语
 * 管理多个开关按钮，支持单选和多选模式
 * @public
 */
export const ToggleButtonGroupPrimitive = React.forwardRef<
  HTMLDivElement,
  ToggleButtonGroupPrimitiveProps
>(
  (
    {
      className,
      options = [],
      selectedId,
      selectedIds,
      multiple = false,
      onOptionChange,
      onOptionsChange,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const handleToggle = (id: string) => {
      if (multiple) {
        const currentIds = selectedIds || [];
        const newIds = currentIds.includes(id)
          ? currentIds.filter((itemId) => itemId !== id)
          : [...currentIds, id];
        onOptionsChange?.(newIds);
      } else {
        onOptionChange?.(id);
      }
    };

    const isSelected = (id: string) => {
      if (multiple) {
        return selectedIds?.includes(id) || false;
      }
      return selectedId === id;
    };

    return (
      <div
        ref={ref}
        className={cn("[&_*]:!box-border", "flex flex-wrap gap-2", className)}
        {...props}
      >
        {options.map((option) => (
          <ToggleButtonPrimitive
            key={option.id}
            selected={isSelected(option.id)}
            variant={variant}
            onClick={() => handleToggle(option.id)}
          >
            {option.label}
          </ToggleButtonPrimitive>
        ))}
      </div>
    );
  },
);
ToggleButtonGroupPrimitive.displayName = "ToggleButtonGroupPrimitive";
