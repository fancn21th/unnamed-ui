"use client";

import * as React from "react";
import type { ComponentPanelCategory } from "./component-panel-types";

export type {
  ComponentPanelOption,
  ComponentPanelCategory,
} from "./component-panel-types";
import {
  ComponentPanelContainerPrimitive,
  ComponentPanelTabsListPrimitive,
  ComponentPanelTabsTriggerPrimitive,
  ComponentPanelTabsContentPrimitive,
  ComponentPanelListPrimitive,
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
 * 组件面板属性
 * @public
 */
export interface ComponentPanelProps {
  /** 选项卡分类列表 */
  categories: ComponentPanelCategory[];
  /** 选中的选项值数组（受控模式） */
  value?: string[];
  /** 默认选中的选项值数组（非受控模式） */
  defaultValue?: string[];
  /** 选中值变化时的回调 */
  onChange?: (value: string[]) => void;
  /** 当前激活的选项卡（受控模式） */
  activeTab?: string;
  /** 默认激活的选项卡（非受控模式） */
  defaultActiveTab?: string;
  /** 选项卡切换时的回调 */
  onTabChange?: (tab: string) => void;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 自定义样式类名 */
  className?: string;
}

// ==================== 主组件 ====================

/**
 * ComponentPanel 组件
 * 级联选择面板组件，通过选项卡切换分类，在每个分类下选择选项
 *
 * @example
 * ```tsx
 * // 非受控模式
 * <ComponentPanel
 *   categories={[
 *     {
 *       value: "all",
 *       label: "全部",
 *       options: [
 *         { value: "comp1", label: "组件1" },
 *         { value: "comp2", label: "组件2" }
 *       ]
 *     }
 *   ]}
 *   defaultValue={["comp1"]}
 *   onChange={(values) => console.log(values)}
 * />
 *
 * // 受控模式
 * const [selected, setSelected] = useState(["comp1"]);
 * <ComponentPanel
 *   categories={categories}
 *   value={selected}
 *   onChange={setSelected}
 * />
 * ```
 *
 * @public
 */
export const ComponentPanel = React.forwardRef<
  HTMLDivElement,
  ComponentPanelProps
>(
  (
    {
      categories,
      value: controlledValue,
      defaultValue = [],
      onChange,
      activeTab: controlledActiveTab,
      defaultActiveTab,
      onTabChange,
      multiple = true,
      className,
    },
    ref,
  ) => {
    // 选中值状态（受控/非受控）
    const [internalValue, setInternalValue] =
      React.useState<string[]>(defaultValue);
    const selectedValues = controlledValue ?? internalValue;

    // 当前激活的选项卡（受控/非受控）
    const [internalActiveTab, setInternalActiveTab] = React.useState<string>(
      defaultActiveTab ?? categories[0]?.value ?? "",
    );
    const activeTabValue = controlledActiveTab ?? internalActiveTab;

    // 处理选项点击
    const handleOptionClick = React.useCallback(
      (optionValue: string) => {
        let newValues: string[];

        if (multiple) {
          // 多选模式：切换选中状态
          if (selectedValues.includes(optionValue)) {
            newValues = selectedValues.filter((v) => v !== optionValue);
          } else {
            newValues = [...selectedValues, optionValue];
          }
        } else {
          // 单选模式：只保留当前选中的值
          newValues = [optionValue];
        }

        // 更新状态
        if (controlledValue === undefined) {
          setInternalValue(newValues);
        }
        onChange?.(newValues);
      },
      [selectedValues, multiple, controlledValue, onChange],
    );

    // 处理选项卡切换
    const handleTabChange = React.useCallback(
      (tab: string) => {
        // 检查是否禁用
        const category = categories.find((c) => c.value === tab);
        if (category?.disabled) {
          return; // 禁用的选项卡不允许切换
        }

        if (controlledActiveTab === undefined) {
          setInternalActiveTab(tab);
        }
        onTabChange?.(tab);
      },
      [categories, controlledActiveTab, onTabChange],
    );

    return (
      <ComponentPanelContainerPrimitive
        ref={ref}
        className={className}
        value={activeTabValue}
        onValueChange={handleTabChange}
      >
        {/* 选项卡列表 */}
        <ComponentPanelTabsListPrimitive aria-label="Component panel categories">
          {categories.map((category) => (
            <ComponentPanelTabsTriggerPrimitive
              key={category.value}
              value={category.value}
              className={
                category.disabled ? "opacity-50 cursor-not-allowed" : ""
              }
              aria-disabled={category.disabled}
            >
              {category.label}
            </ComponentPanelTabsTriggerPrimitive>
          ))}
        </ComponentPanelTabsListPrimitive>

        {/* 选项卡内容 */}
        {categories.map((category) => (
          <ComponentPanelTabsContentPrimitive
            key={category.value}
            value={category.value}
          >
            <ComponentPanelListPrimitive>
              {category.options.map((option) => {
                const isSelected = selectedValues.includes(option.value);

                return (
                  <ComponentPanelListItemPrimitive
                    key={option.value}
                    selected={isSelected}
                    aria-selected={isSelected}
                    disabled={option.disabled}
                    onClick={() =>
                      !option.disabled && handleOptionClick(option.value)
                    }
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
                        <BlockTooltipContent>
                          {option.tooltip}
                        </BlockTooltipContent>
                      </BlockTooltip>
                    ) : (
                      <span className="truncate">{option.label}</span>
                    )}
                  </ComponentPanelListItemPrimitive>
                );
              })}
            </ComponentPanelListPrimitive>
          </ComponentPanelTabsContentPrimitive>
        ))}
      </ComponentPanelContainerPrimitive>
    );
  },
);
ComponentPanel.displayName = "ComponentPanel";
