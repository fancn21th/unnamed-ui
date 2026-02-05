"use client";

import * as React from "react";
import {
  ComponentPanelListItemPrimitive,
  ComponentPanelListItemIconPrimitive,
} from "@/registry/wuhan/blocks/component-panel/component-panel-01";
import {
  BlockTooltip,
  BlockTooltipTrigger,
  BlockTooltipContent,
} from "@/registry/wuhan/blocks/tooltip/tooltip-01";

// ==================== 类型定义 ====================

/**
 * 组件面板列表项属性
 * @public
 */
export interface ComponentPanelListItemProps {
  /** 选项数据 */
  option: {
    /** 选项的唯一值 */
    value: string;
    /** 选项的显示文本 */
    label: React.ReactNode;
    /** 选项图标 */
    icon?: React.ReactNode;
    /** 选项提示信息 */
    tooltip?: React.ReactNode;
    /** 是否禁用该选项 */
    disabled?: boolean;
  };
  /** 是否选中状态 */
  selected?: boolean;
  /** 点击事件回调 */
  onClick?: () => void;
}

// ==================== 组件 ====================

/**
 * ComponentPanelListItem 组件
 * 组件面板列表项组件，包含图标、标签和 tooltip 功能
 *
 * @example
 * ```tsx
 * <ComponentPanelListItem
 *   option={{ value: "btn", label: "按钮", icon: <Icon /> }}
 *   selected={isSelected}
 *   onClick={() => handleClick()}
 * />
 * ```
 *
 * @public
 */
export const ComponentPanelListItem = React.forwardRef<
  HTMLButtonElement,
  ComponentPanelListItemProps
>(({ option, selected, onClick }, ref) => {
  return (
    <ComponentPanelListItemPrimitive
      ref={ref}
      key={option.value}
      selected={selected}
      aria-selected={selected}
      disabled={option.disabled}
      onClick={() => !option.disabled && onClick?.()}
    >
      {/* 图标或默认图标 */}
      {option.icon ? (
        <span className="w-6 h-6 shrink-0 flex items-center justify-center">
          {option.icon}
        </span>
      ) : (
        <ComponentPanelListItemIconPrimitive />
      )}

      {/* 标签，支持 tooltip */}
      {option.tooltip ? (
        <BlockTooltip>
          <BlockTooltipTrigger asChild>
            <span className="truncate">{option.label}</span>
          </BlockTooltipTrigger>
          <BlockTooltipContent>{option.tooltip}</BlockTooltipContent>
        </BlockTooltip>
      ) : (
        <span className="truncate">{option.label}</span>
      )}
    </ComponentPanelListItemPrimitive>
  );
});
ComponentPanelListItem.displayName = "ComponentPanelListItem";
