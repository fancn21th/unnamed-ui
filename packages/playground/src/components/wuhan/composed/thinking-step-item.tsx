"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";
import {
  ThinkingStepItemPrimitive,
  ThinkingStepItemHeaderPrimitive,
  ThinkingStepItemStatusIconPrimitive,
  ThinkingStepItemTitlePrimitive,
  ThinkingStepItemCollapseArrowPrimitive,
  ThinkingStepItemContentPrimitive,
  ThinkingStepItemContentListPrimitive,
  ThinkingStepItemContentItemPrimitive,
  ThinkingStepItemTimelinePrimitive,
  ThinkingStepItemContentAreaPrimitive,
  ThinkingStepItemRegularContentPrimitive,
  ThinkingStepItemToolCallPrimitive,
  ThinkingStepItemFileListPrimitive,
  type ThinkingSemanticStatus,
  type ThinkingStepItemStatus,
  type ThinkingStepItemFileStatus,
  type ThinkingStepItemPrimitiveProps,
} from "@/components/wuhan/blocks/thinking-step-item-01";

const resolveThinkingStepItemStatus = (
  status: ThinkingStepItemStatus | undefined,
): ThinkingSemanticStatus => {
  switch (status) {
    case "loading":
      return "running";
    case "cancel":
      return "cancelled";
    case "success":
    case "error":
    case "idle":
    case "running":
    case "cancelled":
      return status;
    default:
      return "running";
  }
};

/**
 * 执行步骤文案配置
 * @public
 */
interface ThinkingStepItemLabels {
  /**
   * 内容为空且处于运行中的占位文案
   */
  thinking?: React.ReactNode;
  /**
   * 文件列表展开文案
   */
  expandFiles?: React.ReactNode;
  /**
   * 文件列表收起文案
   */
  collapseFiles?: React.ReactNode;
}

/**
 * 执行步骤组件属性
 * @public
 */
interface ThinkingStepItemProps extends Omit<
  ThinkingStepItemPrimitiveProps,
  "children" | "title"
> {
  /**
   * 步骤标题
   */
  title: React.ReactNode;
  /**
   * 步骤内容项列表
   */
  items?: Array<{
    /**
     * 用于 React 渲染的稳定 key（推荐传入，避免使用数组下标）
     */
    key?: React.Key;
    /**
     * 普通内容
     */
    content?: React.ReactNode;
    /**
     * 工具调用
     */
    toolCall?: {
      icon?: React.ReactNode;
      title?: React.ReactNode;
      content?: React.ReactNode;
    };
    /**
     * 文件列表
     */
    files?: Array<{
      icon?: React.ReactNode;
      status?: ThinkingStepItemFileStatus;
      name: string;
    }>;
  }>;
  /**
   * 自定义状态图标
   */
  statusIcon?: React.ReactNode;
  /**
   * 自定义折叠箭头图标
   */
  arrowIcon?: React.ReactNode;
  /**
   * 文案配置
   */
  labels?: ThinkingStepItemLabels;
  /**
   * 触发器/内容区域 id（用于无障碍关联）
   */
  triggerId?: string;
  contentId?: string;
}

/**
 * 执行步骤业务组件
 * @public
 */
const ThinkingStepItem = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemProps
>(
  (
    {
      title,
      items = [],
      status = "loading",
      statusIcon,
      arrowIcon,
      collapsible = false,
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
    const resolvedStatus = resolveThinkingStepItemStatus(status);
    const autoId = React.useId();
    const resolvedTriggerId =
      triggerId ?? `thinking-step-item-trigger-${autoId}`;
    const resolvedContentId =
      contentId ?? `thinking-step-item-content-${autoId}`;
    const hasContent = items.length > 0;
    const resolvedLabels = {
      thinking: "思考中...",
      expandFiles: "查看更多",
      collapseFiles: "收起",
      ...labels,
    };

    return (
      <ThinkingStepItemPrimitive
        ref={ref}
        status={status}
        collapsible={collapsible}
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        {...props}
      >
        <ThinkingStepItemHeaderPrimitive
          collapsible={collapsible}
          id={resolvedTriggerId}
          aria-controls={
            collapsible && hasContent ? resolvedContentId : undefined
          }
          trailing={
            collapsible ? (
              <ThinkingStepItemCollapseArrowPrimitive>
                {arrowIcon || defaultArrowIcon}
              </ThinkingStepItemCollapseArrowPrimitive>
            ) : null
          }
        >
          <ThinkingStepItemStatusIconPrimitive status={status}>
            {statusIcon}
          </ThinkingStepItemStatusIconPrimitive>
          <ThinkingStepItemTitlePrimitive>
            {title}
          </ThinkingStepItemTitlePrimitive>
        </ThinkingStepItemHeaderPrimitive>
        {hasContent && (
          <ThinkingStepItemContentPrimitive
            collapsible={collapsible}
            id={resolvedContentId}
            aria-labelledby={resolvedTriggerId}
          >
            <ThinkingStepItemContentListPrimitive>
              {items.map((item, index) => (
                <ThinkingStepItemContentItemPrimitive
                  key={item.key ?? index}
                  isLast={index === items.length - 1}
                >
                  <ThinkingStepItemTimelinePrimitive
                    isLast={index === items.length - 1}
                  />
                  <ThinkingStepItemContentAreaPrimitive>
                    {(item.content ?? null) !== null &&
                    item.content !== undefined ? (
                      <ThinkingStepItemRegularContentPrimitive>
                        {item.content}
                      </ThinkingStepItemRegularContentPrimitive>
                    ) : resolvedStatus === "running" ? (
                      <ThinkingStepItemRegularContentPrimitive className="animate-pulse">
                        {resolvedLabels.thinking}
                      </ThinkingStepItemRegularContentPrimitive>
                    ) : null}
                    {item.toolCall && (
                      <ThinkingStepItemToolCallPrimitive
                        icon={item.toolCall.icon}
                        title={item.toolCall.title}
                        content={item.toolCall.content}
                      />
                    )}
                    {item.files && item.files.length > 0 && (
                      <ThinkingStepItemFileListPrimitive
                        files={item.files}
                        labels={{
                          expandFiles: resolvedLabels.expandFiles,
                          collapseFiles: resolvedLabels.collapseFiles,
                        }}
                      />
                    )}
                  </ThinkingStepItemContentAreaPrimitive>
                </ThinkingStepItemContentItemPrimitive>
              ))}
            </ThinkingStepItemContentListPrimitive>
          </ThinkingStepItemContentPrimitive>
        )}
      </ThinkingStepItemPrimitive>
    );
  },
);
ThinkingStepItem.displayName = "ThinkingStepItem";

export type { ThinkingStepItemLabels, ThinkingStepItemProps };
export { ThinkingStepItem };
