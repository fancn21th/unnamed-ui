"use client";

import * as React from "react";
import {
  AccordionSingleRootPrimitive,
  AccordionMultipleRootPrimitive,
  AccordionItemPrimitive,
  AccordionTriggerPrimitive,
  AccordionContentPrimitive,
} from "@/registry/wuhan/blocks/accordion/accordion-01";

// ==================== 类型定义 ====================

/**
 * AccordionItem 组件属性
 * @public
 */
export interface AccordionItemProps {
  /** 项目的唯一值 */
  value: string;
  /** 标题 */
  trigger: React.ReactNode;
  /** 内容 */
  content: React.ReactNode;
}

/**
 * Accordion 单选模式属性
 * @public
 */
export interface AccordionSingleProps {
  /** 模式：单选 */
  type: "single";
  /** 是否允许折叠所有项 */
  collapsible?: boolean;
  /** 默认展开的值（单选） */
  defaultValue?: string | string[];
  /** 当前展开的值（受控模式） */
  value?: string;
  /** 值变化回调 */
  onValueChange?: (value: string) => void;
  /** AccordionItem 之间的间距 */
  gap?: string;
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children?: React.ReactNode;
}

/**
 * Accordion 多选模式属性
 * @public
 */
export interface AccordionMultipleProps {
  /** 模式：多选 */
  type: "multiple";
  /** 是否默认展开所有项 */
  expandAll?: boolean;
  /** 默认展开的值（多选） */
  defaultValue?: string | string[];
  /** 当前展开的值（受控模式） */
  value?: string[];
  /** 值变化回调 */
  onValueChange?: (value: string[]) => void;
  /** AccordionItem 之间的间距 */
  gap?: string;
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children?: React.ReactNode;
}

/**
 * Accordion 属性（联合类型）
 * @public
 */
export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

/** 多选模式根节点：单独组件以保证 hooks 在每次渲染时顺序一致 */
const AccordionMultipleRoot = React.forwardRef<
  HTMLDivElement,
  Omit<AccordionMultipleProps, "type">
>(({ defaultValue, expandAll, children, ...rest }, ref) => {
  const computedDefaultValue = React.useMemo(() => {
    if (expandAll && children) {
      const values: string[] = [];
      React.Children.forEach(children, (child) => {
        if (
          React.isValidElement<AccordionItemProps>(child) &&
          child.props.value
        ) {
          values.push(child.props.value);
        }
      });
      return values;
    }

    if (typeof defaultValue === "string") {
      return [defaultValue];
    }

    return defaultValue;
  }, [expandAll, defaultValue, children]);

  return (
    <AccordionMultipleRootPrimitive
      ref={ref}
      type="multiple"
      defaultValue={computedDefaultValue}
      {...rest}
    >
      {children}
    </AccordionMultipleRootPrimitive>
  );
});
AccordionMultipleRoot.displayName = "AccordionMultipleRoot";

// ==================== 主组件 ====================

/**
 * AccordionItem 组件
 * 封装了 Item + Trigger + Content 的便捷组件
 *
 * @example
 * ```tsx
 * <AccordionItem
 *   value="item-1"
 *   trigger="点击展开"
 *   content={<div className="p-4 text-sm text-[var(--Text-text-secondary)]">内容</div>}
 * />
 * ```
 *
 * @public
 */
export const AccordionItem = ({
  value,
  trigger,
  content,
}: AccordionItemProps) => {
  return (
    <AccordionItemPrimitive value={value}>
      <AccordionTriggerPrimitive>{trigger}</AccordionTriggerPrimitive>
      <AccordionContentPrimitive>{content}</AccordionContentPrimitive>
    </AccordionItemPrimitive>
  );
};

/**
 * Accordion 组件
 * 支持单选和多选两种模式
 *
 * @example
 * ```tsx
 * // 单选模式
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="1" trigger="标题1" content="内容1" />
 * </Accordion>
 *
 * // 多选模式
 * <Accordion type="multiple" expandAll>
 *   <AccordionItem value="1" trigger="标题1" content="内容1" />
 * </Accordion>
 * ```
 *
 * @public
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    if (props.type === "single") {
      const { defaultValue, collapsible = true, ...rest } = props;

      // 处理 defaultValue：如果是数组，取第一个
      const processedDefaultValue = Array.isArray(defaultValue)
        ? defaultValue[0]
        : defaultValue;

      return (
        <AccordionSingleRootPrimitive
          ref={ref}
          collapsible={collapsible}
          defaultValue={processedDefaultValue}
          {...rest}
        />
      );
    }

    const { type, ...multipleProps } = props;
    void type;
    return <AccordionMultipleRoot ref={ref} {...multipleProps} />;
  },
);

Accordion.displayName = "Accordion";
