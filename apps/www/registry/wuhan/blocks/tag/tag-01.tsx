"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

/**
 * Tag 变体类型
 */
export type TagVariant =
  | "default"
  | "solid"
  | "outline"
  | "filled"
  | "filled-outline";

/**
 * Tag 主题类型
 */
export type TagTheme = "brand" | "success" | "warning" | "error" | "neutral";

/**
 * 主题配置 - 集中管理所有主题的 CSS 变量
 * 修改主题颜色只需要在这里修改对应的变量名
 */
const THEME_STYLES = {
  brand: {
    text: "text-[var(--text-brand)]",
    bg: "bg-[var(--bg-brand)]",
    bgLight: "bg-[var(--bg-brand-light)]",
    border: "border-[var(--border-brand)]",
    borderLight: "border-[var(--border-brand-light)]",
  },
  success: {
    text: "text-[var(--text-success)]",
    bg: "bg-[var(--bg-success)]",
    bgLight: "bg-[var(--bg-success-light)]",
    border: "border-[var(--border-success)]",
    borderLight: "border-[var(--border-success-light)]",
  },
  warning: {
    text: "text-[var(--text-warning)]",
    bg: "bg-[var(--bg-warning)]",
    bgLight: "bg-[var(--bg-warning-light)]",
    border: "border-[var(--border-warning)]",
    borderLight: "border-[var(--border-warning-light)]",
  },
  error: {
    text: "text-[var(--text-error)]",
    bg: "bg-[var(--bg-error)]",
    bgLight: "bg-[var(--bg-error-light)]",
    border: "border-[var(--border-error)]",
    borderLight: "border-[var(--border-error-light)]",
  },
  neutral: {
    text: "text-[var(--text-secondary)]",
    bg: "bg-[var(--bg-neutral)]",
    bgLight: "bg-[var(--bg-neutral-light)]",
    border: "border-[var(--border-neutral)]",
    borderLight: "border-[var(--border-neutral-light)]",
  },
} as const;

/**
 * 变体配置 - 集中管理所有变体的样式规则
 * 每个变体定义了它使用主题的哪些属性
 */
const VARIANT_STYLES = {
  // 默认变体：只有文本颜色
  default: (theme: TagTheme) => [THEME_STYLES[theme].text],

  // 纯色变体：背景色 + 白色文字
  solid: (theme: TagTheme) => ["text-white", THEME_STYLES[theme].bg],

  // 描边变体：边框 + 文本颜色
  outline: (theme: TagTheme) => [
    "border",
    "bg-container",
    THEME_STYLES[theme].border,
    THEME_STYLES[theme].text,
  ],

  // 填充变体：浅色背景 + 同色边框 + 文本颜色
  filled: (theme: TagTheme) => [
    "border",
    THEME_STYLES[theme].bgLight,
    THEME_STYLES[theme].bgLight.replace("bg-", "border-"),
    THEME_STYLES[theme].text,
  ],

  // 填充描边变体：浅色背景 + 浅色边框 + 文本颜色
  "filled-outline": (theme: TagTheme) => [
    "border",
    THEME_STYLES[theme].bgLight,
    THEME_STYLES[theme].borderLight,
    THEME_STYLES[theme].text,
  ],
} as const;

/**
 * 添加模式样式配置
 */
const ADDABLE_STYLES = [
  "border border-dashed",
  "border-[var(--border-neutral)]",
  "text-[var(--text-secondary)]",
  "bg-transparent",
  "cursor-pointer",
  "hover:border-[var(--text-brand)]",
  "hover:text-[var(--text-brand)]",
] as const;

/**
 * Tag 容器原语的属性
 */
interface TagContainerPrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 变体 */
  variant?: TagVariant;
  /** 主题 */
  theme?: TagTheme;
  /** 是否为添加模式 */
  addable?: boolean;
}

/**
 * Tag 容器原语
 * 提供基础的标签样式和主题变体
 */
const TagContainerPrimitive = React.forwardRef<
  HTMLSpanElement,
  TagContainerPrimitiveProps
>(
  (
    {
      className,
      variant = "default",
      theme = "brand",
      addable = false,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          // 基础样式
          "inline-flex items-center gap-1",
          "h-[var(--size-com-sm)]",
          "rounded-[var(--radius-sm)]",
          "px-[6px]",
          "transition-all duration-200",
          "box-border",
          // 添加模式样式
          addable && ADDABLE_STYLES,
          // 变体 + 主题样式（非添加模式）
          !addable && VARIANT_STYLES[variant](theme),

          className,
        )}
        {...props}
      />
    );
  },
);
TagContainerPrimitive.displayName = "TagContainerPrimitive";

