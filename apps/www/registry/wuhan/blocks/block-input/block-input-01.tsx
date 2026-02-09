"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 输入框容器原语
 * 提供输入框的基础容器样式和边框状态
 */
interface BlockInputContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否为危险状态（错误） */
  danger?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为全圆角 */
  fullRounded?: boolean;
  /** 是否为聚焦状态 */
  isFocused?: boolean;
}

const BlockInputContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  BlockInputContainerPrimitiveProps
>(({ className, danger, disabled, fullRounded, isFocused, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // 基础布局和尺寸
        "relative flex items-center gap-2",
        "px-2 py-[5px]",
        "border",
        "font-[var(--font-family-cn)]",
        // 圆角
        fullRounded ? "rounded-full" : "rounded-[var(--radius-lg)]",
        // 背景色
        "bg-[var(--background-primary)]",
        // 过渡动画
        "transition-all duration-300",

        // 默认主题样式
        !danger &&
          !disabled && [
            // 默认状态
            "border-[var(--border-neutral)]",
            // Hover 状态
            "hover:border-[var(--border-brand)]",
            // Focus 状态
            isFocused && [
              "border-[var(--border-brand)]",
              "ring-2",
              "ring-[var(--ring)]",
            ],
          ],

        // Danger 主题样式
        danger &&
          !disabled && [
            // 默认状态
            "border-[var(--border-error)]",
            // Hover 状态
            "hover:border-[var(--border-error)]",
            // Focus 状态
            isFocused && [
              "border-[var(--border-error)]",
              "ring-2",
              "ring-[var(--border-error)]/20",
            ],
          ],

        // Disabled 状态
        disabled && [
          "border-[var(--border-neutral)]",
          "bg-[var(--bg-container-disable)]",
          "opacity-50",
          "cursor-not-allowed",
        ],

        className,
      )}
      {...props}
    />
  );
});
BlockInputContainerPrimitive.displayName = "BlockInputContainerPrimitive";

/**
 * 输入框前缀原语
 */
const BlockInputPrefixPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center",
        "text-[var(--text-secondary)]",
        "shrink-0",
        className,
      )}
      {...props}
    />
  );
});
BlockInputPrefixPrimitive.displayName = "BlockInputPrefixPrimitive";

/**
 * 输入框后缀原语
 */
const BlockInputSuffixPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center",
        "text-[var(--text-secondary)]",
        "shrink-0",
        className,
      )}
      {...props}
    />
  );
});
BlockInputSuffixPrimitive.displayName = "BlockInputSuffixPrimitive";

/**
 * 单行输入框原语
 */
interface BlockInputPrimitiveProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const BlockInputPrimitive = React.forwardRef<
  HTMLInputElement,
  BlockInputPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex-1 w-full",
        "bg-transparent",
        "outline-none",
        "font-size-2",
        "text-[var(--text-primary)]",
        "placeholder:text-[var(--text-placeholder)]",
        "disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
});
BlockInputPrimitive.displayName = "BlockInputPrimitive";

/**
 * 多行输入框原语
 */
interface BlockTextareaPrimitiveProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const BlockTextareaPrimitive = React.forwardRef<
  HTMLTextAreaElement,
  BlockTextareaPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex-1 w-full",
        "bg-transparent",
        "outline-none",
        "text-[var(--text-primary)]",
        "placeholder:text-[var(--text-placeholder)]",
        "disabled:cursor-not-allowed",
        "resize-none",
        "min-h-[80px]",
        className,
      )}
      {...props}
    />
  );
});
BlockTextareaPrimitive.displayName = "BlockTextareaPrimitive";

export {
  BlockInputContainerPrimitive,
  BlockInputPrefixPrimitive,
  BlockInputSuffixPrimitive,
  BlockInputPrimitive,
  BlockTextareaPrimitive,
};

export type {
  BlockInputContainerPrimitiveProps,
  BlockInputPrimitiveProps,
  BlockTextareaPrimitiveProps,
};
