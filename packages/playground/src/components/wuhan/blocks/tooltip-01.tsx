"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

/**
 * Block Tooltip Provider
 */
function BlockTooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="block-tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

/**
 * Block Tooltip Root
 */
function BlockTooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <BlockTooltipProvider>
      <TooltipPrimitive.Root data-slot="block-tooltip" {...props} />
    </BlockTooltipProvider>
  );
}

/**
 * Block Tooltip Trigger
 */
function BlockTooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return (
    <TooltipPrimitive.Trigger data-slot="block-tooltip-trigger" {...props} />
  );
}

export interface BlockTooltipContentProps
  extends React.ComponentProps<typeof TooltipPrimitive.Content> {
  children: React.ReactNode;
}

const BlockTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  BlockTooltipContentProps
>(({ className, sideOffset = 4, children, ...props }, ref) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        data-slot="block-tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-[var(--bg-mask)]",
          "min-w-[36px] max-w-[480px]",
          "opacity-100",
          "rounded-[var(--radius-sm)]",
          "px-2 py-1",
          "text-[var(--text-inverse)]",
          "text-xs",
          "shadow-lg",
          "z-50",
          className,
        )}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
});
BlockTooltipContent.displayName = "BlockTooltipContent";

export { BlockTooltip, BlockTooltipTrigger, BlockTooltipContent };
