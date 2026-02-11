"use client";

import * as React from "react";
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
      "bg-[var(--bg-brand)]",
      "text-[var(--text-inverse)]",
      // hover 状态
      "hover:bg-[var(--bg-brand-hover)]",
      "hover:text-[var(--text-inverse)]",
      // active/pressed 状态
      "active:bg-[var(--bg-brand-active)]",
      "active:text-[var(--text-inverse)]",
    ),
    disabled: cn(
      "bg-[var(--bg-brand)]",
      "opacity-50",
      "text-[var(--text-inverse)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-brand)]",
      "opacity-50",
      "text-[var(--text-inverse)]",
      "cursor-not-allowed",
    ),
    progress: cn("bg-[var(--bg-brand)]", "text-[var(--text-inverse)]"),
  },
  text: {
    default: cn(
      "bg-[var(--bg-container)]",
      "text-[var(--text-brand)]",
      // hover 状态
      "hover:bg-[var(--bg-brand-light)]",
      // active/pressed 状态
      "active:bg-[var(--bg-brand-light-active)]",
    ),
    disabled: cn(
      "bg-[var(--bg-container-disable)]",
      "text-[var(--text-disable)]",
      "border-transparent",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-container-disable)]",
      "text-[var(--text-disable)]",
      "border-transparent",
      "cursor-not-allowed",
    ),
    progress: cn(
      "bg-[var(--bg-container)]",
      "text-[var(--text-brand)]",
      "border",
      "border-transparent",
    ),
  },
  outline: {
    default: cn(
      "bg-[var(--bg-container)]",
      "text-[var(--text-brand)]",
      "border",
      "border-[var(--border-brand)]",
      // hover 状态
      "hover:border-[var(--border-brand-hover)]",
      "hover:text-[var(--text-brand-hover)]",
      // active/pressed 状态
      "active:border-[var(--border-brand-active)]",
      "active:text-[var(--text-brand-active)]",
    ),
    disabled: cn(
      "bg-[var(--bg-container-disable)]",
      "text-[var(--text-disable)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-container-disable)]",
      "text-[var(--text-disable)]",
      "cursor-not-allowed",
    ),
    progress: cn("bg-[var(--bg-container)]", "text-[var(--text-brand)]"),
  },
  link: {
    default: cn(
      "bg-transparent",
      "text-[var(--text-brand)]",
      // hover 状态
      "hover:text-[var(--text-brand-hover)]",
      // active/pressed 状态
      "active:text-[var(--text-brand-active)]",
    ),
    disabled: cn(
      "bg-transparent",
      "text-[var(--text-disable)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-transparent",
      "text-[var(--text-disable)]",
      "cursor-not-allowed",
    ),
    progress: cn("bg-transparent", "text-[var(--text-brand)]"),
  },
};

// Secondary colors - 次要色
const secondaryColors = {
  solid: {
    default: cn(
      "bg-[var(--bg-secondary)]",
      "text-[var(--text-inverse)]",
      // hover 状态
      "hover:bg-[var(--bg-secondary-hover)]",
      "hover:text-[var(--text-inverse)]",
      // active/pressed 状态
      "active:bg-[var(--bg-secondary-active)]",
      "active:text-[var(--text-inverse)]",
    ),
    disabled: cn(
      "bg-[var(--bg-secondary)]",
      "opacity-50",
      "text-[var(--text-inverse)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-secondary)]",
      "opacity-50",
      "text-[var(--text-inverse)]",
      "cursor-not-allowed",
    ),
    progress: cn("bg-[var(--bg-secondary)]", "text-[var(--text-inverse)]"),
  },
  text: {
    default: cn(
      "bg-[var(--bg-container)]",
      "text-[var(--text-primary)]",
      "border",
      // hover 状态
      "hover:bg-[var(--bg-neutral-light)]",
      // active/pressed 状态
      "active:bg-[var(--bg-neutral-light-hover)]",
    ),
    disabled: cn(
      "bg-[var(--bg-container-disable)]",
      "text-[var(--text-disable)]",
      "border-transparent",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-container-disable)]",
      "text-[var(--text-disable)]",
      "border-transparent",
      "cursor-not-allowed",
    ),
    progress: cn(
      "bg-[var(--bg-container)]",
      "text-[var(--text-secondary)]",
      "border",
      "border-transparent",
    ),
  },
  outline: {
    default: cn(
      "bg-[var(--bg-container)]",
      "text-[var(--text-secondary)]",
      "border-[var(--border-neutral)]",

      // hover 状态
      "hover:text-[var(--text-secondary-hover)]",
      "hover:bg-[var(--bg-neutral-light)]",
      // active/pressed 状态
      "active:text-[var(--text-secondary-active)]",
      "active:bg-[var(--bg-neutral-light-hover)]",
    ),
    disabled: cn(
      "bg-[var(--bg-container-disable)]",
      "text-[var(--text-disable)]",
      "cursor-not-allowed",
      "border-[var(--border-neutral)]",
    ),
    loading: cn(
      "bg-[var(--bg-container-disable)]",
      "text-[var(--text-disable)]",
      "cursor-not-allowed",
      "border-[var(--border-neutral)]",
    ),
    progress: cn("bg-[var(--bg-container)]", "text-[var(--text-secondary)]"),
  },
  link: {
    default: cn(
      "bg-transparent",
      "text-[var(--text-secondary)]",
      // hover 状态
      "hover:text-[var(--text-brand-hover)]",
      // active/pressed 状态
      "active:text-[var(--text-brand-active)]",
    ),
    disabled: cn(
      "bg-transparent",
      "text-[var(--text-disable)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-transparent",
      "text-[var(--text-disable)]",
      "cursor-not-allowed",
    ),
    progress: cn("bg-transparent", "text-[var(--text-secondary)]"),
  },
};

