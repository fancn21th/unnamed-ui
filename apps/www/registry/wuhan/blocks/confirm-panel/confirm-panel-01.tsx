"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

//#region 确认面板容器原语
const ConfirmPanelContainerPrimitive = React.forwardRef<
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
        "px-[var(--padding-com-xl)] py-[var(--margin-com-xl)]",
        "rounded-[var(--radius-xl)]",
        "bg-[var(--bg-container-secondary)]",
        className,
      )}
      {...props}
    />
  );
});
ConfirmPanelContainerPrimitive.displayName = "ConfirmPanelContainerPrimitive";
//#endregion

//#region 确认面板头部原语
const ConfirmPanelHeaderPrimitive = React.forwardRef<
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
ConfirmPanelHeaderPrimitive.displayName = "ConfirmPanelHeaderPrimitive";
//#endregion

//#region 确认面板标题原语
const ConfirmPanelTitlePrimitive = React.forwardRef<
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
        "font-size-4",
        "leading-[var(--line-height-4)]",
        "text-[var(--text-title)]",
        className,
      )}
      {...props}
    />
  );
});
ConfirmPanelTitlePrimitive.displayName = "ConfirmPanelTitlePrimitive";
//#endregion

//#region 确认面板的底部操作栏原语
const ConfirmPanelFooterPrimitive = React.forwardRef<
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
ConfirmPanelFooterPrimitive.displayName = "ConfirmPanelFooterPrimitive";
//#endregion

export {
  ConfirmPanelContainerPrimitive,
  ConfirmPanelHeaderPrimitive,
  ConfirmPanelTitlePrimitive,
  ConfirmPanelFooterPrimitive,
};
