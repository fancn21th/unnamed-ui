"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  AgentCardPrimitive,
  AgentCardContainerPrimitive,
  AgentCardHeaderPrimitive,
  AgentCardAiIcon,
} from "@/registry/wuhan/blocks/agent-card/agent-card-01";

// ==================== 类型定义 ====================

/**
 * Agent Item 类型
 * @public
 */
export interface AgentItem {
  /** 唯一标识符 */
  id: string;
  /** Agent 标题 */
  title: string;
  /** Agent 描述 */
  description?: string;
  /** 自定义图标 */
  icon?: React.ReactNode;
}

/**
 * AgentCard Composed 组件属性
 * @public
 */
export interface AgentCardComposedProps {
  /** 标题 */
  title?: string;
  /** 描述文本 */
  description?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
  /** 自定义类名 */
  className?: string;
}

// ==================== 主组件：AgentCard ====================

/**
 * AgentCard 组合组件
 * 提供完整的 Agent 卡片功能，包含 AI 图标
 *
 * @example
 * ```tsx
 * <AgentCard
 *   title="智能写作助手"
 *   description="正在分析文档结构"
 * />
 * ```
 *
 * @public
 */
export const AgentCard = React.forwardRef<
  HTMLDivElement,
  AgentCardComposedProps
>((props, ref) => {
  const { title = "Agent", description, icon, size = "md", className } = props;

  return (
    <AgentCardPrimitive
      ref={ref}
      title={title}
      description={description}
      icon={
        icon ?? (
          <AgentCardAiIcon
            size={size === "sm" ? 16 : size === "md" ? 20 : 24}
          />
        )
      }
      size={size}
      className={className}
    />
  );
});
AgentCard.displayName = "AgentCard";

// ==================== AgentCardList 组件 ====================

/**
 * AgentCardList 组件属性
 * @public
 */
export interface AgentCardListProps {
  /** 标题 */
  title?: string;
  /** Agent 列表数据 */
  agents?: AgentItem[];
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
  /** 自定义类名 */
  className?: string;
}

/**
 * AgentCardList 组合组件
 * 展示多个 Agent 卡片列表
 *
 * @example
 * ```tsx
 * const agents = [
 *   { id: "1", title: "智能写作助手", description: "正在分析文档结构" },
 *   { id: "2", title: "翻译官", description: "多语言翻译" },
 * ];
 *
 * <AgentCardList title="我的 Agent" agents={agents} />
 * ```
 *
 * @public
 */
export const AgentCardList = React.forwardRef<
  HTMLDivElement,
  AgentCardListProps
>((props, ref) => {
  const { title = "Agent 列表", agents = [], size = "md", className } = props;

  return (
    <div ref={ref} className={className}>
      {title && (
        <h3
          className={cn(
            "font-[var(--font-family-cn)]",
            "font-[var(--font-weight-600)]",
            "font-size-3",
            "leading-[var(--line-height-3)]",
            "text-[var(--text-primary)]",
            "mb-[var(--margin-com-md)]",
          )}
        >
          {title}
        </h3>
      )}
      <div className="flex flex-col gap-[var(--gap-md)]">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            title={agent.title}
            description={agent.description}
            icon={agent.icon}
            size={size}
          />
        ))}
      </div>
    </div>
  );
});
AgentCardList.displayName = "AgentCardList";

// ==================== 类型导出（仅内部使用）====================

// 注意：AgentItem, AgentCardComposedProps, AgentCardListProps 仅在 composed 组件内部使用