// Danger colors - 危险色
const dangerColors = {
  solid: {
    default: cn(
      "bg-[var(--bg-error)]",
      "text-[var(--text-inverse)]",
      // hover 状态
      "hover:bg-[var(--bg-error-hover)]",
      "hover:text-[var(--text-inverse)]",
      // active/pressed 状态
      "active:bg-[var(--bg-error-active)]",
      "active:text-[var(--text-inverse)]",
    ),
    disabled: cn(
      "bg-[var(--bg-error)]",
      "opacity-50",
      "text-[var(--text-inverse)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-error)]",
      "opacity-50",
      "text-[var(--text-inverse)]",
      "cursor-not-allowed",
    ),
    progress: cn("bg-[var(--bg-error)]", "text-[var(--text-inverse)]"),
  },
  text: {
    default: cn(
      "bg-[var(--bg-container)]",
      "text-[var(--text-error)]",
      // hover 状态
      "hover:bg-[var(--bg-error-light)]",
      // active/pressed 状态
      "active:bg-[var(--bg-error-light-active)]",
    ),
    disabled: cn(
      "bg-[var(--bg-container-disable)]",
      "text-[var(--text-disable)]",
      "border-transparent",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-container-disable)]",
      "text-[var(--text-disable)]",
      "border-transparent",
      "cursor-not-allowed",
    ),
    progress: cn(
      "bg-[var(--bg-container)]",
      "text-[var(--text-error)]",
      "border",
      "border-transparent",
    ),
  },
  outline: {
    default: cn(
      "bg-[var(--bg-container)]",
      "text-[var(--text-error)]",
      "border-[var(--border-error)]",
      // hover 状态
      "hover:border-[var(--border-error-hover)]",
      "hover:text-[var(--text-error-hover)]",
      // active/pressed 状态
      "active:border-[var(--border-error-active)]",
      "active:text-[var(--text-error-active)]",
    ),
    disabled: cn(
      "bg-[var(--bg-container-disable)]",
      "text-[var(--text-disable)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-container-disable)]",
      "text-[var(--text-disable)]",
      "cursor-not-allowed",
    ),
    progress: cn("bg-[var(--bg-container)]", "text-[var(--text-error)]"),
  },
  link: {
    default: cn(
      "bg-transparent",
      "text-[var(--text-error)]",
      // hover 状态
      "hover:text-[var(--text-error-hover)]",
      // active/pressed 状态
      "active:text-[var(--text-error-active)]",
    ),
    disabled: cn(
      "bg-transparent",
      "text-[var(--text-disable)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-transparent",
      "text-[var(--text-disable)]",
      "cursor-not-allowed",
    ),
    progress: cn("bg-transparent", "text-[var(--text-error)]"),
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
  // 基础布局
  "appearance-none",
  "inline-flex",
  "items-center",
  "justify-center",
  "whitespace-nowrap",
  "font-400",
  "text-center",
  "transition-all",
  // 边框
  "border",
  "border-transparent",
  // 禁用状态
  "disabled:pointer-events-none",
  "disabled:opacity-50",
  // 聚焦状态
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-[var(--ring-brand,var(--bg-brand))]",
  "focus-visible:ring-offset-2",
  // SVG 图标尺寸
  "[&_svg]:pointer-events-none",
  "[&_svg:not([class*='size-'])]:size-4",
  "[&_svg]:shrink-0",
);

// solid/text/outline 基础样式
const defaultVariantStyles = cn(
  "gap-[var(--gap-md)]",
  "rounded-[var(--radius-md)]",
  "px-[var(--padding-com-xl)]",
  "font-family-[var(--font-family-cn)]",
  "text-[var(--font-size-2)]",
  "leading-[var(--line-height-2)]",
);

// link 基础样式
const linkVariantStyles = cn(
  "gap-[var(--gap-xs)]",
  "font-family-[var(--font-family-cn)]",
  "text-[var(--font-size-2)]",
  "leading-[var(--line-height-2)]",
);

// ==================== 组件实现 ====================

/**
 * 按钮样式原语
 * 提供按钮的基础样式和变体支持
 * 只提供样式，不包含任何业务逻辑
 * @public
 */
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
    // 获取尺寸样式
    const sizeStyles = buttonSizeStyles[size] || buttonSizeStyles.md;

    // 获取颜色样式
    const colorStyles = colorMap[color]?.[variant] || colorMap.primary.solid;

    // 确定当前状态样式
    let stateStyles = colorStyles.default;

    if (disabled) {
      stateStyles = colorStyles.disabled;
    } else if (loading) {
      stateStyles = colorStyles.loading;
    } else if (progress) {
      stateStyles = colorStyles.progress;
    }

    // 获取变体基础样式
    const variantBaseStyles =
      variant === "link" ? linkVariantStyles : defaultVariantStyles;

    // 计算进度条宽度
    const progressWidth =
      progressValue !== undefined
        ? `${Math.min(100, Math.max(0, progressValue))}%`
        : "0%";

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || loading || progress}
        className={cn(
          baseStyles,
          variantBaseStyles,
          sizeStyles,
          stateStyles,
          className,
        )}
        {...props}
      >
        {/* 进度条背景（当有进度时显示） */}
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

        {/* 加载状态图标 */}
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

        {/* 按钮内容 */}
        <span className={loading || progress ? "opacity-70" : ""}>
          {children}
        </span>
      </button>
    );
  },
);

ButtonPrimitive.displayName = "ButtonPrimitive";
