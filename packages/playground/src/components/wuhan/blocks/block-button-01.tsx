"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

/**
 * 按钮类型
 * - "solid": 实心按钮
 * - "text": 文字按钮
 * - "outline": 边框按钮
 * - "link": 链接按钮
 */
export type ButtonVariant = "solid" | "text" | "outline" | "link";

/**
 * 按钮颜色
 * - "primary": 主色
 * - "secondary": 次要色
 * - "danger": 危险色
 */
export type ButtonColor = "primary" | "secondary" | "danger";

/**
 * 按钮尺寸
 * - "sm": 小号
 * - "md": 中号
 * - "lg": 大号
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * 按钮原语属性
 * @public
 */
export interface ButtonPrimitiveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮变体样式
   * @default "solid"
   */
  variant?: ButtonVariant;
  /**
   * 按钮颜色
   * @default "primary"
   */
  color?: ButtonColor;
  /**
   * 按钮尺寸
   * @default "md"
   */
  size?: ButtonSize;
  /**
   * 是否加载中状态
   * @default false
   */
  loading?: boolean;
  /**
   * 是否禁用状态
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否正在进度状态（用于上传、下载等场景）
   * @default false
   */
  progress?: boolean;
  /**
   * 进度值 0-100
   */
  progressValue?: number;
}

// ==================== 尺寸配置 ====================

const buttonSizeStyles = {
  sm: cn("h-7", "px-3", "text-xs", "leading-[16px]"),
  md: cn("h-8", "px-4", "text-sm", "leading-[20px]"),
  lg: cn("h-10", "px-6", "text-base", "leading-[24px]"),
};

// ==================== 颜色配置 ====================

// Primary colors - 主色
const primaryColors = {
  solid: {
    default: cn(
      "bg-[var(--Container-bg-brand)]",
      "text-[var(--Text-text-inverse)]",
      "hover:bg-[var(--Container-bg-brand-hover)]",
      "hover:text-[var(--Text-text-inverse)]",
      "active:bg-[var(--Container-bg-brand-active)]",
      "active:text-[var(--Text-text-inverse)]",
    ),
    disabled: cn(
      "bg-[var(--Container-bg-brand)]",
      "opacity-50",
      "text-[var(--Text-text-inverse)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--Container-bg-brand)]",
      "opacity-50",
      "text-[var(--Text-text-inverse)]",
      "cursor-not-allowed",
    ),
    progress: cn(
      "bg-[var(--Container-bg-brand)]",
      "text-[var(--Text-text-inverse)]",
    ),
  },
  text: {
    default: cn(
      "bg-[var(--Container-bg-container)]",
      "text-[var(--Text-text-brand)]",
      "hover:bg-[var(--Container-bg-brand-light)]",
      "active:bg-[var(--Container-bg-brand-light-active)]",
    ),
    disabled: cn(
      "bg-[var(--Container-bg-container-disable)]",
      "text-[var(--Text-text-disable)]",
      "border-transparent",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--Container-bg-container-disable)]",
      "text-[var(--Text-text-disable)]",
      "border-transparent",
      "cursor-not-allowed",
    ),
    progress: cn(
      "bg-[var(--Container-bg-container)]",
      "text-[var(--Text-text-brand)]",
      "border",
      "border-transparent",
    ),
  },
  outline: {
    default: cn(
      "bg-[var(--Container-bg-container)]",
      "text-[var(--Text-text-brand)]",
      "border",
      "border-[var(--Border-border-brand)]",
      "hover:border-[var(--Border-border-brand-hover)]",
      "hover:text-[var(--Text-text-brand-hover)]",
      "active:border-[var(--Border-border-brand-active)]",
      "active:text-[var(--Text-text-brand-active)]",
    ),
    disabled: cn(
      "bg-[var(--Container-bg-container-disable)]",
      "text-[var(--Text-text-disable)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--Container-bg-container-disable)]",
      "text-[var(--Text-text-disable)]",
      "cursor-not-allowed",
    ),
    progress: cn(
      "bg-[var(--Container-bg-container)]",
      "text-[var(--Text-text-brand)]",
    ),
  },
  link: {
    default: cn(
      "bg-transparent",
      "text-[var(--Text-text-brand)]",
      "hover:text-[var(--Text-text-brand-hover)]",
      "active:text-[var(--Text-text-brand-active)]",
    ),
    disabled: cn(
      "bg-transparent",
      "text-[var(--Text-text-disable)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-transparent",
      "text-[var(--Text-text-disable)]",
      "cursor-not-allowed",
    ),
    progress: cn("bg-transparent", "text-[var(--Text-text-brand)]"),
  },
};

