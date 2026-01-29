"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ThinkingStepItem,
  ThinkingStepItemContainerPrimitive,
  type ThinkingStepItemProps,
} from "@/registry/wuhan/blocks/thinking-step-item/thinking-step-item-01";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/wuhan/ui/collapsible";

const BOX_BORDER = "[&_*]:!box-border";

// ==================== 类型定义 ====================

/**
 * 思考步骤状态类型
 * @public
 */
type ThinkingStepStatus = "pending" | "thinking" | "completed" | "cancelled";

/**
 * ThinkingStep 内容块
 *
 * 设计目标：让使用者可以用数据驱动的方式实现「文字 → 子步骤列表 → 文字」的穿插渲染。
 *
 * @public
 */
type ThinkingStepContentBlock =
  | {
      type: "text";
      content: React.ReactNode;
      key?: React.Key;
    }
  | {
      type: "subSteps";
      /**
       * 子步骤列表：默认会渲染为 `ThinkingStepItemContainerPrimitive` + `ThinkingStepItem`。
       */
      steps: Array<ThinkingStepItemProps & { key?: React.Key }>;
      key?: React.Key;
    }
  | {
      type: "node";
      /**
       * 兜底自定义：直接渲染任意 ReactNode。
       */
      node: React.ReactNode;
      key?: React.Key;
    };

/**
 * 思考过程容器原语属性
 * @public
 */
interface ThinkingProcessContainerPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * 思考步骤原语属性
 * @public
 */
interface ThinkingStepPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
interface ThinkingStepHeaderPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
interface ThinkingStepContentPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容
   */
  children?: React.ReactNode;
}

/**
 * 思考状态标签原语属性
 * @public
 */
interface ThinkingStatusLabelPrimitiveProps
  extends React.HTMLAttributes<HTMLSpanElement> {
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
interface ThinkingTimeLabelPrimitiveProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * 思考图标容器原语属性
 * @public
 */
interface ThinkingIconContainerPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
interface ThinkingPersistHintPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 提示内容
   */
  children?: React.ReactNode;
}

/**
 * 思考步骤提示原语属性（显示在 header 下方）
 * @public
 */
interface ThinkingStepHintPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 提示内容
   */
  children?: React.ReactNode;
}

/**
 * 加载动画点原语属性
 * @public
 */
interface ThinkingLoadingDotsPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {}

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

// ==================== 业务组件层（可选） ====================

/**
 * 思考步骤组件属性
 * @public
 */
