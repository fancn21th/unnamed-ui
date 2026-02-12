"use client";

import * as React from "react";
import {
  AccordionBlock as AccordionRoot,
  AccordionBlockItem as AccordionItemPrimitive,
  AccordionBlockTrigger as AccordionTriggerPrimitive,
  AccordionBlockContent as AccordionContentPrimitive,
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
 *   content="这里是展开的内容"
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

// 导出 Accordion 作为 AccordionRoot 的别名
export const Accordion = AccordionRoot;
