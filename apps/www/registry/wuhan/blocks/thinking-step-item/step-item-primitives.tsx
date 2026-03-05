"use client";

/**
 * 步骤项布局原语（容器、头部、内容、时间轴）
 * @module thinking-step-item/step-item-primitives
 */

import { ChevronDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/wuhan/ui/button";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/wuhan/ui/collapsible";
import {
  resolveThinkingStepItemStatus,
  type ThinkingStepItemStatus,
} from "./types";

const BOX_BORDER = "box-border [&>*]:box-border";

// ==================== 类型 ====================

export interface ThinkingStepItemContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface ThinkingStepItemPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  status?: ThinkingStepItemStatus;
}

export interface ThinkingStepItemHeaderPrimitiveProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  collapsible?: boolean;
  trailing?: React.ReactNode;
  disabled?: boolean;
}

export interface ThinkingStepItemContentPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  collapsible?: boolean;
}

export interface ThinkingStepItemContentListPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface ThinkingStepItemContentItemPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  isLast?: boolean;
  children?: React.ReactNode;
}

export interface ThinkingStepItemTimelinePrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  isLast?: boolean;
}

export interface ThinkingStepItemContentAreaPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface ThinkingStepItemRegularContentPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

// ==================== 组件 ====================

export const ThinkingStepItemContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemContainerPrimitiveProps
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      BOX_BORDER,
      "w-full",
      "flex flex-col",
      "gap-[var(--Gap-gap-xl)]",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
ThinkingStepItemContainerPrimitive.displayName =
  "ThinkingStepItemContainerPrimitive";

export const ThinkingStepItemPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemPrimitiveProps
>(
  (
    {
      children,
      collapsible = false,
      defaultOpen = false,
      open,
      onOpenChange,
      status = "loading",
      className,
      ...props
    },
    ref,
  ) => {
    const resolvedStatus = resolveThinkingStepItemStatus(status);
    const node = (
      <div
        ref={ref}
        className={cn(BOX_BORDER, "w-full", "group/step-item", className)}
        data-status={status}
        data-semantic-status={resolvedStatus}
        data-collapsible={collapsible ? "true" : "false"}
        {...props}
      >
        {children}
      </div>
    );

    if (!collapsible) return node;

    return (
      <Collapsible
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
      >
        {node}
      </Collapsible>
    );
  },
);
ThinkingStepItemPrimitive.displayName = "ThinkingStepItemPrimitive";

export const ThinkingStepItemHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemHeaderPrimitiveProps
>(
  (
    { children, trailing, collapsible = false, className, disabled, ...props },
    ref,
  ) => {
    const baseClass = cn(
      BOX_BORDER,
      "group/step-item-trigger",
      "flex items-center",
      "w-full",
      "transition-colors",
      "gap-[var(--Gap-gap-md)]",
      className,
    );

    if (!collapsible) {
      return (
        <div
          ref={ref}
          className={cn(baseClass, "cursor-default")}
          data-collapsible="false"
          {...props}
        >
          {children}
          {trailing && <div className="ml-auto">{trailing}</div>}
        </div>
      );
    }

    return (
      <CollapsibleTrigger asChild>
        <Button
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
          variant="unstyled"
          size="unstyled"
          type="button"
          disabled={disabled}
          className={cn(baseClass, "cursor-pointer")}
          data-collapsible="true"
          {...props}
        >
          {children}
          {trailing && <div className="ml-auto">{trailing}</div>}
        </Button>
      </CollapsibleTrigger>
    );
  },
);
ThinkingStepItemHeaderPrimitive.displayName = "ThinkingStepItemHeaderPrimitive";

export const ThinkingStepItemContentPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemContentPrimitiveProps
>(({ children, collapsible = false, className, ...props }, ref) => {
  const contentNode = (
    <div
      ref={ref}
      className={cn(BOX_BORDER, "mt-[var(--Gap-gap-md)]", "w-full", className)}
      data-collapsible={collapsible ? "true" : "false"}
      {...props}
    >
      {children}
    </div>
  );

  if (!collapsible) return contentNode;

  return <CollapsibleContent>{contentNode}</CollapsibleContent>;
});
ThinkingStepItemContentPrimitive.displayName =
  "ThinkingStepItemContentPrimitive";

export const ThinkingStepItemContentListPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemContentListPrimitiveProps
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      BOX_BORDER,
      "w-full",
      "flex flex-col",
      "gap-[var(--Gap-gap-xl)]",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
ThinkingStepItemContentListPrimitive.displayName =
  "ThinkingStepItemContentListPrimitive";

export const ThinkingStepItemContentItemPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemContentItemPrimitiveProps
>(({ isLast = false, children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      BOX_BORDER,
      "w-full",
      "flex",
      "gap-[var(--Gap-gap-md)]",
      "relative",
      "pl-[calc(var(--space-6)+var(--Gap-gap-md))]",
      className,
    )}
    data-last={isLast ? "true" : "false"}
    {...props}
  >
    {children}
  </div>
));
ThinkingStepItemContentItemPrimitive.displayName =
  "ThinkingStepItemContentItemPrimitive";

export const ThinkingStepItemTimelinePrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemTimelinePrimitiveProps
>(({ isLast = false, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      BOX_BORDER,
      "flex flex-col",
      "items-center",
      "w-[var(--space-6)]",
      "absolute",
      "top-0",
      "left-0",
      "pt-[var(--Padding-padding-com-md)]",
      isLast ? "h-full" : "h-[calc(100%+var(--Gap-gap-xl))]",
      "gap-[var(--Gap-gap-md)]",
      className,
    )}
    data-last={isLast ? "true" : "false"}
    {...props}
  >
    <div
      className={cn(
        "w-[var(--space-2)] h-[var(--space-2)]",
        "rounded-full",
        "bg-[var(--Text-text-placeholder)]",
        "flex-shrink-0",
      )}
    />
    <div
      className={cn(
        "w-[var(--border-width)]",
        isLast ? "h-full" : "h-[calc(100%+var(--Gap-gap-xs))]",
        "bg-[var(--Border-divider-neutral-basic)]",
      )}
    />
  </div>
));
ThinkingStepItemTimelinePrimitive.displayName =
  "ThinkingStepItemTimelinePrimitive";

export const ThinkingStepItemContentAreaPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemContentAreaPrimitiveProps
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      BOX_BORDER,
      "flex-1",
      "flex flex-col",
      "gap-[var(--Gap-gap-md)]",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
ThinkingStepItemContentAreaPrimitive.displayName =
  "ThinkingStepItemContentAreaPrimitive";

export const ThinkingStepItemRegularContentPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemRegularContentPrimitiveProps
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      BOX_BORDER,
      "font-[var(--font-family-CN)]",
      "font-size-1",
      "leading-[var(--line-height-1)]",
      "font-normal",
      "text-[var(--Text-text-primary)]",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
ThinkingStepItemRegularContentPrimitive.displayName =
  "ThinkingStepItemRegularContentPrimitive";

export const ThinkingStepItemCollapseArrowPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "size-4",
      "text-[var(--Text-text-primary)]",
      "transition-all duration-200",
      "group-data-[state=open]/step-item-trigger:rotate-180",
      "data-[state=open]:rotate-180",
      "flex items-center justify-center",
      className,
    )}
    {...props}
  >
    {children ?? <ChevronDown className="size-4" />}
  </div>
));
ThinkingStepItemCollapseArrowPrimitive.displayName =
  "ThinkingStepItemCollapseArrowPrimitive";
