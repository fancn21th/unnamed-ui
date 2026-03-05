"use client";

/**
 * 工具调用块原语（icon + title + content，支持自定义连接符）
 * @module thinking-step-item/tool-call-chip
 */

import * as React from "react";
import { cn } from "@/lib/utils";

const BOX_BORDER = "box-border [&>*]:box-border";

export interface ThinkingStepItemToolCallPrimitiveProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title" | "content"
> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
  /** title 与 content 之间的连接符，默认 ":" */
  separator?: string;
}

export interface ThinkingStepItemToolCallIconPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface ThinkingStepItemToolCallTitlePrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export interface ThinkingStepItemToolCallContentPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const ThinkingStepItemToolCallIconPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemToolCallIconPrimitiveProps
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      BOX_BORDER,
      "font-size-1",
      "flex items-center justify-center",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
ThinkingStepItemToolCallIconPrimitive.displayName =
  "ThinkingStepItemToolCallIconPrimitive";

const ThinkingStepItemToolCallTitlePrimitive = React.forwardRef<
  HTMLSpanElement,
  ThinkingStepItemToolCallTitlePrimitiveProps
>(({ children, className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "font-[var(--font-family-CN)]",
      "font-size-1",
      "leading-[var(--line-height-1)]",
      "font-normal",
      "text-[var(--Text-text-secondary)]",
      "mr-[var(--Gap-gap-xs)]",
      className,
    )}
    {...props}
  >
    {children}
  </span>
));
ThinkingStepItemToolCallTitlePrimitive.displayName =
  "ThinkingStepItemToolCallTitlePrimitive";

const ThinkingStepItemToolCallContentPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemToolCallContentPrimitiveProps
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      BOX_BORDER,
      "font-[var(--font-family-CN)]",
      "font-size-1",
      "leading-[var(--line-height-1)]",
      "font-normal",
      "text-[var(--Text-text-tertiary)]",
      "inline",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
ThinkingStepItemToolCallContentPrimitive.displayName =
  "ThinkingStepItemToolCallContentPrimitive";

export const ThinkingStepItemToolCallPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemToolCallPrimitiveProps
>(({ icon, title, content, separator = ":", className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      BOX_BORDER,
      "inline-flex items-start",
      "gap-[var(--Gap-gap-xs)]",
      "rounded-[var(--radius-sm)]",
      "pt-[var(--Padding-padding-com-2xs)]",
      "pr-[var(--Padding-padding-com-sm)]",
      "pb-[var(--Padding-padding-com-2xs)]",
      "pl-[var(--Padding-padding-com-sm)]",
      "bg-[var(--Container-bg-neutral-light)]",
      "w-fit",
      className,
    )}
    {...props}
  >
    {icon && (
      <div className="flex-shrink-0 h-[var(--line-height-1)] flex items-center justify-center">
        <ThinkingStepItemToolCallIconPrimitive>
          {icon}
        </ThinkingStepItemToolCallIconPrimitive>
      </div>
    )}
    <div>
      {title && (
        <ThinkingStepItemToolCallTitlePrimitive>
          {title}
          {content && separator}
        </ThinkingStepItemToolCallTitlePrimitive>
      )}
      {content && (
        <ThinkingStepItemToolCallContentPrimitive>
          {content}
        </ThinkingStepItemToolCallContentPrimitive>
      )}
    </div>
  </div>
));
ThinkingStepItemToolCallPrimitive.displayName =
  "ThinkingStepItemToolCallPrimitive";

export {
  ThinkingStepItemToolCallIconPrimitive,
  ThinkingStepItemToolCallTitlePrimitive,
  ThinkingStepItemToolCallContentPrimitive,
};
