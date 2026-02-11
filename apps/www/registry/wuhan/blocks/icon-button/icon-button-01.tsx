"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

/**
 * Icon 按钮变体样式
 * - "solid": 实心按钮
 * - "light": 浅色按钮（背景 + 边框）
 * - "outline": 边框按钮
 * - "ghost": 幽灵按钮（透明背景）
 */
export type IconButtonVariant = "solid" | "light" | "outline" | "ghost";

/**
 * Icon 按钮颜色
 * - "primary": 主色
 * - "secondary": 次要色
 * - "danger": 危险色
 */
export type IconButtonColor = "primary" | "secondary" | "danger";

/**
 * Icon 按钮尺寸
 * - "sm": 小号 (24px)
 * - "md": 中号 (32px)
 * - "lg": 大号 (36px)
 * - "xl": 超大号 (40px)
 */
export type IconButtonSize = "sm" | "md" | "lg" | "xl";

/**
 * Icon 按钮原语属性
 * @public
 */
export interface IconButtonPrimitiveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮变体样式
   * @default "solid"
   */
  variant?: IconButtonVariant;
  /**
   * 按钮颜色
   * @default "primary"
   */
  color?: IconButtonColor;
  /**
   * 按钮尺寸
   * @default "md"
   */
  size?: IconButtonSize;
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
   * 是否无边框模式（仅 light 变体有效）
   * @default false
   */
  borderless?: boolean;
}

// ==================== 尺寸配置 ====================

