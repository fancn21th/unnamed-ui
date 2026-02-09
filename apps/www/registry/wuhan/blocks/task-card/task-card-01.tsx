"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Loader2, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/wuhan/ui/collapsible";

const BOX_BORDER = "box-border [&>*]:box-border";

// ==================== 类型定义 ====================

/**
 * 任务卡片语义状态
 * @public
 */
type TaskCardSemanticStatus =
  | "pending" // 待处理
  | "running" // 进行中
  | "completed"; // 已完成

/**
 * 任务卡片状态类型（兼容旧状态）
 * @public
 */
type TaskCardStatus = TaskCardSemanticStatus | "idle";

const resolveTaskCardStatus = (
  status: TaskCardStatus | undefined,
): TaskCardSemanticStatus => {
  switch (status) {
    case "pending":
      return "pending";
    case "running":
    case "idle":
      return "running";
    case "completed":
      return "completed";
    default:
      return "pending";
  }
};

/**
 * 任务卡片容器原语属性
 * @public
 */
interface TaskCardContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * 任务卡片头部原语属性（收起状态）
 * @public
 */
interface TaskCardCollapsedHeaderPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 当前步骤图标
   */
  icon?: React.ReactNode;
  /**
   * 当前步骤文本
   */
  stepText?: React.ReactNode;
  /**
   * 已完成数量
   */
  completed?: number;
  /**
   * 总数量
   */
  total?: number;
  /**
   * 是否展开
   */
  open?: boolean;
}

/**
 * 任务卡片标题原语属性（展开状态）
 * @public
 */
interface TaskCardTitlePrimitiveProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

/**
 * 任务卡片步骤列表原语属性
 * @public
 */
interface TaskCardStepListPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * 任务卡片步骤项原语属性
 * @public
 */
interface TaskCardStepItemPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 步骤状态
   */
  status?: TaskCardStatus;
  /**
   * 步骤图标
   */
  icon?: React.ReactNode;
  /**
   * 步骤文本
   */
  children?: React.ReactNode;
}

/**
 * 任务卡片折叠箭头原语属性
 * @public
 */
interface TaskCardCollapseArrowPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 是否展开
   */
  open?: boolean;
}

// ==================== 容器类原语 ====================

/**
 * 任务卡片容器原语
 * @public
 */
export const TaskCardContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  TaskCardContainerPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        BOX_BORDER,
        "w-full",
        "rounded-[var(--radius-xl)]",
        "bg-[var(--bg-brand-light)]",
        "border border-transparent",
        "p-[var(--padding-com-md)]",
        "gap-[var(--gap-lg)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TaskCardContainerPrimitive.displayName = "TaskCardContainerPrimitive";

// ==================== 头部原语 ====================

/**
 * 任务卡片折叠头部原语（收起状态）
 * @public
 */
export const TaskCardCollapsedHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  TaskCardCollapsedHeaderPrimitiveProps
>(({ icon, stepText, completed = 0, total = 0, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        BOX_BORDER,
        "w-full",
        "flex items-center",
        "justify-between",
        "gap-[var(--gap-sm)]",
        className,
      )}
      {...props}
    >
      {/* 左侧：图标 + 步骤文本 */}
      <div className="flex items-center gap-[var(--gap-sm)]">
        {icon && <div className="flex items-center justify-center">{icon}</div>}
        {stepText && (
          <span
            className={cn(
              "font-[var(--font-family-cn)]",
              "font-[var(--font-weight-400)]",
              "font-size-2",
              "leading-[var(--line-height-2)]",
              "text-[var(--text-primary)]",
            )}
          >
            {stepText}
          </span>
        )}
      </div>

      {/* 右侧：进度文本 */}
      <div className="flex items-center gap-[var(--gap-sm)]">
        <span
          className={cn(
            "font-[var(--font-family-cn)]",
            "font-[var(--font-weight-400)]",
            "font-size-2",
            "leading-[var(--line-height-2)]",
            "text-[var(--text-tertiary)]",
          )}
        >
          {completed} / {total}
        </span>
      </div>
    </div>
  );
});
TaskCardCollapsedHeaderPrimitive.displayName =
  "TaskCardCollapsedHeaderPrimitive";