// Secondary colors - 次要色
const secondaryColors = {
  solid: {
    default: cn(
      "bg-[var(--Container-bg-neutral)]",
      "text-[var(--Text-text-inverse)]",
      "hover:bg-[var(--Container-bg-neutral-hover)]",
      "hover:text-[var(--Text-text-inverse)]",
      "active:bg-[var(--Container-bg-neutral-active)]",
      "active:text-[var(--Text-text-inverse)]",
    ),
    disabled: cn(
      "bg-[var(--Container-bg-neutral)]",
      "opacity-50",
      "text-[var(--Text-text-inverse)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--Container-bg-neutral)]",
      "opacity-50",
      "text-[var(--Text-text-inverse)]",
      "cursor-not-allowed",
    ),
    progress: cn(
      "bg-[var(--Container-bg-neutral)]",
      "text-[var(--Text-text-inverse)]",
    ),
  },
  text: {
    default: cn(
      "bg-[var(--Container-bg-container)]",
      "text-[var(--Text-text-primary)]",
      "border",
      "hover:bg-[var(--Container-bg-neutral-light)]",
      "active:bg-[var(--Container-bg-neutral-light-hover)]",
    ),
    disabled: cn(
      "bg-[var(--Container-bg-container-disable)]",
      "text-[var(--Text-text-disable)]",
      "border-transparent",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--Container-bg-container-disable)]",
      "text-[var(--Text-text-disable)]",
      "border-transparent",
      "cursor-not-allowed",
    ),
    progress: cn(
      "bg-[var(--Container-bg-container)]",
      "text-[var(--Text-text-primary)]",
      "border",
      "border-transparent",
    ),
  },
  outline: {
    default: cn(
      "bg-[var(--Container-bg-container)]",
      "text-[var(--Text-text-primary)]",
      "border-[var(--Border-border-neutral)]",
      "hover:text-[var(--Text-text-primary)]",
      "hover:bg-[var(--Container-bg-neutral-light)]",
      "active:text-[var(--Text-text-primary)]",
      "active:bg-[var(--Container-bg-neutral-light-hover)]",
    ),
    disabled: cn(
      "bg-[var(--Container-bg-container-disable)]",
      "text-[var(--Text-text-disable)]",
      "cursor-not-allowed",
      "border-[var(--Border-border-neutral)]",
    ),
    loading: cn(
      "bg-[var(--Container-bg-container-disable)]",
      "text-[var(--Text-text-disable)]",
      "cursor-not-allowed",
      "border-[var(--Border-border-neutral)]",
    ),
    progress: cn(
      "bg-[var(--Container-bg-container)]",
      "text-[var(--Text-text-primary)]",
    ),
  },
  link: {
    default: cn(
      "bg-transparent",
      "text-[var(--Text-text-primary)]",
      "hover:text-[var(--Text-text-brand-hover)]",
      "active:text-[var(--Text-text-brand-active)]",
    ),
    disabled: cn(
      "bg-transparent",
      "text-[var(--Text-text-disable)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-transparent",
      "text-[var(--Text-text-disable)]",
      "cursor-not-allowed",
    ),
    progress: cn("bg-transparent", "text-[var(--Text-text-primary)]"),
  },
};

