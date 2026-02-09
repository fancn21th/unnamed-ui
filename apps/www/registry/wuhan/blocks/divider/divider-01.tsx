"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Divider 方向类型
 */
export type DividerOrientation = "horizontal" | "vertical";

/**
 * Divider 样式类型
 */
export type DividerVariant = "solid" | "dashed";

/**
 * Divider 文本位置类型
 */
export type DividerTextAlign = "left" | "center" | "right";

/**
 * DividerContainer 原语的属性
 */
interface DividerContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 方向 */
  orientation?: DividerOrientation;
  /** 是否有文本内容 */
  hasText?: boolean;
}

/**
 * DividerContainer 原语
 * 提供分割线的容器和基础布局
 */
const DividerContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  DividerContainerPrimitiveProps
>(
  (
    { className, orientation = "horizontal", hasText = false, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          // 水平方向
          orientation === "horizontal" && [
            "w-full",
            "my-[11px]",
            hasText ? "flex-row" : "flex-row",
          ],
          // 垂直方向
          orientation === "vertical" && ["h-full", "mx-[11px]", "flex-col"],
          className,
        )}
        {...props}
      />
    );
  },
);
DividerContainerPrimitive.displayName = "DividerContainerPrimitive";

/**
 * DividerLine 原语的属性
 */
interface DividerLinePrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 方向 */
  orientation?: DividerOrientation;
  /** 样式变体 */
  variant?: DividerVariant;
  /** 颜色 */
  color?: string;
  /** 宽度（粗细） */
  thickness?: string;
  /** 是否为文本前/后的线段 */
  isPartial?: boolean;
}

/**
 * DividerLine 原语
 * 提供分割线的线条样式
 */
const DividerLinePrimitive = React.forwardRef<
  HTMLDivElement,
  DividerLinePrimitiveProps
>(
  (
    {
      className,
      orientation = "horizontal",
      variant = "solid",
      color = "var(--divider-neutral-basic)",
      thickness = "1px",
      isPartial = false,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // 基础样式
          "flex-shrink-0",
          // 水平方向
          orientation === "horizontal" && [
            isPartial ? "flex-1" : "w-full",
            "h-0",
          ],
          // 垂直方向
          orientation === "vertical" && [
            isPartial ? "flex-1" : "h-full",
            "w-0",
          ],
          className,
        )}
        style={{
          ...style,
          [orientation === "horizontal" ? "borderTopWidth" : "borderLeftWidth"]:
            thickness,
          [orientation === "horizontal" ? "borderTopStyle" : "borderLeftStyle"]:
            variant,
          [orientation === "horizontal" ? "borderTopColor" : "borderLeftColor"]:
            color,
        }}
        {...props}
      />
    );
  },
);
DividerLinePrimitive.displayName = "DividerLinePrimitive";

/**
 * DividerText 原语的属性
 */
interface DividerTextPrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 方向 */
  orientation?: DividerOrientation;
}

/**
 * DividerText 原语
 * 提供分割线中的文本内容
 */
const DividerTextPrimitive = React.forwardRef<
  HTMLSpanElement,
  DividerTextPrimitiveProps
>(({ className, orientation = "horizontal", ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "flex-shrink-0",
        "text-[var(--text-secondary)]",
        "font-[var(--font-family-cn)]",
        "font-size-1",
        "leading-[var(--line-height-1)]",
        // 水平方向的文本间距
        orientation === "horizontal" && "px-3",
        // 垂直方向的文本间距
        orientation === "vertical" && "py-3",
        className,
      )}
      {...props}
    />
  );
});
DividerTextPrimitive.displayName = "DividerTextPrimitive";

export {
  DividerContainerPrimitive,
  DividerLinePrimitive,
  DividerTextPrimitive,
};

export type {
  DividerContainerPrimitiveProps,
  DividerLinePrimitiveProps,
  DividerTextPrimitiveProps,
};