// ==================== 标题原语 ====================

/**
 * 任务卡片标题原语（展开状态）
 * @public
 */
export const TaskCardTitlePrimitive = React.forwardRef<
  HTMLHeadingElement,
  TaskCardTitlePrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-600)]",
        "font-semibold",
        "font-size-3",
        "leading-[var(--line-height-3)]",
        "text-[var(--text-title)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TaskCardTitlePrimitive.displayName = "TaskCardTitlePrimitive";

// ==================== 步骤列表原语 ====================

/**
 * 任务卡片步骤列表原语
 * @public
 */
export const TaskCardStepListPrimitive = React.forwardRef<
  HTMLDivElement,
  TaskCardStepListPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        BOX_BORDER,
        "w-full",
        "flex flex-col",
        "gap-[var(--gap-md)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TaskCardStepListPrimitive.displayName = "TaskCardStepListPrimitive";

// ==================== 步骤项原语 ====================

/**
 * 任务卡片步骤项原语
 * @public
 */
export const TaskCardStepItemPrimitive = React.forwardRef<
  HTMLDivElement,
  TaskCardStepItemPrimitiveProps
>(({ status = "pending", icon, children, className, ...props }, ref) => {
  const resolvedStatus = resolveTaskCardStatus(status);

  // 状态图标
  const iconMap: Record<TaskCardSemanticStatus, React.ReactNode> = {
    pending: <Clock className="size-4" />,
    running: <Loader2 className="size-4 animate-spin" />,
    completed: <CheckCircle2 className="size-4" />,
  };

  // 状态颜色
  const colorMap: Record<TaskCardSemanticStatus, string> = {
    pending: "text-[var(--text-tertiary)]",
    running: "text-[var(--text-brand)]",
    completed: "text-[var(--text-success)]",
  };

  return (
    <div
      ref={ref}
      className={cn(
        BOX_BORDER,
        "w-full",
        "flex items-center",
        "gap-[var(--gap-md)]",
        className,
      )}
      data-status={status}
      data-semantic-status={resolvedStatus}
      {...props}
    >
      {/* 图标 */}
      <div
        className={cn(
          "flex items-center justify-center",
          colorMap[resolvedStatus],
        )}
      >
        {icon || iconMap[resolvedStatus]}
      </div>

      {/* 文本 */}
      <span
        className={cn(
          "font-[var(--font-family-cn)]",
          "font-[var(--font-weight-400)]",
          "font-size-2",
          "leading-[var(--line-height-2)]",
          "text-[var(--text-primary)]",
        )}
      >
        {children}
      </span>
    </div>
  );
});
TaskCardStepItemPrimitive.displayName = "TaskCardStepItemPrimitive";

// ==================== 折叠箭头原语 ====================

/**
 * 任务卡片折叠箭头原语
 * @public
 */
export const TaskCardCollapseArrowPrimitive = React.forwardRef<
  HTMLDivElement,
  TaskCardCollapseArrowPrimitiveProps
>(({ open = false, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center",
        "size-4",
        "text-[var(--text-secondary)]",
        "transition-all duration-200",
        open ? "rotate-180" : "rotate-0",
        className,
      )}
      {...props}
    >
      <ChevronDown className="size-4" />
    </div>
  );
});
TaskCardCollapseArrowPrimitive.displayName = "TaskCardCollapseArrowPrimitive";

// ==================== 完整 TaskCard 原语（自包含折叠功能） ====================

/**
 * 任务卡片完整原语（自包含折叠功能）
 * @public
 */
