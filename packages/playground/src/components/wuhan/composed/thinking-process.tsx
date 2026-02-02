"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ThinkingStepPrimitive,
  ThinkingStepHeaderPrimitive,
  ThinkingStepContentPrimitive,
  ThinkingStatusLabelPrimitive,
  ThinkingTimeLabelPrimitive,
  ThinkingIconContainerPrimitive,
  ThinkingCollapseArrowPrimitive,
  ThinkingStepHintPrimitive,
  type ThinkingSemanticStatus,
  type ThinkingStepStatus,
  type ThinkingStepPrimitiveProps,
} from "@/components/wuhan/blocks/thinking-process-01";
import {
  ThinkingStepItem,
  type ThinkingStepItemProps,
} from "@/components/wuhan/composed/thinking-step-item";
import { ThinkingStepItemContainerPrimitive } from "@/components/wuhan/blocks/thinking-step-item-01";
import { CollapsibleContent } from "@/components/ui/collapsible";

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
       * 子步骤列表：默认会渲染为 `ThinkingStepItem`。
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
 * 思考步骤文案配置
 * @public
 */
interface ThinkingStepLabels {
  /**
   * 长耗时提示文案
   */
  longRunningHint?: React.ReactNode;
  /**
   * 取消状态自动追加的子步骤标题
   */
  cancelledStepTitle?: React.ReactNode;
}

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
   * 内容块（推荐）：支持文字与子步骤列表穿插渲染。
   *
   * 规则：当 `contentBlocks` 存在时，将忽略 `content / subSteps / renderSubSteps`。
   * 即使内容被过滤为空，也不会回退到其他内容来源，以避免出现空内容容器。
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
   */
  renderSubSteps?: (subSteps: unknown[]) => React.ReactNode;
  /**
   * 时长（秒）
   */
  duration?: number;
  /**
   * 头部右侧文案（由使用方自定义）
   *
   * 典型用法：耗时、工具统计等
   */
  headerMeta?: React.ReactNode;
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
  /**
   * 文案配置
   */
  labels?: ThinkingStepLabels;
  /**
   * 触发器/内容区域 id（用于无障碍关联）
   */
  triggerId?: string;
  contentId?: string;
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
      headerMeta,
      status = "pending",
      icon,
      arrowIcon,
      hint,
      longRunning = false,
      defaultOpen,
      open,
      onOpenChange,
      labels,
      triggerId,
      contentId,
      ...props
    },
    ref,
  ) => {
    const defaultArrowIcon = <ChevronDown className="size-4" />;
    const resolvedStatus = resolveThinkingStatus(status);
    const autoId = React.useId();
    const resolvedTriggerId = triggerId ?? `thinking-step-trigger-${autoId}`;
    const resolvedContentId = contentId ?? `thinking-step-content-${autoId}`;
    const resolvedLabels: Required<ThinkingStepLabels> = {
      longRunningHint: "处理将需要几分钟，即使您离开页面也会继续进行",
      cancelledStepTitle: "已取消",
      ...labels,
    };

    // 只有完成状态才显示时间
    const showDuration = resolvedStatus === "success" && duration !== undefined;
    const hasBlocksProp =
      Array.isArray(contentBlocks) && contentBlocks.length > 0;
    const hasSubSteps =
      !hasBlocksProp &&
      typeof renderSubSteps === "function" &&
      Array.isArray(subSteps) &&
      subSteps.length > 0;
    const subStepsNode = hasSubSteps ? renderSubSteps(subSteps) : null;
    const hasContent =
      !hasBlocksProp &&
      content !== undefined &&
      content !== null &&
      content !== "";

    const renderedBlocks = hasBlocksProp
      ? contentBlocks
          .map((block, index) => {
            const key = block.key ?? index;

            switch (block.type) {
              case "text": {
                if (
                  block.content === undefined ||
                  block.content === null ||
                  block.content === ""
                ) {
                  return null;
                }
                return <div key={key}>{block.content}</div>;
              }
              case "subSteps": {
                const steps = [
                  ...block.steps,
                  ...(resolvedStatus === "cancelled"
                    ? ([
                        {
                          status: "cancelled",
                          title: resolvedLabels.cancelledStepTitle,
                          items: [],
                        } satisfies ThinkingStepItemProps,
                      ] as const)
                    : []),
                ];

                if (steps.length === 0) return null;

                return (
                  <div key={key} className="whitespace-normal">
                    <ThinkingStepItemContainerPrimitive>
                      {steps.map((step, stepIndex) => {
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
              }
              case "node": {
                if (block.node === undefined || block.node === null) {
                  return null;
                }
                return (
                  <div key={key} className="whitespace-normal">
                    {block.node}
                  </div>
                );
              }
              default:
                return null;
            }
          })
          .filter(Boolean)
      : [];
    const hasBlocksContent = renderedBlocks.length > 0;
    const blocksNode = hasBlocksContent ? (
      <div className="flex flex-col gap-[var(--gap-md)]">{renderedBlocks}</div>
    ) : null;

    const showHeaderMeta = headerMeta !== undefined && headerMeta !== null;
    const showDurationInHeader = showDuration && !showHeaderMeta;

    const resolvedHint =
      hint ?? (longRunning ? resolvedLabels.longRunningHint : undefined);
    const showHint = resolvedHint !== undefined && resolvedHint !== null;

    const hasHintOnly =
      showHint && !hasBlocksContent && !hasContent && !subStepsNode;
    const hasCollapsibleContent =
      hasHintOnly || hasBlocksContent || hasContent || !!subStepsNode;

    // 状态驱动的默认开合策略：仅在非受控且未显式传 defaultOpen 时生效
    const resolvedDefaultOpen =
      open === undefined && defaultOpen === undefined
        ? resolvedStatus === "running"
          ? !longRunning
          : resolvedStatus === "cancelled"
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
          id={resolvedTriggerId}
          aria-controls={hasCollapsibleContent ? resolvedContentId : undefined}
          trailing={
            <>
              {showHeaderMeta && (
                <span
                  className={cn(
                    "font-[var(--font-family-cn)]",
                    "font-size-2",
                    "leading-[var(--line-height-2)]",
                    "font-normal",
                    "text-[var(--text-secondary)]",
                  )}
                >
                  {headerMeta}
                </span>
              )}
              {showDurationInHeader && (
                <ThinkingTimeLabelPrimitive>
                  {duration}s
                </ThinkingTimeLabelPrimitive>
              )}

              {hasCollapsibleContent && (
                <ThinkingCollapseArrowPrimitive>
                  {arrowIcon || defaultArrowIcon}
                </ThinkingCollapseArrowPrimitive>
              )}
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
            <ThinkingStepHintPrimitive
              id={resolvedContentId}
              aria-labelledby={resolvedTriggerId}
            >
              {resolvedHint}
            </ThinkingStepHintPrimitive>
          </CollapsibleContent>
        ) : null}
        {(hasBlocksContent || hasContent || subStepsNode) && (
          <ThinkingStepContentPrimitive
            id={resolvedContentId}
            aria-labelledby={resolvedTriggerId}
          >
            {hasBlocksContent && blocksNode}
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

export type { ThinkingStepContentBlock, ThinkingStepLabels, ThinkingStepProps };
export { ThinkingStep };
