"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

//#region 报告卡片容器原语
const ReportCardPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "flex flex-col",
        "gap-[var(--gap-md)]",
        "px-[var(--padding-com-xl)] py-[var(--margin-com-xl)]",
        "rounded-[var(--radius-xl)]",
        "bg-[var(--bg-page-brand)]",
        "border border-[var(--border-brand-light)]",
        className,
      )}
      {...props}
    />
  );
});
ReportCardPrimitive.displayName = "ReportCardPrimitive";
//#endregion

export { ReportCardPrimitive };
