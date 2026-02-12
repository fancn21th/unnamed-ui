"use client";

import * as React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown, ChevronUp } from "lucide-react";

// ==================== 类型定义 ====================

/**
 * Accordion 语义状态
 * @public
 */
type AccordionSemanticStatus = "open" | "closed";

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
 * Accordion Block Root 原语属性
 * @public
 */
interface AccordionBlockRootPrimitiveProps {
  /** 子元素 */
  children?: React.ReactNode;
  /** 手风琴类型 */
  type?: "single" | "multiple";
  /** 是否允许折叠 */
  collapsible?: boolean;
  /** 默认展开的值 */
  defaultValue?: string;
  /** 当前展开的值 */
  value?: string | string[];
  /** 值变化回调 */
  onValueChange?: (value: string | string[]) => void;
  /** 自定义类名 */
  className?: string;
}

// ==================== 原语组件 ====================

/**
 * Accordion Item 原语
 * @public
 */
export const AccordionItemPrimitive = React.forwardRef<
  HTMLDivElement,
  AccordionItemPrimitiveProps
>(({ className, value, ...props }, ref) => {
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
    <RadixAccordion.Header data-accordion-header="" className="flex">
      <RadixAccordion.Trigger
        ref={ref}
        data-accordion-trigger=""
        className={[
          "group flex flex-1 items-center justify-between gap-2",
          "text-left transition-all outline-none",
          "hover:bg-[var(--bg-hover)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
          "[&[data-state='open']>svg.chevron-down]:hidden",
          "[&[data-state='closed']>svg.chevron-up]:hidden",
        ].join(" ")}
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
>(({ className, children, ...props }, ref) => {
  return (
    <RadixAccordion.Content ref={ref} data-accordion-content="" {...props}>
      {children}
    </RadixAccordion.Content>
  );
});
AccordionContentPrimitive.displayName = "AccordionContentPrimitive";

/**
 * Accordion Block Root 原语
 * @public
 */
export const AccordionBlockPrimitive = React.forwardRef<
  HTMLDivElement,
  AccordionBlockRootPrimitiveProps
>(
  (
    { className, children, type = "single", collapsible = true, ...props },
    ref,
  ) => {
    return (
      <RadixAccordion.Root
        ref={ref}
        data-accordion=""
        type={type}
        collapsible={collapsible}
        {...(props as any)}
      >
        {children}
      </RadixAccordion.Root>
    );
  },
);
AccordionBlockPrimitive.displayName = "AccordionBlockPrimitive";

// ==================== 组合组件 ====================

/**
 * Accordion Block 完整组件
 * @public
 */
export const AccordionBlock = React.forwardRef<
  HTMLDivElement,
  AccordionBlockRootPrimitiveProps
>(
  (
    { className, children, type = "single", collapsible = true, ...props },
    ref,
  ) => {
    return (
      <AccordionBlockPrimitive
        ref={ref}
        type={type}
        collapsible={collapsible}
        {...props}
      >
        {children}
      </AccordionBlockPrimitive>
    );
  },
);
AccordionBlock.displayName = "AccordionBlock";

/**
 * Accordion Block Item 组件
 * @public
 */
export const AccordionBlockItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemPrimitiveProps
>(({ className, value, children, ...props }, ref) => {
  return (
    <AccordionItemPrimitive ref={ref} value={value} {...props}>
      {children}
    </AccordionItemPrimitive>
  );
});
AccordionBlockItem.displayName = "AccordionBlockItem";

/**
 * Accordion Block Trigger 组件
 * @public
 */
export const AccordionBlockTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerPrimitiveProps
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionTriggerPrimitive ref={ref} {...props}>
      {children}
    </AccordionTriggerPrimitive>
  );
});
AccordionBlockTrigger.displayName = "AccordionBlockTrigger";

/**
 * Accordion Block Content 组件
 * @public
 */
export const AccordionBlockContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentPrimitiveProps
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionContentPrimitive ref={ref} {...props}>
      {children}
    </AccordionContentPrimitive>
  );
});
AccordionBlockContent.displayName = "AccordionBlockContent";

// ==================== 类型导出 ====================

export type {
  AccordionSemanticStatus,
  AccordionItemPrimitiveProps,
  AccordionTriggerPrimitiveProps,
  AccordionContentPrimitiveProps,
  AccordionBlockRootPrimitiveProps,
};
