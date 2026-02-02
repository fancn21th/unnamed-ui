"use client";

import * as React from "react";
import { cn, unstyledButtonClassName } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/wuhan/ui/collapsible";

const BOX_BORDER = "box-border [&>*]:box-border";

// ==================== 类型定义 ====================

/**
 * 统一状态语义（组件库层）
 * @public
 */
type ThinkingSemanticStatus =
  | "idle"
  | "running"
  | "success"
  | "error"
  | "cancelled";

/**
 * 思考步骤状态类型（兼容旧状态）
 * @public
 */
type ThinkingStepStatus =
  | ThinkingSemanticStatus
  | "pending"
  | "thinking"
  | "completed";

const resolveThinkingStatus = (
  status: ThinkingStepStatus | undefined,
): ThinkingSemanticStatus => {
  switch (status) {
    case "pending":
      return "idle";
    case "thinking":
      return "running";
    case "completed":
      return "success";
    case "idle":
    case "running":
    case "success":
    case "error":
    case "cancelled":
      return status;
    default:
      return "idle";
  }
};

/**
 * 思考过程容器原语属性
 * @public
 */
interface ThinkingProcessContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * 思考步骤原语属性
 * @public
 */
interface ThinkingStepPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 子元素
   */
  children?: React.ReactNode;
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
   * 步骤状态
   */
  status?: ThinkingStepStatus;
}

/**
 * 思考步骤头部原语属性
 * @public
 */
interface ThinkingStepHeaderPrimitiveProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 左侧内容（图标、状态等）
   */
  children?: React.ReactNode;
  /**
   * 右侧内容（时间、箭头等）
   */
  trailing?: React.ReactNode;
  /**
   * 按钮禁用状态
   */
  disabled?: boolean;
  /**
   * 按钮类型
   */
  type?: "button" | "submit" | "reset";
}

/**
 * 思考步骤内容原语属性
 * @public
 */
interface ThinkingStepContentPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容
   */
  children?: React.ReactNode;
}

/**
 * 思考状态标签原语属性
 * @public
 */
interface ThinkingStatusLabelPrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 状态
   */
  status?: ThinkingStepStatus;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * 思考时间标签原语属性
 * @public
 */
interface ThinkingTimeLabelPrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * 思考图标容器原语属性
 * @public
 */
interface ThinkingIconContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 图标内容
   */
  children?: React.ReactNode;
  /**
   * 状态
   */
  status?: ThinkingStepStatus;
}

/**
 * 思考完成提示原语属性
 * @public
 */
interface ThinkingPersistHintPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 提示内容
   */
  children?: React.ReactNode;
}

/**
 * 思考步骤提示原语属性（显示在 header 下方）
 * @public
 */
interface ThinkingStepHintPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 提示内容
   */
  children?: React.ReactNode;
}

/**
 * 加载动画点原语属性
 * @public
 */
interface ThinkingLoadingDotsPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {}

// ==================== 动画原语组件 ====================

/**
 * 思考中的加载动画点
 * @public
 */
const ThinkingLoadingDotsPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingLoadingDotsPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center",
        "gap-[var(--gap-xs)]",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "rounded-full bg-[var(--bg-brand)]",
          "w-[var(--space-2)] h-[var(--space-2)]",
          "animate-[thinking-loading-pulse_1.4s_ease-in-out_infinite]",
        )}
        style={{ animationDelay: "0s" }}
      />
      <span
        className={cn(
          "rounded-full bg-[var(--bg-brand)]",
          "w-[var(--space-2)] h-[var(--space-2)]",
          "animate-[thinking-loading-pulse_1.4s_ease-in-out_infinite]",
        )}
        style={{ animationDelay: "0.2s" }}
      />
      <span
        className={cn(
          "rounded-full bg-[var(--bg-brand)]",
          "w-[var(--space-2)] h-[var(--space-2)]",
          "animate-[thinking-loading-pulse_1.4s_ease-in-out_infinite]",
        )}
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  );
});
ThinkingLoadingDotsPrimitive.displayName = "ThinkingLoadingDotsPrimitive";