interface TaskCardPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 标题（展开时显示）
   */
  heading?: React.ReactNode;
  /**
   * 当前步骤文本（收起时显示）
   */
  stepText?: React.ReactNode;
  /**
   * 当前步骤图标（收起时显示）
   */
  stepIcon?: React.ReactNode;
  /**
   * 当前步骤序号（从1开始）
   */
  currentStep?: number;
  /**
   * 总数量
   */
  total?: number;
  /**
   * 是否默认展开
   */
  defaultOpen?: boolean;
  /**
   * 控制展开状态
   */
  open?: boolean;
  /**
   * 展开状态变化回调
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * 步骤列表
   */
  steps?: Array<{
    id: string;
    text: React.ReactNode;
    status?: TaskCardStatus;
    icon?: React.ReactNode;
  }>;
  /**
   * 自定义类名
   */
  className?: string;
}

export const TaskCardPrimitive = React.forwardRef<
  HTMLDivElement,
  TaskCardPrimitiveProps
>(
  (
    {
      heading,
      stepText,
      stepIcon,
      currentStep = 0,
      total = 0,
      defaultOpen = false,
      open,
      onOpenChange,
      steps = [],
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = open !== undefined;
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isOpen = isControlled ? open : internalOpen;
    const handleOpenChange = (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    };

    return (
      <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
        <div
          ref={ref}
          className={cn(
            BOX_BORDER,
            "w-full",
            "rounded-[var(--radius-xl)]",
            "bg-[var(--bg-brand-light)]",
            "border border-transparent",
            "py-[var(--padding-com-md)]",
            "px-[var(--padding-com-xl)]",
            "flex flex-col",
            "gap-[var(--gap-lg)]",
            className,
          )}
          {...props}
        >
          {/* 头部：收起状态显示，展开时作为 Trigger */}
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className={cn(
                "appearance-none",
                "border-0",
                "bg-transparent",
                "p-0",
                "w-full",
                "flex items-center",
                "justify-between",
                "gap-[var(--gap-sm)]",
                "cursor-pointer",
              )}
            >
              {/* 左侧：图标 + 步骤文本 */}
              <div className="flex items-center gap-[var(--gap-sm)]">
                {isOpen && heading ? (
                  // 展开状态显示 heading
                  <TaskCardTitlePrimitive>{heading}</TaskCardTitlePrimitive>
                ) : (
                  // 收起状态显示 icon + stepText
                  <>
                    {stepIcon && (
                      <div className="flex items-center justify-center">
                        {stepIcon}
                      </div>
                    )}
                    {stepText && (
                      <span
                        className={cn(
                          "font-[var(--font-family-cn)]",
                          "font-[var(--font-weight-400)]",
                          "font-size-2",
                          "leading-[var(--line-height-2)]",
                          "text-[var(--text-primary)]",
                        )}
                      >
                        {stepText}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* 右侧：进度 + 箭头 */}
              <div className="flex items-center gap-[var(--gap-sm)]">
                {
                  <span
                    className={cn(
                      "font-[var(--font-family-cn)]",
                      "font-[var(--font-weight-400)]",
                      "font-size-2",
                      "leading-[var(--line-height-2)]",
                      "text-[var(--text-tertiary)]",
                    )}
                  >
                    {currentStep} / {total}
                  </span>
                }
                <TaskCardCollapseArrowPrimitive open={isOpen} />
              </div>
            </button>
          </CollapsibleTrigger>

          {/* 展开内容 */}
          <CollapsibleContent>
            <TaskCardStepListPrimitive>
              {steps.map((step) => (
                <TaskCardStepItemPrimitive
                  key={step.id}
                  status={step.status}
                  icon={step.icon}
                >
                  {step.text}
                </TaskCardStepItemPrimitive>
              ))}
            </TaskCardStepListPrimitive>
          </CollapsibleContent>
        </div>
      </Collapsible>
    );
  },
);
TaskCardPrimitive.displayName = "TaskCardPrimitive";

// ==================== 类型导出 ====================

export type {
  TaskCardSemanticStatus,
  TaskCardStatus,
  TaskCardContainerPrimitiveProps,
  TaskCardCollapsedHeaderPrimitiveProps,
  TaskCardTitlePrimitiveProps,
  TaskCardStepListPrimitiveProps,
  TaskCardStepItemPrimitiveProps,
  TaskCardCollapseArrowPrimitiveProps,
  TaskCardPrimitiveProps,
};
