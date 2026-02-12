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
} from "@/registry/wuhan/blocks/thinking-step-item/thinking-step-item-01";

/**
 * 自定义内容渲染包装组件
 */
const ThinkingStepItemCustomPrimitive = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  if (children === null || children === undefined) {
    return null;
  }
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

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
 * 步骤内容项类型（支持自定义组件渲染）
 * @public
 *
 * 每个 items 元素支持同时包含：
 * - content: 普通内容
 * - toolCall: 工具调用
 * - files: 文件列表
 * - render + data: 自定义渲染
 *
 * 渲染顺序：content → toolCall → files → custom
 */
type ThinkingStepItemContentItem = {
  /**
   * 用于 React 渲染的稳定 key
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
  /**
   * 自定义渲染函数（渲染在 files 之后）
   */
  render?: (data: unknown) => React.ReactNode;
  /**
   * 传递给 render 函数的数据
   */
  data?: unknown;
};

/**
 * 步骤内容项列表类型
 * @public
 */
type ThinkingStepItemContentItems = ThinkingStepItemContentItem[];

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
   * 步骤内容项列表（支持混合渲染）
   *
   * 渲染顺序：按数组顺序依次渲染 content → toolCall → files → custom
   */
  items?: ThinkingStepItemContentItems;
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
              {items.map((item, index) => {
                const itemKey = item.key ?? index;
                const isLast = index === items.length - 1;

                // 渲染 content
                const renderContent = () => {
                  if (item.content !== undefined && item.content !== null) {
                    return (
                      <ThinkingStepItemRegularContentPrimitive>
                        {item.content}
                      </ThinkingStepItemRegularContentPrimitive>
                    );
                  }
                  if (resolvedStatus === "running") {
                    return (
                      <ThinkingStepItemRegularContentPrimitive className="animate-pulse">
                        {resolvedLabels.thinking}
                      </ThinkingStepItemRegularContentPrimitive>
                    );
                  }
                  return null;
                };

                // 渲染 toolCall
                const renderToolCall = () => {
                  if (item.toolCall) {
                    return (
                      <ThinkingStepItemToolCallPrimitive
                        icon={item.toolCall.icon}
                        title={item.toolCall.title}
                        content={item.toolCall.content}
                      />
                    );
                  }
                  return null;
                };

                // 渲染 files
                const renderFiles = () => {
                  if (item.files && item.files.length > 0) {
                    return (
                      <ThinkingStepItemFileListPrimitive
                        files={item.files}
                        labels={{
                          expandFiles: resolvedLabels.expandFiles,
                          collapseFiles: resolvedLabels.collapseFiles,
                        }}
                      />
                    );
                  }
                  return null;
                };

                // 渲染 custom（files 之后）
                const renderCustom = () => {
                  if (typeof item.render === "function") {
                    const node = item.render(item.data);
                    if (node !== null && node !== undefined) {
                      return (
                        <ThinkingStepItemCustomPrimitive>
                          {node}
                        </ThinkingStepItemCustomPrimitive>
                      );
                    }
                  }
                  return null;
                };

                return (
                  <ThinkingStepItemContentItemPrimitive
                    key={itemKey}
                    isLast={isLast}
                  >
                    <ThinkingStepItemTimelinePrimitive isLast={isLast} />
                    <ThinkingStepItemContentAreaPrimitive>
                      {renderContent()}
                      {renderToolCall()}
                      {renderFiles()}
                      {renderCustom()}
                    </ThinkingStepItemContentAreaPrimitive>
                  </ThinkingStepItemContentItemPrimitive>
                );
              })}
            </ThinkingStepItemContentListPrimitive>
          </ThinkingStepItemContentPrimitive>
        )}
      </ThinkingStepItemPrimitive>
    );
  },
);
ThinkingStepItem.displayName = "ThinkingStepItem";

export type {
  ThinkingStepItemLabels,
  ThinkingStepItemProps,
  ThinkingStepItemContentItem,
  ThinkingStepItemContentItems,
};
export { ThinkingStepItem };
