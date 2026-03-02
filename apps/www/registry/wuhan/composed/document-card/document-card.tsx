"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DocumentCardHeaderPrimitive,
  DocumentCardContainerPrimitive,
  DocumentCardSeparatorPrimitive,
  DocumentCardGeneratingPrimitive,
  DocumentCardDefaultIcon,
} from "@/registry/wuhan/blocks/document-card/document-card-01";

// ==================== 类型定义 ====================

/**
 * Document Card Item 类型
 * @public
 */
export interface DocumentCardItem {
  /** 唯一标识符 */
  id: string;
  /** 卡片标题 */
  title: string;
  /** 更新时间 */
  updateTime?: string;
  /** 研究主题 */
  researchTopic?: string;
  /** 研究领域 */
  researchField?: string;
  /** 研究周期 */
  researchPeriod?: string;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 点击事件 */
  onClick?: () => void;
  /** 下载点击事件 */
  onDownload?: () => void;
  /** 生成中状态配置 */
  generating?: {
    /** 进度百分比 (0-100) */
    progress?: number;
    /** 生成信息文本 */
    generatingInfo?: React.ReactNode;
  };
}

/**
 * DocumentCard 组件属性
 * @public
 */
export interface DocumentCardProps {
  /** 标题 */
  title?: string;
  /** 更新时间 */
  updateTime?: string;
  /** 研究主题 */
  researchTopic?: string;
  /** 研究领域 */
  researchField?: string;
  /** 研究周期 */
  researchPeriod?: string;
  /** 图标 */
  icon?: React.ReactNode;
  /** 点击事件 */
  onClick?: () => void;
  /** 下载点击事件（hover 时显示下载图标，点击时触发） */
  onDownload?: () => void;
  /** 生成中状态配置 */
  generating?: {
    /** 进度百分比 (0-100) */
    progress?: number;
    /** 生成信息文本（如：正在生成研究报告 · 预计5-10分钟） */
    generatingInfo?: React.ReactNode;
  };
  /** 自定义类名 */
  className?: string;
}

/**
 * DocumentCardList 组件属性
 * @public
 */
export interface DocumentCardListProps {
  /** 标题 */
  title?: string;
  /** 卡片列表数据 */
  cards?: DocumentCardItem[];
  /** 点击卡片回调 */
  onCardClick?: (id: string) => void;
  /** 点击下载回调 */
  onCardDownload?: (id: string) => void;
  /** 自定义类名 */
  className?: string;
}

// ==================== 主组件：DocumentCard ====================

/**
 * DocumentCard 组合组件
 * 提供完整的文档卡片功能，支持三种状态：
 * 1. 生成中 - 显示进度条和预估时间
 * 2. 完成 - 简洁显示图标、标题、时间
 * 3. 有额外信息 - 展开显示完整元数据
 *
 * @example
 * ```tsx
 * // 生成中状态
 * <DocumentCard
 *   title="AI趋势研究"
 *   generating={{ progress: 60, estimatedTime: "预计5-10分钟" }}
 * />
 * //
 * // 完成状态
 * <DocumentCard
 *   title="AI趋势研究"
 *   updateTime="18:21"
 * />
 * //
 * // 有额外信息状态
 * <DocumentCard
 *   title="AI趋势研究"
 *   updateTime="18:21"
 *   researchTopic="标签"
 *   researchField="商业投资"
 *   researchPeriod="2015-2025"
 *   onClick={() => {...}}
 * />
 * ```
 *
 * @public
 */
