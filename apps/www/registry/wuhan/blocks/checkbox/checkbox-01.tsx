"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { Check, Minus } from "lucide-react";

//#region CheckboxRoot 原语
const CheckboxRootPrimitive = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm",
        "border border-[var(--border-neutral)]",
        "bg-[var(--bg-container)]",
        "transition-all duration-200",
        // Hover state
        "hover:border-[var(--border-brand)]",
        // Focus state
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[var(--ring)]",
        "focus-visible:ring-offset-2",
        // Checked state
        "data-[state=checked]:bg-[var(--bg-brand)]",
        "data-[state=checked]:border-[var(--border-brand)]",
        "data-[state=checked]:text-white",
        // Indeterminate state
        "data-[state=indeterminate]:bg-[var(--bg-brand)]",
        "data-[state=indeterminate]:border-[var(--border-brand)]",
        "data-[state=indeterminate]:text-white",
        // Disabled state
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "disabled:bg-[var(--bg-container-disable)]",
        "disabled:border-[var(--border-neutral)]",
        className,
      )}
      {...props}
    />
  );
});
CheckboxRootPrimitive.displayName = "CheckboxRootPrimitive";
//#endregion

//#region CheckboxIndicator 原语
const CheckboxIndicatorPrimitive = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator> & {
    indeterminate?: boolean;
  }
>(({ className, indeterminate, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Indicator
      ref={ref}
      className={cn("flex items-center justify-center text-current", className)}
      {...props}
    >
      {indeterminate ? (
        <Minus className="h-3 w-3" />
      ) : (
        <Check className="h-3 w-3" />
      )}
    </CheckboxPrimitive.Indicator>
  );
});
CheckboxIndicatorPrimitive.displayName = "CheckboxIndicatorPrimitive";
//#endregion

//#region CheckboxLabel 原语
const CheckboxLabelPrimitive = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-400)]",
        "font-size-2",
        "leading-[var(--line-height-2)]",
        "text-[var(--text-primary)]",
        "truncate",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
});
CheckboxLabelPrimitive.displayName = "CheckboxLabelPrimitive";
//#endregion

export {
  CheckboxRootPrimitive,
  CheckboxIndicatorPrimitive,
  CheckboxLabelPrimitive,
};