// Danger colors - 危险色
const dangerColors = {
  solid: {
    default: cn(
      "bg-[var(--Container-bg-error)]",
      "text-[var(--Text-text-inverse)]",
      "hover:bg-[var(--Container-bg-error-hover)]",
      "hover:text-[var(--Text-text-inverse)]",
      "active:bg-[var(--Container-bg-error-active)]",
      "active:text-[var(--Text-text-inverse)]",
    ),
    disabled: cn(
      "bg-[var(--Container-bg-error)]",
      "opacity-50",
      "text-[var(--Text-text-inverse)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--Container-bg-error)]",
      "opacity-50",
      "text-[var(--Text-text-inverse)]",
      "cursor-not-allowed",
    ),
    progress: cn(
      "bg-[var(--Container-bg-error)]",
      "text-[var(--Text-text-inverse)]",
    ),
  },
  text: {
    default: cn(
      "bg-[var(--Container-bg-container)]",
      "text-[var(--Text-text-error)]",
      "hover:bg-[var(--Container-bg-error-light)]",
      "active:bg-[var(--Container-bg-error-light-active)]",
    ),
    disabled: cn(
      "bg-[var(--Container-bg-container-disable)]",
      "text-[var(--Text-text-disable)]",
      "border-transparent",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--Container-bg-container-disable)]",
      "text-[var(--Text-text-disable)]",
      "border-transparent",
      "cursor-not-allowed",
    ),
    progress: cn(
      "bg-[var(--Container-bg-container)]",
      "text-[var(--Text-text-error)]",
      "border",
      "border-transparent",
    ),
  },
  outline: {
    default: cn(
      "bg-[var(--Container-bg-container)]",
      "text-[var(--Text-text-error)]",
      "border-[var(--Border-border-error)]",
      "hover:border-[var(--Border-border-error-hover)]",
      "hover:text-[var(--Text-text-error-hover)]",
      "active:border-[var(--Border-border-error-active)]",
      "active:text-[var(--Text-text-error-active)]",
    ),
    disabled: cn(
      "bg-[var(--Container-bg-container-disable)]",
      "text-[var(--Text-text-disable)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--Container-bg-container-disable)]",
      "text-[var(--Text-text-disable)]",
      "cursor-not-allowed",
    ),
    progress: cn(
      "bg-[var(--Container-bg-container)]",
      "text-[var(--Text-text-error)]",
    ),
  },
  link: {
    default: cn(
      "bg-transparent",
      "text-[var(--Text-text-error)]",
      "hover:text-[var(--Text-text-error-hover)]",
      "active:text-[var(--Text-text-error-active)]",
    ),
    disabled: cn(
      "bg-transparent",
      "text-[var(--Text-text-disable)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-transparent",
      "text-[var(--Text-text-disable)]",
      "cursor-not-allowed",
    ),
    progress: cn("bg-transparent", "text-[var(--Text-text-error)]"),
  },
};

// 颜色映射
const colorMap: Record<ButtonColor, typeof primaryColors> = {
  primary: primaryColors,
  secondary: secondaryColors,
  danger: dangerColors,
};

// ==================== 基础样式 ====================

const baseStyles = cn(
  "appearance-none",
  "inline-flex",
  "items-center",
  "justify-center",
  "whitespace-nowrap",
  "font-400",
  "text-center",
  "transition-all",
  "border",
  "border-transparent",
  "disabled:pointer-events-none",
  "disabled:opacity-50",
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-[var(--Focusring-focusring-brand,var(--Container-bg-brand))]",
  "focus-visible:ring-offset-2",
  "[&_svg]:pointer-events-none",
  "[&_svg:not([class*='size-'])]:size-4",
  "[&_svg]:shrink-0",
);

const defaultVariantStyles = cn(
  "gap-[var(--gap-md)]",
  "rounded-[var(--radius-md)]",
  "px-[var(--padding-com-xl)]",
  "font-family-[var(--font-family-cn)]",
  "font-size-2",
  "leading-[var(--line-height-2)]",
);

const linkVariantStyles = cn(
  "gap-[var(--gap-xs)]",
  "font-family-[var(--font-family-cn)]",
  "font-size-2",
  "leading-[var(--line-height-2)]",
);

// ==================== 组件实现 ====================

export const ButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  ButtonPrimitiveProps
>(
  (
    {
      className,
      variant = "solid",
      color = "primary",
      size = "md",
      loading = false,
      disabled = false,
      progress = false,
      progressValue,
      children,
      ...props
    },
    ref,
  ) => {
    const sizeStyles = buttonSizeStyles[size] || buttonSizeStyles.md;
    const colorStyles = colorMap[color]?.[variant] || colorMap.primary.solid;

    let stateStyles = colorStyles.default;
    if (disabled) {
      stateStyles = colorStyles.disabled;
    } else if (loading) {
      stateStyles = colorStyles.loading;
    } else if (progress) {
      stateStyles = colorStyles.progress;
    }

    const variantBaseStyles =
      variant === "link" ? linkVariantStyles : defaultVariantStyles;

    const progressWidth =
      progressValue !== undefined
        ? `${Math.min(100, Math.max(0, progressValue))}%`
        : "0%";

    return (
      <Button
        asChild
        variant="unstyled"
        size="unstyled"
        className={cn(
          baseStyles,
          variantBaseStyles,
          sizeStyles,
          stateStyles,
          className,
        )}
      >
        <button
          ref={ref}
          type="button"
          disabled={disabled || loading || progress}
          {...props}
        >
          {progress && (
            <div
              className={cn(
                "absolute inset-0",
                "rounded-[inherit]",
                "bg-current",
                "opacity-20",
              )}
              style={{ width: progressWidth }}
              aria-hidden="true"
            />
          )}

          {loading && (
            <svg
              className="animate-spin size-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}

          <span className={loading || progress ? "opacity-70" : ""}>
            {children}
          </span>
        </button>
      </Button>
    );
  },
);

ButtonPrimitive.displayName = "ButtonPrimitive";
