"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  GoalCardPrimitive,
  GoalCardContainerPrimitive,
  GoalCardHeaderPrimitive,
  GoalCardProgressPrimitive,
  GoalCardAiIcon,
  type GoalCardSemanticStatus,
  type GoalCardProgress,
} from "@/registry/wuhan/blocks/goal-card/goal-card-01";

// ==================== 类型定义 ====================

/**
 * Goal Item 类型
 * @public
 */
export interface GoalItem {
  /** 唯一标识符 */
  id: string;
  /** 目标标题 */
  title: string;
  /** 目标描述 */
  description?: string;
  /** 进度值 */
  progress: number;
  /** 最大值 */
  max?: number;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 状态 */
  status?: GoalCardSemanticStatus;
  /** 100% 时显示对号而不是百分比 */
  showCheckmarkOnComplete?: boolean;
  /** 失败时显示叉号而不是百分比 */
  showCrossOnFailed?: boolean;
}

/**
 * GoalCard Composed 组件属性
 * @public
 */
export interface GoalCardComposedProps {
  /** 标题 */
  title?: string;
  /** 描述文本 */
  description?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 进度值 0-100 */
  progress?: number;
  /** 最大值 */
  max?: number;
  /** 状态 */
  status?: GoalCardSemanticStatus;
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
  /** 100% 时显示对号而不是百分比 */
  showCheckmarkOnComplete?: boolean;
  /** 失败时显示叉号而不是百分比 */
  showCrossOnFailed?: boolean;
  /** 自定义类名 */
  className?: string;
}

// ==================== 主组件：GoalCard ====================

/**
 * GoalCard 组合组件
 * 提供完整的进度卡片功能，包含 AI 图标和环形进度条
 *
 * @example
 * ```tsx
 * <GoalCard
 *   title="阅读《设计心理学》"
 *   description="第 1 章：可供性"
 *   progress={75}
 * />
 * ```
 *
 * @public
 */
export const GoalCard = React.forwardRef<HTMLDivElement, GoalCardComposedProps>(
  (props, ref) => {
    const {
      title = "目标",
      description,
      icon,
      progress = 0,
      max = 100,
      status,
      size = "md",
      showCheckmarkOnComplete = true,
      showCrossOnFailed = true,
      className,
    } = props;

    return (
      <GoalCardPrimitive
        ref={ref}
        title={title}
        description={description}
        icon={
          icon ?? (
            <GoalCardAiIcon
              size={size === "sm" ? 16 : size === "md" ? 20 : 24}
            />
          )
        }
        progress={progress}
        max={max}
        status={status}
        size={size}
        showCheckmarkOnComplete={showCheckmarkOnComplete}
        showCrossOnFailed={showCrossOnFailed}
        className={className}
      />
    );
  },
);
GoalCard.displayName = "GoalCard";

// ==================== GoalCardList 组件 ====================

/**
 * GoalCardList 组件属性
 * @public
 */
export interface GoalCardListProps {
  /** 标题 */
  title?: string;
  /** 目标列表数据 */
  goals?: GoalItem[];
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
  /** 100% 时显示对号而不是百分比 */
  showCheckmarkOnComplete?: boolean;
  /** 失败时显示叉号而不是百分比 */
  showCrossOnFailed?: boolean;
  /** 自定义类名 */
  className?: string;
}

/**
 * GoalCardList 组合组件
 * 展示多个目标卡片列表
 *
 * @example
 * ```tsx
 * const goals = [
 *   { id: "1", title: "阅读《设计心理学》", description: "第 1 章", progress: 75 },
 *   { id: "2", title: "完成项目", description: "第二阶段", progress: 30 },
 * ];
 *
 * <GoalCardList title="我的目标" goals={goals} />
 * ```
 *
 * @public
 */
export const GoalCardList = React.forwardRef<HTMLDivElement, GoalCardListProps>(
  (props, ref) => {
    const {
      title = "目标列表",
      goals = [],
      size = "md",
      showCheckmarkOnComplete = true,
      showCrossOnFailed = true,
      className,
    } = props;

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
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              title={goal.title}
              description={goal.description}
              progress={goal.progress}
              max={goal.max}
              icon={goal.icon}
              status={goal.status}
              size={size}
              showCheckmarkOnComplete={
                goal.showCheckmarkOnComplete ?? showCheckmarkOnComplete
              }
              showCrossOnFailed={goal.showCrossOnFailed ?? showCrossOnFailed}
            />
          ))}
        </div>
      </div>
    );
  },
);
GoalCardList.displayName = "GoalCardList";

// ==================== 类型导出（仅内部使用）====================

// 注意：GoalItem, GoalCardComposedProps, GoalCardListProps 仅在 composed 组件内部使用
