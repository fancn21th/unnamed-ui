"use client";

import * as React from "react";
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
import {
  SelectCardItemPrimitive,
  SelectCardItemIconPrimitive,
} from "@/registry/wuhan/blocks/select-card/select-card-01";

// ==================== 类型定义 ====================

/**
 * 选项配置
 * 基础选项数据结构，使用标准的 value/label 格式
 * @public
 */
export interface ComponentPanelOption {
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
 * 选项卡配置
 * 定义一个选项卡分类及其下的所有选项
 * @public
 */
export interface ComponentPanelCategory {
  /** 选项卡的唯一值 */
  value: string;
  /** 选项卡的显示文本 */
  label: React.ReactNode;
  /** 该分类下的选项列表 */
  options: ComponentPanelOption[];
  /** 是否禁用该选项卡 */
  disabled?: boolean;
}

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

// ==================== 工具函数 ====================

/**
 * 从分类列表中提取所有选项
 * @param categories 分类列表
 * @returns 所有选项的数组
 * @public
 */
export function getAllOptions(
  categories: ComponentPanelCategory[],
): ComponentPanelOption[] {
  return categories.flatMap((category) => category.options);
}

/**
 * 根据值获取选项
 * @param categories 分类列表
 * @param value 选项值
 * @returns 对应的选项或 undefined
 * @public
 */
export function getOptionByValueFromCategory(
  categories: ComponentPanelCategory[],
  value: string,
): ComponentPanelOption | undefined {
  for (const category of categories) {
    const option = category.options.find((opt) => opt.value === value);
    if (option) return option;
  }
  return undefined;
}

/**
 * 根据值数组获取选项数组
 * @param categories 分类列表
 * @param values 选项值数组
 * @returns 对应的选项数组
 * @public
 */
export function getOptionsByValuesFromCategory(
  categories: ComponentPanelCategory[],
  values: string[],
): ComponentPanelOption[] {
  return values
    .map((value) => getOptionByValueFromCategory(categories, value))
    .filter((opt): opt is ComponentPanelOption => opt !== undefined);
}
