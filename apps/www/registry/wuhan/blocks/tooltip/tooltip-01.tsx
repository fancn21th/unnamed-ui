"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

// ==================== Block Tooltip 组件 ====================

/**
 * Block Tooltip Provider
 * 提供 tooltip 上下文
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
 * Tooltip 根组件
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
 * Tooltip 触发器组件
 */
function BlockTooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return (
    <TooltipPrimitive.Trigger data-slot="block-tooltip-trigger" {...props} />
  );
}

/**
 * Block Tooltip Content
 * Tooltip 内容组件，应用了指定的样式
 */
export interface BlockTooltipContentProps extends React.ComponentProps<
  typeof TooltipPrimitive.Content
> {
  /**
   * Tooltip 内容
   */
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
          "pt-[var(--gap-xs)] pb-[var(--gap-xs)] pl-[var(--gap-sm)] pr-[var(--gap-sm)]",
          "font-[var(--font-family-cn)]",
          "font-[var(--font-weight-400)]",
          "text-xs",
          "leading-[var(--line-height-1)]",
          "tracking-[0px]",
          "text-center",
          "align-middle",
          "text-[var(--text-inverse)]",
          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          "z-50",
          "origin-(--radix-tooltip-content-transform-origin)",
          className,
        )}
        {...props}
      >
        {children}
        {/* <TooltipPrimitive.Arrow className="bg-[var(--bg-mask)] fill-[var(--bg-mask)] z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" /> */}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
});
BlockTooltipContent.displayName = "BlockTooltipContent";

// ==================== 导出所有组件 ====================

export {
  BlockTooltipProvider,
  BlockTooltip,
  BlockTooltipTrigger,
  BlockTooltipContent,
};