// ==================== 样式原语组件 ====================

/**
 * 思考过程容器样式原语
 * @public
 */
const ThinkingProcessContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingProcessContainerPrimitiveProps
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
ThinkingProcessContainerPrimitive.displayName =
  "ThinkingProcessContainerPrimitive";

/**
 * 思考步骤样式原语
 * @public
 */
const ThinkingStepPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepPrimitiveProps
>(
  (
    {
      children,
      defaultOpen = false,
      open,
      onOpenChange,
      status = "pending",
      className,
      ...props
    },
    ref,
  ) => {
    const resolvedStatus = resolveThinkingStatus(status);
    return (
      <Collapsible
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
      >
        <div
          ref={ref}
          className={cn(BOX_BORDER, "w-full", "group/step", className)}
          data-status={status}
          data-semantic-status={resolvedStatus}
          {...props}
        >
          {children}
        </div>
      </Collapsible>
    );
  },
);
ThinkingStepPrimitive.displayName = "ThinkingStepPrimitive";

/**
 * 思考步骤头部样式原语
 * @public
 */
const ThinkingStepHeaderPrimitive = React.forwardRef<
  HTMLButtonElement,
  ThinkingStepHeaderPrimitiveProps
>(({ children, trailing, className, type: _type, disabled, ...props }, ref) => {
  return (
    <CollapsibleTrigger asChild>
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          unstyledButtonClassName,
          BOX_BORDER,
          "group/think-step-trigger",
          "flex items-center",
          "w-full",
          "cursor-pointer",
          "transition-colors",
          "gap-[var(--gap-sm)]",
          className,
        )}
        {...props}
      >
        {children}
        {trailing && (
          <div className="flex items-center gap-[var(--gap-sm)]">
            {trailing}
          </div>
        )}
      </button>
    </CollapsibleTrigger>
  );
});
ThinkingStepHeaderPrimitive.displayName = "ThinkingStepHeaderPrimitive";

/**
 * 思考步骤内容样式原语
 * @public
 */
const ThinkingStepContentPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepContentPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <CollapsibleContent>
      <div
        ref={ref}
        className={cn(
          BOX_BORDER,
          "mt-[var(--gap-xs)]",
          "w-full",
          "rounded-[var(--radius-xl)]",
          "border",
          "border-[var(--border-neutral)]",
          "bg-[var(--bg-container)]",
          "p-[var(--padding-com-xl)]",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "font-[var(--font-family-cn)]",
            "font-size-2",
            "leading-[var(--line-height-2)]",
            "text-[var(--text-primary)]",
            "whitespace-pre-wrap",
          )}
        >
          {children}
        </div>
      </div>
    </CollapsibleContent>
  );
});
ThinkingStepContentPrimitive.displayName = "ThinkingStepContentPrimitive";

/**
 * 思考状态标签样式原语
 * @public
 */
const ThinkingStatusLabelPrimitive = React.forwardRef<
  HTMLSpanElement,
  ThinkingStatusLabelPrimitiveProps
>(({ status = "pending", children, className, ...props }, ref) => {
  const resolvedStatus = resolveThinkingStatus(status);
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-size-3",
        "leading-[var(--line-height-3)]",
        "font-semibold",
        "text-[var(--text-title)]",
        "group-hover/step:text-[var(--text-brand)]",
        "transition-colors",
        resolvedStatus === "running" && "animate-pulse",
        className,
      )}
      data-status={status}
      data-semantic-status={resolvedStatus}
      {...props}
    >
      {children}
    </span>
  );
});
ThinkingStatusLabelPrimitive.displayName = "ThinkingStatusLabelPrimitive";

/**
 * 思考时间标签样式原语
 * @public
 */
const ThinkingTimeLabelPrimitive = React.forwardRef<
  HTMLSpanElement,
  ThinkingTimeLabelPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-size-3",
        "leading-[var(--line-height-3)]",
        "text-[var(--text-title)]",
        "group-hover/step:text-[var(--text-brand)]",
        "font-normal",
        "transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});
