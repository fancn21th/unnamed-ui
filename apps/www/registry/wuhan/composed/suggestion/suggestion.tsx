"use client";

import * as React from "react";
import {
  SuggestionButton as SuggestionButtonPrimitive,
  SuggestionGroup as SuggestionGroupPrimitive,
} from "@/registry/wuhan/blocks/suggestion/suggestion-01";

/**
 * 建议项数据接口
 *
 * @public
 */
export interface SuggestionItem {
  /** 唯一标识符，用于 React key */
  id: string;
  /** 建议按钮显示的文本或内容 */
  label: React.ReactNode;
  /** 可选的图标元素 */
  icon?: React.ReactNode;
  /** 点击建议按钮时的回调函数 */
  onClick?: () => void;
}

/**
 * 建议面板组件属性
 *
 * @public
 */
export interface SuggestionPanelProps {
  /** 面板标题，显示在顶部 */
  title?: React.ReactNode;
  /** 面板描述文本，显示在标题下方 */
  description?: React.ReactNode;
  /** 建议项数据数组 */
  items: SuggestionItem[];
  /** 额外的样式类名 */
  className?: string;
}

/**
 * 建议按钮组容器组件
 * 用于包裹多个建议按钮，提供网格布局
 *
 * @public
 */
export const SuggestionGroup = SuggestionGroupPrimitive;

/**
 * 单个建议按钮组件
 * 可独立使用或在 SuggestionGroup 中使用
 *
 * @public
 */
export const SuggestionButton = SuggestionButtonPrimitive;

/**
 * 建议面板组件
 *
 * 数据驱动的建议面板，支持标题、描述和建议按钮列表。
 * 适用于聊天界面的空状态引导、下一步操作建议等场景。
 *
 * @example
 * ```tsx
 * const suggestions = [
 *   { id: "1", label: "开始新对话", icon: <MessageSquare /> },
 *   { id: "2", label: "查看文档", icon: <FileText /> },
 * ];
 *
 * <SuggestionPanel
 *   title="欢迎使用"
 *   description="选择一个建议开始"
 *   items={suggestions}
 * />
 * ```
 *
 * @public
 */
export const SuggestionPanel = React.forwardRef<
  HTMLDivElement,
  SuggestionPanelProps
>(({ title, description, items, className }, ref) => {
  return (
    <div ref={ref} className={className}>
      {/* 标题和描述区域 - 仅在提供了 title 或 description 时显示 */}
      {(title || description) && (
        <div className="text-center mb-6">
          {title && (
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-[var(--text-secondary)]">
              {description}
            </p>
          )}
        </div>
      )}
      {/* 建议按钮组 - 添加 aria-label 提升无障碍性 */}
      <SuggestionGroup aria-label="Suggestions">
        {items.map((item) => (
          <SuggestionButton
            key={item.id}
            icon={item.icon}
            onClick={item.onClick}
          >
            {item.label}
          </SuggestionButton>
        ))}
      </SuggestionGroup>
    </div>
  );
});
SuggestionPanel.displayName = "SuggestionPanel";
