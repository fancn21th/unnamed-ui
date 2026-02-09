"use client";

import * as React from "react";
import {
  TaskCardPrimitive,
  TaskCardContainerPrimitive,
  TaskCardCollapsedHeaderPrimitive,
  TaskCardTitlePrimitive,
  TaskCardStepListPrimitive,
  TaskCardStepItemPrimitive,
  TaskCardCollapseArrowPrimitive,
  type TaskCardStatus,
} from "@/registry/wuhan/blocks/task-card/task-card-01";

// ==================== 类型定义 ====================

/**
 * 任务项类型
 * @public
 */
export interface TaskCardItem {
  /** 唯一标识符 */
  id: string;
  /** 任务文本 */
  text: string;
  /** 任务状态 */
  status: TaskCardStatus;
}

/**
 * TaskCard 组合组件属性
 * @public
 */
export interface TaskCardComposedProps {
  /** 标题（展开时显示） */
  title?: string;
  /** 当前步骤文本（收起时显示） */
  stepText?: string;
  /** 当前步骤图标（收起时显示） */
  stepIcon?: React.ReactNode;
  /** 任务列表数据 */
  items?: TaskCardItem[];
  /** 是否默认展开 */
  defaultOpen?: boolean;
  /** 控制展开状态 */
  open?: boolean;
  /** 展开状态变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 自定义类名 */
  className?: string;
}

// ==================== 主组件：TaskCard ====================

/**
 * TaskCard 组合组件
 * 提供完整的可折叠任务卡片功能
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: "1", text: "简历筛选", status: "completed" },
 *   { id: "2", text: "初试", status: "completed" },
 *   { id: "3", text: "复试", status: "running" },
 * ];
 *
 * <TaskCard
 *   title="招聘流程"
 *   stepText="复试"
 *   items={items}
 * />
 * ```
 *
 * @public
 */
export const TaskCard = React.forwardRef<HTMLDivElement, TaskCardComposedProps>(
  (props, ref) => {
    const {
      title = "任务列表",
      stepText,
      stepIcon,
      items = [],
      defaultOpen = false,
      open,
      onOpenChange,
      className,
    } = props;

    // 计算当前步骤序号（找到第一个 running 或 pending 的步骤索引+1）
    const currentStepIndex = items.findIndex(
      (item) => item.status === "running" || item.status === "pending",
    );
    const currentStep =
      currentStepIndex >= 0 ? currentStepIndex + 1 : items.length;
    const totalCount = items.length;

    // 构建步骤数据
    const steps = items.map((item) => ({
      id: item.id,
      text: item.text,
      status: item.status,
    }));

    return (
      <TaskCardPrimitive
        ref={ref}
        heading={title}
        stepText={stepText}
        stepIcon={stepIcon}
        currentStep={currentStep}
        total={totalCount}
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        steps={steps}
        className={className}
      />
    );
  },
);
TaskCard.displayName = "TaskCard";
