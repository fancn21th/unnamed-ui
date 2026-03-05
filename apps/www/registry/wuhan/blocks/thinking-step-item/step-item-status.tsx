"use client";

/**
 * 步骤项状态与标题原语
 * @module thinking-step-item/step-item-status
 */

import { CheckCircle2, Circle, CircleAlert, Loader2 } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  resolveThinkingStepItemStatus,
  type ThinkingSemanticStatus,
  type ThinkingStepItemStatus,
} from "./types";

export interface ThinkingStepItemStatusIconPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: ThinkingStepItemStatus;
  children?: React.ReactNode;
}

export interface ThinkingStepItemTitlePrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

const ICON_MAP: Record<ThinkingSemanticStatus, React.ReactNode> = {
  idle: <Circle className="size-4" />,
  running: <Loader2 className="size-4 animate-spin" />,
  success: <CheckCircle2 className="size-4" />,
  error: <CircleAlert className="size-4" />,
  cancelled: <Circle className="size-4" />,
};

const COLOR_MAP: Record<ThinkingSemanticStatus, string> = {
  idle: "text-[var(--Text-text-tertiary)]",
  running: "text-[var(--Text-text-brand)]",
  success: "text-[var(--Text-text-success)]",
  error: "text-[var(--Text-text-error)]",
  cancelled: "text-[var(--Text-text-tertiary)]",
};

export const ThinkingStepItemStatusIconPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemStatusIconPrimitiveProps
>(({ status = "loading", className, children, ...props }, ref) => {
  const resolvedStatus = resolveThinkingStepItemStatus(status);

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center",
        "size-4",
        COLOR_MAP[resolvedStatus],
        className,
      )}
      data-status={status}
      data-semantic-status={resolvedStatus}
      {...props}
    >
      {children ?? ICON_MAP[resolvedStatus]}
    </div>
  );
});
ThinkingStepItemStatusIconPrimitive.displayName =
  "ThinkingStepItemStatusIconPrimitive";

export const ThinkingStepItemTitlePrimitive = React.forwardRef<
  HTMLSpanElement,
  ThinkingStepItemTitlePrimitiveProps
>(({ children, className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "font-[var(--font-family-CN)]",
      "font-size-2",
      "leading-[var(--line-height-2)]",
      "font-semibold",
      "text-[var(--Text-text-primary)]",
      "hover:text-[var(--Text-text-brand)]",
      "transition-colors",
      className,
    )}
    {...props}
  >
    {children}
  </span>
));
ThinkingStepItemTitlePrimitive.displayName = "ThinkingStepItemTitlePrimitive";
