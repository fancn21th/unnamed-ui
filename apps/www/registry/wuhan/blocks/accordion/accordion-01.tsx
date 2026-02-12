"use client";

import * as React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

/**
 * Accordion Item 原语属性
 * @public
 */
interface AccordionItemPrimitiveProps extends React.ComponentPropsWithoutRef<
  typeof RadixAccordion.Item
> {
  value: string;
}

/**
 * Accordion Trigger 原语属性
 * @public
 */
interface AccordionTriggerPrimitiveProps extends React.ComponentPropsWithoutRef<
  typeof RadixAccordion.Trigger
> {
  children?: React.ReactNode;
}

/**
 * Accordion Content 原语属性
 * @public
 */
interface AccordionContentPrimitiveProps extends React.ComponentPropsWithoutRef<
  typeof RadixAccordion.Content
> {
  children?: React.ReactNode;
}

/**
 * Accordion Single Root 原语属性
 * @public
 */
interface AccordionSingleRootPrimitiveProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Root>,
  "type"
> {
  type: "single";
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  gap?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Accordion Multiple Root 原语属性
 * @public
 */
interface AccordionMultipleRootPrimitiveProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Root>,
  "type"
> {
  type: "multiple";
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  gap?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Accordion Root 原语属性（联合类型）
 * @public
 */
type AccordionRootPrimitiveProps =
  | AccordionSingleRootPrimitiveProps
  | AccordionMultipleRootPrimitiveProps;

// ==================== 原语组件 ====================

/**
 * Accordion Item 原语
 * @public
 */
export const AccordionItemPrimitive = React.forwardRef<
  HTMLDivElement,
  AccordionItemPrimitiveProps
>(({ value, ...props }, ref) => {
  return (
    <RadixAccordion.Item
      ref={ref}
      data-accordion-item=""
      value={value}
      {...props}
    />
  );
});
AccordionItemPrimitive.displayName = "AccordionItemPrimitive";

/**
 * Accordion Trigger 原语
 * @public
 */
export const AccordionTriggerPrimitive = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerPrimitiveProps
>(({ className, children, ...props }, ref) => {
  return (
    <RadixAccordion.Header
      data-accordion-header=""
      className={cn(
        "flex mx-0 mt-0 not-prose",
        "data-[state=open]:mb-2 data-[state=closed]:mb-0",
        className,
      )}
    >
      <RadixAccordion.Trigger
        ref={ref}
        data-accordion-trigger=""
        className={cn(
          "font-[var(--font-family-cn)]",
          "font-[var(--font-weight-400)]",
          "leading-[var(--line-height-2)]",
          "text-[var(--text-secondary)]",
          "font-size-2",
          "group flex flex-1 items-center justify-between gap-2",
          "text-left transition-all outline-none",
          "hover:bg-[var(--bg-hover)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
          "[&[data-state='open']>svg.chevron-down]:hidden",
          "[&[data-state='closed']>svg.chevron-up]:hidden",
        )}
        {...props}
      >
        {children}
        <ChevronDown className="chevron-down h-4 w-4 shrink-0 text-[var(--text-tertiary)] transition-transform duration-200" />
        <ChevronUp className="chevron-up h-4 w-4 shrink-0 text-[var(--text-tertiary)] transition-transform duration-200" />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  );
});
AccordionTriggerPrimitive.displayName = "AccordionTriggerPrimitive";

/**
 * Accordion Content 原语
 * @public
 */
export const AccordionContentPrimitive = React.forwardRef<
  HTMLDivElement,
  AccordionContentPrimitiveProps
>(({ children, ...props }, ref) => {
  return (
    <RadixAccordion.Content ref={ref} data-accordion-content="" {...props}>
      {children}
    </RadixAccordion.Content>
  );
});
AccordionContentPrimitive.displayName = "AccordionContentPrimitive";

/**
 * Accordion Root 原语（单选模式）
 * @public
 */
export const AccordionSingleRootPrimitive = React.forwardRef<
  HTMLDivElement,
  AccordionSingleRootPrimitiveProps
>(
  (
    { className, children, gap, collapsible = true, type: _type, ...props },
    ref,
  ) => {
    return (
      <RadixAccordion.Root
        ref={ref}
        data-accordion=""
        className={cn("flex flex-col", gap, className)}
        type="single"
        collapsible={collapsible}
        {...props}
      >
        {children}
      </RadixAccordion.Root>
    );
  },
);
AccordionSingleRootPrimitive.displayName = "AccordionSingleRootPrimitive";

/**
 * Accordion Root 原语（多选模式）
 * @public
 */
export const AccordionMultipleRootPrimitive = React.forwardRef<
  HTMLDivElement,
  AccordionMultipleRootPrimitiveProps
>(({ className, children, gap, type: _type, ...props }, ref) => {
  return (
    <RadixAccordion.Root
      ref={ref}
      data-accordion=""
      className={cn("flex flex-col", gap, className)}
      type="multiple"
      {...props}
    >
      {children}
    </RadixAccordion.Root>
  );
});
AccordionMultipleRootPrimitive.displayName = "AccordionMultipleRootPrimitive";

// ==================== 类型导出 ====================

export type {
  AccordionItemPrimitiveProps,
  AccordionTriggerPrimitiveProps,
  AccordionContentPrimitiveProps,
  AccordionSingleRootPrimitiveProps,
  AccordionMultipleRootPrimitiveProps,
  AccordionRootPrimitiveProps,
};
