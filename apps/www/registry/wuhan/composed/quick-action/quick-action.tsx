"use client";

import * as React from "react";
import {
  QuickActionButton as QuickActionButtonPrimitive,
  QuickActionGroup as QuickActionGroupPrimitive,
  QuickActionIcon as QuickActionIconPrimitive,
} from "@/registry/wuhan/blocks/quick-action/quick-action-01";

/**
 * QuickAction 项数据接口
 * 用于定义单个快捷操作的数据结构
 * @public
 */
export interface QuickActionItem {
  /** 唯一标识符 */
  id: string;
  /** 操作的文本标签 */
  label: React.ReactNode;
  /** 可选的图标元素 */
  icon?: React.ReactNode;
  /** 点击事件处理函数 */
  onClick?: () => void;
}

/**
 * QuickActionPanel 组件属性接口
 * 用于快速创建完整的快捷操作面板
 * @public
 */
export interface QuickActionPanelProps {
  /** 面板标题 */
  title?: React.ReactNode;
  /** 面板描述文本 */
  description?: React.ReactNode;
  /** 快捷操作项列表 */
  items: QuickActionItem[];
  /** 自定义样式类名 */
  className?: string;
}

/**
 * QuickActionGroup 组件
 * 用于包裹多个快捷操作按钮的容器组件
 * @public
 */
export const QuickActionGroup = QuickActionGroupPrimitive;

/**
 * QuickActionButton 组件
 * 单个快捷操作按钮组件
 * @public
 */
export const QuickActionButton = QuickActionButtonPrimitive;

/**
 * QuickActionIcon 组件
 * 快捷操作按钮的图标容器组件
 * @public
 */
export const QuickActionIcon = QuickActionIconPrimitive;

/**
 * QuickActionPanel 组件
 *
 * 用于快速创建完整的快捷操作面板，通过数据驱动的方式渲染多个操作按钮。
 * 适用于欢迎页面、空状态提示、常用操作入口等场景。
 *
 * @example
 * ```tsx
 * const actions = [
 *   {
 *     id: "new-chat",
 *     label: "开始新对话",
 *     icon: <MessageSquare />,
 *     onClick: () => {}
 *   },
 *   {
 *     id: "upload",
 *     label: "上传文件",
 *     icon: <Upload />,
 *     onClick: () => {}
 *   },
 * ];
 *
 * <QuickActionPanel
 *   title="快速开始"
 *   description="选择一个操作开始使用"
 *   items={actions}
 * />
 * ```
 *
 * @public
 */
export const QuickActionPanel = React.forwardRef<
  HTMLDivElement,
  QuickActionPanelProps
>(({ title, description, items, className }, ref) => {
  return (
    <div ref={ref} className={className}>
      {/* 标题和描述区域 */}
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

      {/* 快捷操作按钮组 */}
      <QuickActionGroup aria-label="Quick actions">
        {items.map((item) => (
          <QuickActionButton key={item.id} onClick={item.onClick}>
            {item.icon && <QuickActionIcon>{item.icon}</QuickActionIcon>}
            <span>{item.label}</span>
          </QuickActionButton>
        ))}
      </QuickActionGroup>
    </div>
  );
});
QuickActionPanel.displayName = "QuickActionPanel";