export const DocumentCard = React.forwardRef<HTMLDivElement, DocumentCardProps>(
  (props, ref) => {
    const {
      title,
      updateTime,
      researchTopic,
      researchField,
      researchPeriod,
      icon,
      onClick,
      onDownload,
      generating,
      className,
    } = props;

    // 构建属性列表（仅在有额外信息时显示）
    const fields = [];
    let hasExtraInfo = false;

    if (researchTopic !== undefined) {
      fields.push({
        label: "研究主题：",
        value: researchTopic,
        hasBorderValue: true,
      });
      hasExtraInfo = true;
    }

    if (researchField !== undefined) {
      fields.push({
        label: "研究领域：",
        value: researchField,
        hasBorderValue: false,
      });
      hasExtraInfo = true;
    }

    if (researchPeriod !== undefined) {
      fields.push({
        label: "研究周期：",
        value: researchPeriod,
        hasBorderValue: false,
      });
      hasExtraInfo = true;
    }

    return (
      <DocumentCardContainerPrimitive
        ref={ref}
        className={cn("group/card relative", className)}
        onClick={generating ? undefined : onClick}
      >
        {/* 生成中状态 */}
        {generating ? (
          <>
            {/* 头部区域 */}
            <DocumentCardHeaderPrimitive
              icon={icon ?? <DocumentCardDefaultIcon />}
              title={title}
            />

            {/* 生成进度区域 */}
            <DocumentCardGeneratingPrimitive
              progress={generating.progress}
              generatingInfo={generating.generatingInfo}
            />
          </>
        ) : (
          <>
            {/* 头部区域：下载图标仅在此区域内 Y 轴居中，且仅 hover 当前卡片时显示 */}
            <div className="relative">
              <DocumentCardHeaderPrimitive
                icon={icon ?? <DocumentCardDefaultIcon />}
                title={title}
                updateTime={updateTime ? `更新时间：${updateTime}` : undefined}
              />
              <div
                className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2",
                  "flex size-8 items-center justify-center rounded-[var(--radius-md)]",
                  "opacity-0 transition-opacity duration-200 group-hover/card:opacity-100",
                  "hover:bg-[var(--Container-bg-neutral-light)]",
                  onDownload && "cursor-pointer",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload?.();
                }}
                aria-label="下载"
              >
                <Download
                  className="size-4 text-[var(--Text-text-secondary)]"
                  aria-hidden
                />
              </div>
            </div>

            {/* 分割线 */}
            {hasExtraInfo && <DocumentCardSeparatorPrimitive />}

            {/* 详细属性区 */}
            {hasExtraInfo && (
              <div className="flex flex-col gap-1">
                {fields.map((field, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {/* 标签 */}
                    <span
                      className={cn(
                        "font-[var(--font-family-CN)]",
                        "font-[var(--font-weight-400)]",
                        "font-size-1",
                        "leading-[var(--line-height-1)]",
                        "text-[var(--Text-text-tertiary)]",
                        "flex-shrink-0",
                      )}
                    >
                      {field.label}
                    </span>

                    {/* 数值内容 */}
                    {field.hasBorderValue ? (
                      <span
                        className={cn(
                          "inline-flex",
                          "items-center",
                          "px-[var(--Padding-padding-com-xs)]",
                          "py-[var(--Padding-padding-com-2xs)]",
                          "rounded-[var(--radius-sm)]",
                          "border border-[var(--Border-border-neutral)]",
                          "bg-[var(--Container-bg-container)]",
                          "font-[var(--font-family-CN)]",
                          "font-[var(--font-weight-400)]",
                          "font-size-1",
                          "leading-[var(--line-height-1)]",
                          "text-[var(--Text-text-primary)]",
                          "truncate",
                        )}
                      >
                        {field.value}
                      </span>
                    ) : (
                      <span
                        className={cn(
                          "font-[var(--font-family-CN)]",
                          "font-[var(--font-weight-400)]",
                          "font-size-1",
                          "leading-[var(--line-height-1)]",
                          "text-[var(--Text-text-primary)]",
                          "truncate",
                        )}
                      >
                        {field.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </DocumentCardContainerPrimitive>
    );
  },
);
DocumentCard.displayName = "DocumentCard";

// ==================== DocumentCardList 组件 ====================

/**
 * DocumentCardList 组件
 * 展示多个文档卡片列表
 *
 * @example
 * ```tsx
 * const cards = [
 *   { id: "1", title: "AI趋势研究", updateTime: "18:21" },
 *   { id: "2", title: "市场分析报告", updateTime: "17:30", researchTopic: "分析", researchField: "消费品" },
 *   { id: "3", title: "正在生成...", generating: { progress: 60, estimatedTime: "预计5-10分钟" } },
 * ];
 *
 * <DocumentCardList title="文档列表" cards={cards} onCardClick={(id) => {...}} />
 * ```
 *
 * @public
 */
export const DocumentCardList = React.forwardRef<
  HTMLDivElement,
  DocumentCardListProps
>((props, ref) => {
  const {
    title = "文档列表",
    cards = [],
    onCardClick,
    onCardDownload,
    className,
  } = props;

  return (
    <div ref={ref} className={className}>
      {title && (
        <div
          className={cn(
            "font-[var(--font-family-CN)]",
            "font-[var(--font-weight-600)]",
            "font-size-2",
            "leading-[var(--line-height-2)]",
            "text-[var(--Text-text-primary)]",
            "mb-4",
          )}
        >
          {title}
        </div>
      )}
      <div className="flex flex-col gap-3">
        {cards.map((card) => (
          <DocumentCard
            key={card.id}
            title={card.title}
            updateTime={card.updateTime}
            researchTopic={card.researchTopic}
            researchField={card.researchField}
            researchPeriod={card.researchPeriod}
            icon={card.icon}
            generating={card.generating}
            onClick={
              card.onClick ||
              (onCardClick ? () => onCardClick(card.id) : undefined)
            }
            onDownload={
              card.onDownload ||
              (onCardDownload ? () => onCardDownload(card.id) : undefined)
            }
          />
        ))}
      </div>
    </div>
  );
});
DocumentCardList.displayName = "DocumentCardList";
