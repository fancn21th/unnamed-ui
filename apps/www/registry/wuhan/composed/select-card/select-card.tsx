"use client";

import * as React from "react";
import {
  SelectCardItemPrimitive,
  SelectCardItemIconPrimitive,
} from "@/registry/wuhan/blocks/select-card/select-card-01";
import {
  BlockTooltip,
  BlockTooltipTrigger,
  BlockTooltipContent,
} from "@/registry/wuhan/blocks/tooltip/tooltip-01";

// ==================== 类型定义 ====================

/**
 * 选项配置
 * 基础选项数据结构
 * @public
 */
export interface SelectCardOption {
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
}

/**
 * 卡片选择项属性
 * @public
 */
export interface SelectCardProps {
  /** 选项数据 */
  option: SelectCardOption;
  /** 是否选中状态 */
  selected?: boolean;
  /** 点击事件回调 */
  onClick?: () => void;
}

// ==================== 组件 ====================

/**
 * SelectCard 卡片选择项组件
 * 包含图标、标签和 tooltip 功能
 *
 * @example
 * ```tsx
 * <SelectCard
 *   option={{ value: "btn", label: "按钮", icon: <Icon /> }}
 *   selected={isSelected}
 *   onClick={() => handleClick()}
 * />
 * ```
 *
 * @public
 */
export const SelectCard = React.forwardRef<
  HTMLButtonElement,
  SelectCardProps
>(({ option, selected, onClick }, ref) => {
  return (
    <SelectCardItemPrimitive
      ref={ref}
      key={option.value}
      selected={selected}
      aria-selected={selected}
      disabled={option.disabled}
      onClick={() => !option.disabled && onClick?.()}
    >
      {/* 图标或默认图标 */}
      {option.icon ? (
        <span className="w-4 h-4 shrink-0 flex items-center justify-center">
          {option.icon}
        </span>
      ) : (
        <SelectCardItemIconPrimitive />
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
    </SelectCardItemPrimitive>
  );
});
SelectCard.displayName = "SelectCard";

/**
 * 卡片选择项图标占位符组件
 * 导出用于独立使用
 * @public
 */
export const SelectCardItemIcon = SelectCardItemIconPrimitive;
