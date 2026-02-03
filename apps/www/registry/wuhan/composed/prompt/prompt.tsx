"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import {
  PromptButton as PromptButtonHorizontal,
  PromptGroup as PromptGroupHorizontal,
} from "@/registry/wuhan/blocks/prompt/prompt-01";
import {
  PromptButton as PromptButtonVertical,
  PromptGroup as PromptGroupVertical,
} from "@/registry/wuhan/blocks/prompt/prompt-02";

/**
 * Prompt 布局变体类型
 * @public
 */
export type PromptVariant = "horizontal" | "vertical";

/**
 * PromptGroup 组件属性接口
 * 用于包裹多个 Prompt 按钮
 * @public
 */
export interface PromptGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 布局变体：horizontal 横向排列，vertical 纵向卡片式 */
  variant?: PromptVariant;
  /** 子元素（PromptButton 组件） */
  children: React.ReactNode;
}

/**
 * PromptButton 组件属性接口
 * 用于显示单个 Prompt 建议按钮
 * @public
 */
export interface PromptButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** 布局变体：horizontal 横向按钮，vertical 纵向卡片 */
  variant?: PromptVariant;
  /** 自定义图标，vertical 模式下默认为 Sparkles 图标 */
  icon?: React.ReactNode;
  /** 按钮文本内容 */
  children: React.ReactNode;
}

/**
 * Prompt 项数据接口
 * 用于 PromptPanel 组件的数据结构
 * @public
 */
export interface PromptItem {
  /** 唯一标识符 */
  id: string;
  /** 显示的文本标签 */
  label: React.ReactNode;
  /** 可选的自定义图标 */
  icon?: React.ReactNode;
  /** 点击事件处理函数 */
  onClick?: () => void;
}

/**
 * PromptPanel 组件属性接口
 * 快速创建完整的 Prompt 建议面板
 * @public
 */
export interface PromptPanelProps {
  /** 布局变体 */
  variant?: PromptVariant;
  /** Prompt 项列表 */
  items: PromptItem[];
  /** 自定义样式类名 */
  className?: string;
}

/**
 * PromptGroup 组件
 *
 * 用于包裹多个 PromptButton，提供统一的布局容器。
 * 支持横向和纵向两种布局方式。
 *
 * @example
 * ```tsx
 * <PromptGroup variant="horizontal">
 *   <PromptButton>示例 1</PromptButton>
 *   <PromptButton>示例 2</PromptButton>
 * </PromptGroup>
 * ```
 *
 * @public
 */
export const PromptGroup = React.forwardRef<HTMLDivElement, PromptGroupProps>(
  ({ variant = "horizontal", children, ...props }, ref) => {
    const ariaLabel = props["aria-label"] ?? "Prompt suggestions";
    if (variant === "vertical") {
      return (
        <PromptGroupVertical ref={ref} aria-label={ariaLabel} {...props}>
          {children}
        </PromptGroupVertical>
      );
    }
    return (
      <PromptGroupHorizontal ref={ref} aria-label={ariaLabel} {...props}>
        {children}
      </PromptGroupHorizontal>
    );
  },
);
PromptGroup.displayName = "PromptGroup";

/**
 * PromptButton 组件
 *
 * 用于显示单个 Prompt 建议，用户点击后可快速填充输入内容。
 *
 * - horizontal 模式：简洁的横向按钮，适合紧凑布局
 * - vertical 模式：带图标的卡片式按钮，适合突出显示
 *
 * @example
 * ```tsx
 * // 横向模式
 * <PromptButton variant="horizontal" onClick={() => console.log("clicked")}>
 *   帮我写一篇文章
 * </PromptButton>
 *
 * // 纵向模式（带默认图标）
 * <PromptButton variant="vertical">
 *   解释一下量子计算
 * </PromptButton>
 *
 * // 自定义图标
 * <PromptButton variant="vertical" icon={<Star />}>
 *   推荐一本书
 * </PromptButton>
 * ```
 *
 * @public
 */
export const PromptButton = React.forwardRef<
  HTMLButtonElement,
  PromptButtonProps
>(({ variant = "horizontal", icon, children, ...props }, ref) => {
  if (variant === "vertical") {
    return (
      <PromptButtonVertical
        ref={ref}
        icon={icon ?? <Sparkles className="size-4" />}
        {...props}
      >
        {children}
      </PromptButtonVertical>
    );
  }
  return (
    <PromptButtonHorizontal ref={ref} icon={icon} {...props}>
      {children}
    </PromptButtonHorizontal>
  );
});
PromptButton.displayName = "PromptButton";

/**
 * PromptPanel 组件
 *
 * 快速创建完整的 Prompt 建议面板，通过数据驱动的方式渲染多个 Prompt 按钮。
 *
 * @example
 * ```tsx
 * const prompts = [
 *   { id: "1", label: "介绍一下你自己", onClick: () => {} },
 *   { id: "2", label: "你能帮我做什么", onClick: () => {} },
 *   { id: "3", label: "推荐学习资源", icon: <Book />, onClick: () => {} },
 * ];
 *
 * <PromptPanel variant="horizontal" items={prompts} />
 * ```
 *
 * @public
 */
export const PromptPanel = React.forwardRef<HTMLDivElement, PromptPanelProps>(
  ({ variant = "horizontal", items, className }, ref) => {
    return (
      <div ref={ref}>
        <PromptGroup variant={variant} className={className}>
          {items.map((item) => (
            <PromptButton
              key={item.id}
              variant={variant}
              icon={item.icon}
              onClick={item.onClick}
            >
              {item.label}
            </PromptButton>
          ))}
        </PromptGroup>
      </div>
    );
  },
);
PromptPanel.displayName = "PromptPanel";