ThinkingTimeLabelPrimitive.displayName = "ThinkingTimeLabelPrimitive";

/**
 * 思考图标容器样式原语
 * @public
 */
const ThinkingIconContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingIconContainerPrimitiveProps
>(({ children, status = "pending", className, ...props }, ref) => {
  const resolvedStatus = resolveThinkingStatus(status);
  const iconStyles: Record<ThinkingSemanticStatus, string> = {
    idle: "text-[var(--text-tertiary)]",
    running: "text-[var(--text-brand)]",
    success: "text-[var(--text-success)]",
    error: "text-[var(--text-error)]",
    cancelled: "text-[var(--text-tertiary)]",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center",
        "size-4",
        iconStyles[resolvedStatus],
        className,
      )}
      data-status={status}
      data-semantic-status={resolvedStatus}
      {...props}
    >
      {children}
    </div>
  );
});
ThinkingIconContainerPrimitive.displayName = "ThinkingIconContainerPrimitive";

/**
 * 折叠箭头图标样式原语
 * @public
 */
const ThinkingCollapseArrowPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center",
        "size-4",
        "text-[var(--text-title)]",
        "group-hover/step:text-[var(--text-brand)]",
        "transition-all duration-200",
        // 默认（收起）箭头朝右：ChevronDown + (-90deg) = right
        "-rotate-90",
        // 展开（open）箭头朝上：ChevronDown + (-180deg) = up
        // 兼容：data-state 通常挂在 Trigger（父级）上
        "group-data-[state=open]/think-step-trigger:-rotate-180",
        "data-[state=open]:-rotate-180",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ThinkingCollapseArrowPrimitive.displayName = "ThinkingCollapseArrowPrimitive";

/**
 * 思考持久化提示样式原语
 * @public
 */
const ThinkingPersistHintPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingPersistHintPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        BOX_BORDER,
        "w-full",
        "font-[var(--font-family-cn)]",
        "font-size-2",
        "leading-[var(--line-height-2)]",
        "text-[var(--text-secondary)]",
        "font-normal",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ThinkingPersistHintPrimitive.displayName = "ThinkingPersistHintPrimitive";

/**
 * 思考步骤提示样式原语（显示在 header 下方）
 * @public
 */
const ThinkingStepHintPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepHintPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        BOX_BORDER,
        "w-full",
        "mt-[var(--gap-xs)]",
        "font-[var(--font-family-cn)]",
        "font-size-2",
        "leading-[var(--line-height-2)]",
        "text-[var(--text-secondary)]",
        "font-normal",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ThinkingStepHintPrimitive.displayName = "ThinkingStepHintPrimitive";

// ==================== 统一导出 ====================

export type {
  ThinkingSemanticStatus,
  ThinkingStepStatus,
  ThinkingProcessContainerPrimitiveProps,
  ThinkingStepPrimitiveProps,
  ThinkingStepHeaderPrimitiveProps,
  ThinkingStepContentPrimitiveProps,
  ThinkingStatusLabelPrimitiveProps,
  ThinkingTimeLabelPrimitiveProps,
  ThinkingIconContainerPrimitiveProps,
  ThinkingPersistHintPrimitiveProps,
  ThinkingStepHintPrimitiveProps,
  ThinkingLoadingDotsPrimitiveProps,
};

export {
  ThinkingProcessContainerPrimitive,
  ThinkingStepPrimitive,
  ThinkingStepHeaderPrimitive,
  ThinkingStepContentPrimitive,
  ThinkingStatusLabelPrimitive,
  ThinkingTimeLabelPrimitive,
  ThinkingIconContainerPrimitive,
  ThinkingCollapseArrowPrimitive,
  ThinkingPersistHintPrimitive,
  ThinkingStepHintPrimitive,
  ThinkingLoadingDotsPrimitive,
};