interface ThinkingStepProps
  extends Omit<ThinkingStepPrimitiveProps, "children" | "title" | "content"> {
  /**
   * 步骤标题
   */
  title: React.ReactNode;
  /**
   * 步骤内容
   */
  content?: React.ReactNode;
  /**
   * 内容块（推荐）：支持文字与子步骤列表穿插渲染。
   *
   * 规则：当 `contentBlocks` 存在时，将忽略 `content / subSteps / renderSubSteps`。
   */
  contentBlocks?: ThinkingStepContentBlock[];
  /**
   * 子步骤数据（结构化内容）
   *
   * 设计目标：不与具体子组件强耦合，由 `renderSubSteps` 决定如何渲染。
   */
  subSteps?: unknown[];
  /**
   * 子步骤渲染器。与 `subSteps` 配套使用。
   *
   * 说明：为了保持 block 的独立可用性，这里不直接依赖 `thinking-step-item`，
   *      由业务侧/使用方注入具体渲染实现（例如渲染 `ThinkingStepItem` 列表）。
   */
  renderSubSteps?: (subSteps: unknown[]) => React.ReactNode;
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
  /**
   * 长耗时提示（显示在 header 下方，并且可随折叠收起/展开）
   *
   * 典型文案：处理将需要几分钟，即使您离开页面也会继续进行
   */
  hint?: React.ReactNode;
  /**
   * 是否为长耗时场景
   *
   * - `true` 且未提供 `hint` 时，将使用默认提示文案
   * - 默认开合策略会按场景 2：默认收起
   */
  longRunning?: boolean;
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
      contentBlocks,
      subSteps,
      renderSubSteps,
      duration,
      status = "pending",
      icon,
      arrowIcon,
      hint,
      longRunning = false,
      defaultOpen,
      open,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    const defaultArrowIcon = <ChevronDown className="size-4" />;

    // 只有完成状态才显示时间
    const showDuration = status === "completed" && duration !== undefined;
    const hasBlocks = Array.isArray(contentBlocks) && contentBlocks.length > 0;
    const hasSubSteps =
      !hasBlocks &&
      typeof renderSubSteps === "function" &&
      Array.isArray(subSteps) &&
      subSteps.length > 0;
    const subStepsNode = hasSubSteps ? renderSubSteps(subSteps) : null;
    const hasContent = !hasBlocks && content !== undefined && content !== null;

    const blocksNode = hasBlocks ? (
      <div className="flex flex-col gap-[var(--gap-md)]">
        {contentBlocks.map((block, index) => {
          const key = block.key ?? index;

          switch (block.type) {
            case "text":
              return <div key={key}>{block.content}</div>;
            case "subSteps":
              return (
                <div key={key} className="whitespace-normal">
                  <ThinkingStepItemContainerPrimitive>
                    {[
                      ...block.steps,
                      ...(status === "cancelled"
                        ? ([
                            {
                              status: "cancel",
                              title: "已取消",
                              items: [],
                            } satisfies ThinkingStepItemProps,
                          ] as const)
                        : []),
                    ].map((step, stepIndex) => {
                      const { key: stepKey, ...stepProps } = step;
                      const fallbackKey =
                        typeof stepProps.title === "string" ||
                        typeof stepProps.title === "number"
                          ? String(stepProps.title)
                          : stepIndex;

                      return (
                        <ThinkingStepItem
                          key={stepKey ?? fallbackKey}
                          {...stepProps}
                        />
                      );
                    })}
                  </ThinkingStepItemContainerPrimitive>
                </div>
              );
            case "node":
              return (
                <div key={key} className="whitespace-normal">
                  {block.node}
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    ) : null;

    // 工具调用统计：仅在 contentBlocks 的 subSteps 中自动统计（其它情况建议由业务侧自行传文案到 contentBlocks/text）
    const toolsUsedCount = hasBlocks
      ? contentBlocks.reduce((acc, block) => {
          if (block.type !== "subSteps") return acc;
          return (
            acc +
            block.steps.reduce((stepAcc, step) => {
              const items = step.items ?? [];
              return (
                stepAcc +
                items.reduce(
                  (itemAcc, item) => itemAcc + (item.toolCall ? 1 : 0),
                  0,
                )
              );
            }, 0)
          );
        }, 0)
      : 0;

    const showToolsUsed = toolsUsedCount > 0;
    const showDurationInHeader = showDuration && !showToolsUsed;

    const resolvedHint =
      hint ??
      (longRunning
        ? "处理将需要几分钟，即使您离开页面也会继续进行"
        : undefined);
    const showHint = resolvedHint !== undefined && resolvedHint !== null;

    const hasHintOnly = showHint && !hasBlocks && !hasContent && !subStepsNode;

    // 状态驱动的默认开合策略：仅在非受控且未显式传 defaultOpen 时生效
    const resolvedDefaultOpen =
      open === undefined && defaultOpen === undefined
        ? status === "thinking"
          ? !longRunning
          : status === "cancelled"
        : defaultOpen;

    return (
      <ThinkingStepPrimitive
        ref={ref}
        status={status}
        defaultOpen={resolvedDefaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        {...props}
      >
        <ThinkingStepHeaderPrimitive
          trailing={
            <>
              {showToolsUsed && (
                <span
                  className={cn(
                    "font-[var(--font-family-cn)]",
                    "font-size-2",
                    "leading-[var(--line-height-2)]",
                    "font-normal",
                    "text-[var(--text-secondary)]",
                  )}
                >
                  已使用{toolsUsedCount}个工具
                </span>
              )}
              {showDurationInHeader && (
                <ThinkingTimeLabelPrimitive>
                  {duration}s
                </ThinkingTimeLabelPrimitive>
              )}
              <ThinkingCollapseArrowPrimitive>
                {arrowIcon || defaultArrowIcon}
              </ThinkingCollapseArrowPrimitive>
            </>
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
        </ThinkingStepHeaderPrimitive>
        {hasHintOnly ? (
          <CollapsibleContent>
            <ThinkingStepHintPrimitive>
              {resolvedHint}
            </ThinkingStepHintPrimitive>
          </CollapsibleContent>
        ) : null}
        {(hasBlocks || hasContent || subStepsNode) && (
          <ThinkingStepContentPrimitive>
            {hasBlocks && blocksNode}
            {hasContent && <div>{content}</div>}
            {subStepsNode && (
              <div
                className={cn(
                  // 覆盖 ContentPrimitive 内部的 `whitespace-pre-wrap` 继承，避免影响子组件布局
                  "whitespace-normal",
                  hasContent && "mt-[var(--gap-md)]",
                )}
              >
                {subStepsNode}
              </div>
            )}
          </ThinkingStepContentPrimitive>
        )}
      </ThinkingStepPrimitive>
    );
  },
);
ThinkingStep.displayName = "ThinkingStep";

// ==================== 统一导出 ====================

export type {
  ThinkingStepStatus,
  ThinkingStepContentBlock,
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
