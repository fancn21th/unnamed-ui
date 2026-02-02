"use client";

import { ChevronDown, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import * as React from "react";
import {
  DeepThinkingContainerPrimitive,
  DeepThinkingHeaderPrimitive,
  DeepThinkingIconPrimitive,
  DeepThinkingTitlePrimitive,
  DeepThinkingContentPrimitive,
  DeepThinkingArrowPrimitive,
  ThinkingDotsPrimitive,
} from "@/registry/wuhan/blocks/deep-thinking/deep-thinking-01";

/**
 * 深度思考状态类型
 * @public
 */
export type DeepThinkingStatus = "thinking" | "completed" | "failed";

/**
 * 深度思考标签配置
 * 用于自定义不同状态下的标题文本
 * @public
 */
export interface DeepThinkingLabels {
  /** 思考中状态的标题 */
  thinkingTitle?: React.ReactNode;
  /** 已完成状态的标题 */
  completedTitle?: React.ReactNode;
  /** 失败状态的标题 */
  failedTitle?: React.ReactNode;
}

/**
 * 深度思考组件属性
 * @public
 */
export interface DeepThinkingProps {
  /** 当前状态：thinking(思考中) | completed(已完成) | failed(失败) */
  status?: DeepThinkingStatus;
  /** 自定义标题，优先级高于 labels 和默认标题 */
  title?: React.ReactNode;
  /** 思考内容，展开后显示的详细信息 */
  content?: React.ReactNode;
  /** 自定义图标，优先级高于状态默认图标 */
  icon?: React.ReactNode;
  /** 自定义展开/收起箭头图标 */
  arrowIcon?: React.ReactNode;
  /** 非受控模式下的默认展开状态 */
  defaultOpen?: boolean;
  /** 受控模式下的展开状态 */
  open?: boolean;
  /** 展开状态变化回调函数 */
  onOpenChange?: (open: boolean) => void;
  /** 自定义不同状态的标题文本 */
  labels?: DeepThinkingLabels;
}

/** 默认标签配置 */
const defaultLabels: Required<DeepThinkingLabels> = {
  thinkingTitle: "深度思考中",
  completedTitle: "已完成思考",
  failedTitle: "思考失败",
};

/** 状态对应的默认图标映射 */
const statusIconMap: Record<DeepThinkingStatus, React.ReactNode> = {
  thinking: <ThinkingDotsPrimitive />,
  completed: <CheckCircle2 className="size-4 text-[var(--text-success)]" />,
  failed: <AlertCircle className="size-4 text-[var(--text-error)]" />,
};

/**
 * 深度思考组件
 *
 * 用于展示 AI 的深度思考过程，支持思考中、已完成、失败三种状态。
 * 提供可折叠交互，用户可以展开查看详细的思考内容。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <DeepThinking
 *   status="thinking"
 *   content="正在分析用户问题..."
 * />
 *
 * // 受控模式
 * const [open, setOpen] = useState(false);
 * <DeepThinking
 *   status="completed"
 *   title="分析完成(用时5秒)"
 *   content="已完成深度分析..."
 *   open={open}
 *   onOpenChange={setOpen}
 * />
 *
 * // 自定义标签
 * <DeepThinking
 *   status="thinking"
 *   labels={{
 *     thinkingTitle: "AI正在思考",
 *     completedTitle: "思考完毕"
 *   }}
 * />
 * ```
 *
 * @public
 */
export const DeepThinking = React.forwardRef<HTMLDivElement, DeepThinkingProps>(
  (
    {
      status = "thinking",
      title,
      content,
      icon,
      arrowIcon,
      defaultOpen = false,
      open,
      onOpenChange,
      labels,
    },
    ref,
  ) => {
    // 合并用户自定义标签和默认标签
    const resolvedLabels = { ...defaultLabels, ...labels };
    // 生成唯一的内容 ID，用于无障碍访问
    const contentId = React.useId();
    // 解析展开状态（优先使用受控值，否则使用默认值）
    const resolvedOpen = open ?? defaultOpen;

    // 解析标题：优先使用 title prop，否则根据状态和标签配置自动选择
    const resolvedTitle =
      title ??
      (status === "thinking"
        ? resolvedLabels.thinkingTitle
        : status === "completed"
          ? resolvedLabels.completedTitle
          : resolvedLabels.failedTitle);

    // 解析图标：优先使用 icon prop，否则根据状态选择默认图标
    const resolvedIcon = icon ?? statusIconMap[status] ?? (
      <Sparkles className="size-4 text-[var(--text-brand)]" />
    );

    return (
      <DeepThinkingContainerPrimitive
        ref={ref}
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
      >
        <DeepThinkingHeaderPrimitive
          aria-controls={contentId}
          aria-expanded={resolvedOpen}
          arrow={
            <DeepThinkingArrowPrimitive>
              {arrowIcon || <ChevronDown className="size-4" />}
            </DeepThinkingArrowPrimitive>
          }
        >
          <DeepThinkingIconPrimitive>
            {resolvedIcon}
            <DeepThinkingTitlePrimitive
              className={
                status === "thinking"
                  ? "text-[var(--text-secondary)]"
                  : undefined
              }
            >
              {resolvedTitle}
            </DeepThinkingTitlePrimitive>
          </DeepThinkingIconPrimitive>
        </DeepThinkingHeaderPrimitive>
        {/* 只有在提供了 content 时才渲染内容区域 */}
        {content && (
          <DeepThinkingContentPrimitive id={contentId}>
            {content}
          </DeepThinkingContentPrimitive>
        )}
      </DeepThinkingContainerPrimitive>
    );
  },
);
DeepThinking.displayName = "DeepThinking";