const iconButtonSizeStyles: Record<IconButtonSize, string> = {
  sm: cn("size-6", "[&_svg]:size-3.5"),
  md: cn("size-8", "[&_svg]:size-4"),
  lg: cn("size-9", "[&_svg]:size-4.5"),
  xl: cn("size-10", "[&_svg]:size-5"),
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
  },
  light: {
    default: cn(
      "bg-[var(--bg-brand-light)]",
      "text-[var(--text-brand)]",
      "border",
      "border-[var(--border-brand-light)]",
      // hover 状态
      "hover:bg-[var(--bg-brand-light-hover)]",
      "hover:border-[var(--border-brand-light-hover)]",
      // active/pressed 状态
      "active:bg-[var(--bg-brand-light-active)]",
      "active:border-[var(--border-brand-light-active)]",
    ),
    disabled: cn(
      "bg-[var(--bg-brand-light)]",
      "opacity-50",
      "text-[var(--text-brand)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-brand-light)]",
      "opacity-50",
      "text-[var(--text-brand)]",
      "cursor-not-allowed",
    ),
  },
  lightBorderless: {
    default: cn(
      "bg-[var(--bg-brand-light)]",
      "text-[var(--text-brand)]",
      // hover 状态
      "hover:bg-[var(--bg-brand-light-hover)]",
      // active/pressed 状态
      "active:bg-[var(--bg-brand-light-active)]",
    ),
    disabled: cn(
      "bg-[var(--bg-brand-light)]",
      "opacity-50",
      "text-[var(--text-brand)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-brand-light)]",
      "opacity-50",
      "text-[var(--text-brand)]",
      "cursor-not-allowed",
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
  },
  ghost: {
    default: cn(
      "bg-transparent",
      "text-[var(--text-brand)]",
      // hover 状态
      "hover:bg-[var(--bg-brand-light)]",
      // active/pressed 状态
      "active:bg-[var(--bg-brand-light-active)]",
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
      "text-[(--text-inverse)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-secondary)]",
      "opacity-50",
      "text-[var(--text-inverse)]",
      "cursor-not-allowed",
    ),
  },
  outline: {
    default: cn(
      "bg-[var(--bg-container)]",
      "text-[var(--text-secondary)]",
      "border",
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
    ),
    loading: cn(
      "bg-[var(--bg-container-disable)]",
      "text-[var(--text-disable)]",
      "cursor-not-allowed",
    ),
  },
  ghost: {
    default: cn(
      "bg-transparent",
      "text-[var(--text-secondary)]",
      // hover 状态
      "hover:bg-[var(--bg-neutral-light)]",
      // active/pressed 状态
      "active:bg-[var(--bg-neutral-light-hover)]",
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
  },
  light: {
    default: cn(
      "bg-[var(--bg-secondary-light)]",
      "text-[var(--text-secondary)]",
      "border",
      "border-[var(--border-secondary-light)]",
      // hover 状态
      "hover:bg-[var(--bg-secondary-light-hover)]",
      "hover:border-[var(--border-secondary-light-hover)]",
      // active/pressed 状态
      "active:bg-[var(--bg-secondary-light-active)]",
      "active:border-[var(--border-secondary-light-active)]",
    ),
    disabled: cn(
      "bg-[var(--bg-secondary-light)]",
      "opacity-50",
      "text-[var(--text-secondary)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-secondary-light)]",
      "opacity-50",
      "text-[var(--text-secondary)]",
      "cursor-not-allowed",
    ),
  },
  lightBorderless: {
    default: cn(
      "bg-[var(--bg-secondary-light)]",
      "text-[var(--text-secondary)]",
      // hover 状态
      "hover:bg-[var(--bg-secondary-light-hover)]",
      // active/pressed 状态
      "active:bg-[var(--bg-secondary-light-active)]",
    ),
    disabled: cn(
      "bg-[var(--bg-secondary-light)]",
      "opacity-50",
      "text-[var(--text-secondary)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-secondary-light)]",
      "opacity-50",
      "text-[var(--text-secondary)]",
      "cursor-not-allowed",
    ),
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
  },
  outline: {
    default: cn(
      "bg-[var(--bg-container)]",
      "text-[var(--text-error)]",
      "border",
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
  },
  ghost: {
    default: cn(
      "bg-transparent",
      "text-[var(--text-error)]",
      // hover 状态
      "hover:bg-[var(--bg-error-light)]",
      // active/pressed 状态
      "active:bg-[var(--bg-error-light-active)]",
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
  },
  light: {
    default: cn(
      "bg-[var(--bg-error-light)]",
      "text-[var(--text-error)]",
      "border",
      "border-[var(--border-error-light)]",
      // hover 状态
      "hover:bg-[var(--bg-error-light-hover)]",
      "hover:border-[var(--border-error-light-hover)]",
      // active/pressed 状态
      "active:bg-[var(--bg-error-light-active)]",
      "active:border-[var(--border-error-light-active)]",
    ),
    disabled: cn(
      "bg-[var(--bg-error-light)]",
      "opacity-50",
      "text-[var(--text-error)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-error-light)]",
      "opacity-50",
      "text-[var(--text-error)]",
      "cursor-not-allowed",
    ),
  },
  lightBorderless: {
    default: cn(
      "bg-[var(--bg-error-light)]",
      "text-[var(--text-error)]",
      // hover 状态
      "hover:bg-[var(--bg-error-light-hover)]",
      // active/pressed 状态
      "active:bg-[var(--bg-error-light-active)]",
    ),
    disabled: cn(
      "bg-[var(--bg-error-light)]",
      "opacity-50",
      "text-[var(--text-error)]",
      "cursor-not-allowed",
    ),
    loading: cn(
      "bg-[var(--bg-error-light)]",
      "opacity-50",
      "text-[var(--text-error)]",
      "cursor-not-allowed",
    ),
  },
};

// 颜色映射
const colorMap: Record<IconButtonColor, typeof primaryColors> = {
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
  // SVG 图标样式
  "[&_svg]:pointer-events-none",
  "[&_svg]:shrink-0",
  // 圆角
  "rounded-[var(--radius-md)]",
);

// ==================== 组件实现 ====================

/**
 * Icon Button 原语组件
 * 提供图标按钮的基础样式和变体支持
 * 只提供样式，不包含任何业务逻辑
 * @public
 */
export const IconButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  IconButtonPrimitiveProps
>(
  (
    {
      className,
      variant = "solid",
      color = "primary",
      size = "md",
      loading = false,
      disabled = false,
      borderless = false,
      children,
      ...props
    },
    ref,
  ) => {
    // 获取尺寸样式
    const sizeStyles = iconButtonSizeStyles[size] || iconButtonSizeStyles.md;

    // 获取颜色样式
    // light 变体支持 borderless 模式
    let variantKey:
      | "solid"
      | "light"
      | "lightBorderless"
      | "outline"
      | "ghost" = variant;
    if (variant === "light" && borderless) {
      variantKey = "lightBorderless";
    }
    const colorStyles = colorMap[color]?.[variantKey] || colorMap.primary.solid;

    // 确定当前状态样式
    let stateStyles = colorStyles.default;

    if (disabled) {
      stateStyles = colorStyles.disabled;
    } else if (loading) {
      stateStyles = colorStyles.loading;
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || loading}
        className={cn(baseStyles, sizeStyles, stateStyles, className)}
        {...props}
      >
        {/* 加载状态图标 */}
        {loading && (
          <svg
            className="animate-spin shrink-0"
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

        {/* 图标内容 */}
        {!loading && children}
      </button>
    );
  },
);

IconButtonPrimitive.displayName = "IconButtonPrimitive";

// ==================== 类型导出 ====================
