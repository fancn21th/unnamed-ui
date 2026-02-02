"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 状态标签容器原语
 * 提供基础的标签样式和结构
 */
const StatusTagPrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        "h-[30px]",
        "rounded-[8px]",
        "px-[8px] py-[4px]",
        "font-normal",
        "text-[14px]",
        "leading-[22px]",
        "text-center",
        "box-border",
        className,
      )}
      {...props}
    />
  );
});
StatusTagPrimitive.displayName = "StatusTagPrimitive";

export { StatusTagPrimitive };