/**
 * Tag 前缀图标原语
 */
const TagPrefixIconPrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        "shrink-0",
        className,
      )}
      {...props}
    />
  );
});
TagPrefixIconPrimitive.displayName = "TagPrefixIconPrimitive";

/**
 * Tag 文本原语
 */
const TagTextPrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "truncate",
        "font-[var(--font-family-cn)]",
        "font-size-1",
        "leading-[var(--line-height-1)]",
        className,
      )}
      {...props}
    />
  );
});
TagTextPrimitive.displayName = "TagTextPrimitive";

/**
 * Tag 关闭按钮原语的属性
 */
interface TagCloseButtonPrimitiveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 自定义关闭图标 */
  closeIcon?: React.ReactNode;
}

/**
 * Tag 关闭按钮原语
 */
const TagCloseButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  TagCloseButtonPrimitiveProps
>(({ className, closeIcon, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center",
        "shrink-0",
        "h-3.5 w-3.5",
        "rounded-sm",
        "opacity-70",
        "hover:opacity-100",
        "transition-opacity",
        "focus:outline-none",
        "cursor-pointer",
        className,
      )}
      {...props}
    >
      {closeIcon || <X className="h-3 w-3" />}
    </button>
  );
});
TagCloseButtonPrimitive.displayName = "TagCloseButtonPrimitive";

/**
 * CheckableTag 容器原语的属性
 */
interface CheckableTagContainerPrimitiveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 是否选中 */
  checked?: boolean;
}

/**
 * CheckableTag 容器原语
 * 提供可选中标签的样式和交互
 */
const CheckableTagContainerPrimitive = React.forwardRef<
  HTMLButtonElement,
  CheckableTagContainerPrimitiveProps
>(({ className, checked = false, disabled = false, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={cn(
        // 基础样式
        "inline-flex items-center gap-1",
        "h-[var(--size-com-sm)]",
        "rounded-[var(--radius-sm)]",
        "px-[6px]",
        "transition-all duration-200",
        "box-border",
        "border",
        "cursor-pointer",
        "focus:outline-none",

        // 未选中状态（neutral + filled）
        !checked &&
          !disabled && [
            "bg-[var(--bg-neutral-light)]",
            "border-[var(--bg-neutral-light)]",
            "text-[var(--text-secondary)]",
            // hover
            "hover:bg-[var(--bg-neutral-light-hover)]",
            "hover:text-[var(--text-brand-hover)]",
          ],

        // 未选中 + 禁用
        !checked &&
          disabled && [
            "bg-[var(--bg-container-disable)]",
            "border-[var(--bg-container-disable)]",
            "text-[var(--text-disable)]",
            "cursor-not-allowed",
          ],

        // 选中状态（brand + solid）
        checked &&
          !disabled && [
            "bg-[var(--bg-brand)]",
            "border-[var(--bg-brand)]",
            "text-white",
            // hover
            "hover:bg-[var(--bg-brand-hover)]",
            "hover:text-[var(--text-inverse)]",
          ],

        // 选中 + 禁用
        checked &&
          disabled && [
            "bg-[var(--bg-brand)]",
            "border-[var(--bg-brand)]",
            "text-[var(--text-inverse)]",
            "opacity-[var(--bg-solid-disable)]",
            "cursor-not-allowed",
          ],

        className,
      )}
      {...props}
    />
  );
});
CheckableTagContainerPrimitive.displayName = "CheckableTagContainerPrimitive";

/**
 * CheckableTag 图标原语
 */
const CheckableTagIconPrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        "shrink-0",
        className,
      )}
      {...props}
    />
  );
});
CheckableTagIconPrimitive.displayName = "CheckableTagIconPrimitive";

/**
 * CheckableTag 文本原语
 */
const CheckableTagTextPrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "truncate",
        "font-[var(--font-family-cn)]",
        "font-size-1",
        "leading-[var(--line-height-1)]",
        className,
      )}
      {...props}
    />
  );
});
CheckableTagTextPrimitive.displayName = "CheckableTagTextPrimitive";

export {
  TagContainerPrimitive,
  TagPrefixIconPrimitive,
  TagTextPrimitive,
  TagCloseButtonPrimitive,
  CheckableTagContainerPrimitive,
  CheckableTagIconPrimitive,
  CheckableTagTextPrimitive,
};

export type {
  TagContainerPrimitiveProps,
  TagCloseButtonPrimitiveProps,
  CheckableTagContainerPrimitiveProps,
};
