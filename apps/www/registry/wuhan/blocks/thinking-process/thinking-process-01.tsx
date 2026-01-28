"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/wuhan/ui/collapsible";

// ==================== 类型定义 ====================

/**
 * 思考步骤状态类型
 * @public
 */
type ThinkingStepStatus = "pending" | "thinking" | "completed" | "cancelled";

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
interface ThinkingStepHeaderPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 左侧内容（图标、状态等）
   */
  children?: React.ReactNode;
  /**
   * 右侧内容（时间、箭头等）
   */
  trailing?: React.ReactNode;
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
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes thinking-loading-pulse {
              0%, 100% {
                opacity: 0.3;
                transform: scale(0.8);
              }
              50% {
                opacity: 1;
                transform: scale(1);
              }
            }
          `,
        }}
      />
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-1", className)}
        {...props}
      >
        <span
          className="w-1 h-1 rounded-full bg-[var(--bg-brand)]"
          style={{
            animation: "thinking-loading-pulse 1.4s ease-in-out infinite",
            animationDelay: "0s",
          }}
        />
        <span
          className="w-1 h-1 rounded-full bg-[var(--bg-brand)]"
          style={{
            animation: "thinking-loading-pulse 1.4s ease-in-out infinite",
            animationDelay: "0.2s",
          }}
        />
        <span
          className="w-1 h-1 rounded-full bg-[var(--bg-brand)]"
          style={{
            animation: "thinking-loading-pulse 1.4s ease-in-out infinite",
            animationDelay: "0.4s",
          }}
        />
      </div>
    </>
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
        "[&_*]:!box-border",
        "w-full",
        "flex flex-col",
        "gap-[8px]",
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
    return (
      <Collapsible
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
      >
        <div
          ref={ref}
          className={cn("[&_*]:!box-border", "w-full", "group/step", className)}
          data-status={status}
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
  HTMLDivElement,
  ThinkingStepHeaderPrimitiveProps
>(({ children, trailing, className, ...props }, ref) => {
  return (
    <CollapsibleTrigger asChild>
      <div
        ref={ref}
        className={cn(
          "[&_*]:!box-border",
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
        {trailing}
      </div>
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
          "[&_*]:!box-border",
          "mt-[var(--gap-xs)]",
          "w-full",
          "rounded-[var(--radius-xl)]",
          "border",
          "border-[var(--Border-border-neutral,#E1E0E7)]",
          "bg-[var(--Container-bg-container,#FFFFFF)]",
          "p-[var(--margin-com-xl)]",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "font-[var(--font-family-cn)]",
            "font-size-2",
            "leading-[var(--line-height-2)]",
            "text-[var(--text-icon-text-primary,#403F4D)]",
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
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-size-3",
        "leading-[var(--line-height-3)]",
        "font-semibold",
        "text-[var(--text-icon-text-title,#1E1D26)]",
        "group-hover/step:text-[var(--text-icon-text-brand,#4A56FF)]",
        "transition-colors",
        status === "thinking" && "animate-pulse",
        className,
      )}
      data-status={status}
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
        "text-[var(--text-icon-text-title,#1E1D26)]",
        "group-hover/step:text-[var(--text-icon-text-brand,#4A56FF)]",
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
  const iconStyles = {
    pending: "text-[var(--text-tertiary)]",
    thinking: "text-[var(--text-brand)]",
    completed: "text-[var(--text-success)]",
    cancelled: "text-[var(--text-tertiary)]",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center",
        "size-4",
        iconStyles[status],
        className,
      )}
      data-status={status}
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
        "size-4",
        "text-[var(--text-icon-text-title,#1E1D26)]",
        "group-hover/step:text-[var(--text-icon-text-brand,#4A56FF)]",
        "transition-all duration-200",
        "data-[state=open]:rotate-180",
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
        "[&_*]:!box-border",
        "w-full",
        "font-[var(--font-family-cn)]",
        "font-size-2",
        "leading-[var(--line-height-2)]",
        "text-[var(--text-icon-text-secondary,#666473)]",
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
        "[&_*]:!box-border",
        "w-full",
        "mt-[var(--gap-xs)]",
        "font-[var(--font-family-cn)]",
        "font-size-2",
        "leading-[var(--line-height-2)]",
        "text-[var(--text-icon-text-secondary,#666473)]",
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

// ==================== 业务组件层（可选） ====================

/**
 * 思考步骤组件属性
 * @public
 */
interface ThinkingStepProps extends Omit<
  ThinkingStepPrimitiveProps,
  "children" | "title" | "content"
> {
  /**
   * 步骤标题
   */
  title: React.ReactNode;
  /**
   * 步骤内容
   */
  content?: React.ReactNode;
  /**
   * 时长（秒）
   */
  duration?: number;
  /**
   * 自定义图标
   */
  icon?: React.ReactNode;
  /**
   * 自定义箭头图标
   */
  arrowIcon?: React.ReactNode;
}

/**
 * 思考步骤业务组件
 * @public
 */
const ThinkingStep = React.forwardRef<HTMLDivElement, ThinkingStepProps>(
  (
    {
      title,
      content,
      duration,
      status = "pending",
      icon,
      arrowIcon,
      defaultOpen,
      open,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    // 默认不显示图标
    const defaultIcon = null;

    const defaultArrowIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    // 只有完成状态才显示时间
    const showDuration = status === "completed" && duration !== undefined;

    return (
      <ThinkingStepPrimitive
        ref={ref}
        status={status}
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        {...props}
      >
        <ThinkingStepHeaderPrimitive
          trailing={
            <ThinkingCollapseArrowPrimitive>
              {arrowIcon || defaultArrowIcon}
            </ThinkingCollapseArrowPrimitive>
          }
        >
          {icon ? (
            <ThinkingIconContainerPrimitive status={status}>
              {icon}
            </ThinkingIconContainerPrimitive>
          ) : null}
          <ThinkingStatusLabelPrimitive status={status}>
            {title}
          </ThinkingStatusLabelPrimitive>
          {showDuration && (
            <ThinkingTimeLabelPrimitive>{duration}s</ThinkingTimeLabelPrimitive>
          )}
        </ThinkingStepHeaderPrimitive>
        {content && (
          <ThinkingStepContentPrimitive>{content}</ThinkingStepContentPrimitive>
        )}
      </ThinkingStepPrimitive>
    );
  },
);
ThinkingStep.displayName = "ThinkingStep";

// ==================== 统一导出 ====================

export type {
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
  ThinkingStepProps,
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
  ThinkingStep,
};
