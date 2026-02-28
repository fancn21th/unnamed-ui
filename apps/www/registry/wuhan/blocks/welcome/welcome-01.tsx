"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function withIconSize(icon: React.ReactNode, sizeClassName: string) {
  if (!React.isValidElement(icon)) return icon;
  const el = icon as React.ReactElement<{ className?: string }>;
  return React.cloneElement(el, {
    className: cn(sizeClassName, el.props.className),
  });
}

// ==================== 原语组件 ====================

/**
 * Welcome 容器样式原语
 * 用于包裹欢迎语的图标和文案
 */
export interface WelcomeContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 容器内容（通常包含 WelcomeIcon 和 WelcomeText）
   */
  children: React.ReactNode;
}

export const WelcomeContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  WelcomeContainerPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center",
        "gap-[var(--Gap-gap-md)]",
        "[&_*]:!box-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
WelcomeContainerPrimitive.displayName = "WelcomeContainerPrimitive";

/**
 * Welcome 图标样式原语
 * 用于显示品牌色圆形图标容器
 */
export interface WelcomeIconPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 图标内容
   */
  children: React.ReactNode;
}

export const WelcomeIconPrimitive = React.forwardRef<
  HTMLDivElement,
  WelcomeIconPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        "size-10 rounded-full",
        "bg-[var(--Container-bg-brand-light)] text-[var(--Text-text-brand)]",
        "shrink-0",
        "[&_*]:!box-border",
        className,
      )}
      aria-hidden="true"
      {...props}
    >
      {React.isValidElement(children)
        ? withIconSize(children, "size-5")
        : children}
    </div>
  );
});
WelcomeIconPrimitive.displayName = "WelcomeIconPrimitive";

/**
 * Welcome 文案样式原语
 * 用于显示欢迎语文本
 */
export interface WelcomeTextPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 文案内容
   */
  children: React.ReactNode;
}

export const WelcomeTextPrimitive = React.forwardRef<
  HTMLDivElement,
  WelcomeTextPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "text-[var(--Text-text-primary)]",
        "font-semibold",
        "text-xl leading-[var(--line-height-4)] tracking-[0px]",
        "[&_*]:!box-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
WelcomeTextPrimitive.displayName = "WelcomeTextPrimitive";

// ==================== 导出所有原语 ====================
// 使用 Welcome 前缀避免与 UI 组件库中的组件重名

export {
  WelcomeContainerPrimitive as WelcomeContainer,
  WelcomeIconPrimitive as WelcomeIcon,
  WelcomeTextPrimitive as WelcomeText,
};
