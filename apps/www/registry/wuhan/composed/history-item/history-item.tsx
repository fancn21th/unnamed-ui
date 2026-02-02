"use client";

import * as React from "react";
import {
  HistoryItemPrimitive,
  HistoryItemTitlePrimitive,
  HistoryItemTrailingPrimitive,
  HistoryItemHoverTrailingPrimitive,
} from "@/registry/wuhan/blocks/history-item/history-item-01";

/**
 * HistoryItem 组件属性接口
 * 用于显示历史记录项，支持选中状态、活动状态和悬停操作
 * @public
 */
export interface HistoryItemProps {
  /** 历史项标题内容 */
  title: React.ReactNode;
  /** 尾部始终显示的内容（如时间、图标等） */
  trailing?: React.ReactNode;
  /** 悬停时显示的尾部内容（如操作按钮） */
  hoverTrailing?: React.ReactNode;
  /** 是否为选中状态 */
  selected?: boolean;
  /** 是否为当前活动项 */
  active?: boolean;
  /** 点击事件处理函数 */
  onClick?: () => void;
  /** 自定义样式类名 */
  className?: string;
}

/**
 * HistoryItem 历史记录项组件
 *
 * 用于显示聊天历史、浏览历史等列表项，支持：
 * - 选中和活动状态的视觉反馈
 * - 悬停时显示/隐藏操作按钮
 * - 完整的无障碍支持（ARIA 属性）
 *
 * @example
 * ```tsx
 * <HistoryItem
 *   title="聊天记录标题"
 *   trailing={<span className="text-xs text-gray-500">2小时前</span>}
 *   hoverTrailing={<button>删除</button>}
 *   selected={true}
 *   onClick={() => console.log("clicked")}
 * />
 * ```
 *
 * @public
 */
export const HistoryItem = React.forwardRef<
  HTMLButtonElement,
  HistoryItemProps
>(
  (
    { title, trailing, hoverTrailing, selected, active, onClick, className },
    ref,
  ) => {
    return (
      <HistoryItemPrimitive
        ref={ref}
        className={className}
        // 数据属性用于 CSS 选择器
        data-selected={selected ? "true" : undefined}
        data-active={active ? "true" : undefined}
        // ARIA 属性用于无障碍访问
        aria-selected={selected}
        aria-current={active ? "page" : undefined}
        onClick={onClick}
      >
        {/* 标题区域 */}
        <HistoryItemTitlePrimitive>{title}</HistoryItemTitlePrimitive>

        {/* 始终显示的尾部内容 */}
        {trailing && (
          <HistoryItemTrailingPrimitive>
            {trailing}
          </HistoryItemTrailingPrimitive>
        )}

        {/* 悬停时显示的尾部内容 */}
        {hoverTrailing && (
          <HistoryItemHoverTrailingPrimitive>
            {hoverTrailing}
          </HistoryItemHoverTrailingPrimitive>
        )}
      </HistoryItemPrimitive>
    );
  },
);
HistoryItem.displayName = "HistoryItem";
