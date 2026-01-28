"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * AttachmentCard 子原语：左侧媒体/图标容器
 */
const InterveneForm = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "shrink-0",
        "flex items-center justify-center",
        "overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
InterveneForm.displayName = "InterveneForm";

export { InterveneForm };
