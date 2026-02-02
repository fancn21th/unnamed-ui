"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

//#region 动态表单布局容器原语
const DynamicFormLayoutPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "flex flex-col",
        "gap-[var(--gap-xl)]",
        "px-[var(--padding-com-xl)] py-[var(--margin-com-xl)]",
        "rounded-[var(--radius-xl)]",
        "bg-[var(--bg-container-secondary)]",
        "font-[var(--font-family-cn)]",
        className,
      )}
      style={{ fontFamily: "var(--font-family-cn)", ...style }}
      {...props}
    />
  );
});
DynamicFormLayoutPrimitive.displayName = "DynamicFormLayoutPrimitive";
//#endregion

//#region 动态表单头部原语
const DynamicFormHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-full", "flex items-center justify-between", className)}
      {...props}
    />
  );
});
DynamicFormHeaderPrimitive.displayName = "DynamicFormHeaderPrimitive";
//#endregion

//#region 动态表单标题原语
const DynamicFormTitlePrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-600)]",
        "font-semibold",
        "text-[var(--font-size-4)]",
        "leading-[var(--line-height-4)]",
        "text-[var(--text-title)]",
        className,
      )}
      {...props}
    />
  );
});
DynamicFormTitlePrimitive.displayName = "DynamicFormTitlePrimitive";

//#region 动态表单的表单主体布局原语
const DynamicFormBodyLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "flex flex-col",
        "gap-[var(--gap-xl)]",
        className,
      )}
      {...props}
    />
  );
});
DynamicFormBodyLayout.displayName = "DynamicFormBodyLayout";
//#endregion

//#region 动态表单的底部操作栏布局原语
const DynamicFormFooterPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "flex items-center justify-end",
        "gap-[var(--gap-md)]",
        className,
      )}
      {...props}
    />
  );
});
DynamicFormFooterPrimitive.displayName = "DynamicFormFooterPrimitive";
//#endregion

export {
  DynamicFormLayoutPrimitive,
  DynamicFormHeaderPrimitive,
  DynamicFormTitlePrimitive,
  DynamicFormBodyLayout,
  DynamicFormFooterPrimitive,
};
