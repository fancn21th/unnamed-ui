"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Select } from "radix-ui";
import { ChevronDown, X } from "lucide-react";
import {
  SelectTriggerPrimitive,
  SelectIconPrimitive,
  SelectContentPrimitive,
  SelectItemPrimitive,
  SelectLabelPrimitive,
  SelectSeparatorPrimitive,
  SelectValuePrimitive,
  SelectGroupPrimitive,
} from "@/registry/wuhan/blocks/block-select/block-select-01";
import { Checkbox } from "@/registry/wuhan/composed/checkbox/checkbox";

//#region Tag Component
/**
 * 简单的 Tag 组件
 * 用于在多选模式下展示选中项
 */
interface TagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ label, onRemove, className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1",
        "px-2 py-0.5",
        "rounded-[var(--radius-sm)]",
        "bg-[var(--bg-brand-subtle)]",
        "text-[var(--text-brand)]",
        "text-xs font-medium",
        className,
      )}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:bg-[var(--bg-brand-subtle-hover)] rounded-sm p-0.5"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};
//#endregion

//#region BlockSelect Types
/**
 * Select 选项配置
 */
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/**
 * BlockSelect 组件属性
 */
export interface BlockSelectProps {
  // 基础属性
  value?: string | string[]; // 单选为 string，多选为 string[]
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;

  // 选项
  options?: SelectOption[];
  placeholder?: string;

  // 样式定制
  triggerClassName?: string;
  contentClassName?: string;
  fullRounded?: boolean; // 圆角百分之百

  // Icon 配置
  icon?: React.ReactNode; // 自定义 icon
  iconPosition?: "prefix" | "suffix"; // icon 位置

  // 多选配置
  multiple?: boolean; // 是否多选

  // 透传 Radix UI Select 属性
  disabled?: boolean;
  name?: string;
  required?: boolean;
  dir?: "ltr" | "rtl";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Content 位置
  position?: "item-aligned" | "popper";
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";

  // 子元素（用于高级用法）
  children?: React.ReactNode;
}
//#endregion

//#region BlockSelect Component
/**
 * BlockSelect 组合组件
 * 支持单选/多选、icon 位置切换、圆角控制等功能
 */
export const BlockSelect = React.forwardRef<HTMLDivElement, BlockSelectProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      options = [],
      placeholder = "请选择...",
      triggerClassName,
      contentClassName,
      fullRounded = false,
      icon,
      iconPosition = "suffix",
      multiple = false,
      disabled = false,
      name,
      required,
      dir,
      open,
      onOpenChange,
      position = "popper",
      side,
      align,
      children,
      ...props
    },
    ref,
  ) => {
    // 多选模式下的状态管理
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
      multiple && Array.isArray(defaultValue) ? defaultValue : [],
    );

    // 单选模式的当前值
    const currentValue = multiple
      ? undefined
      : (value as string) || (defaultValue as string);

    // 处理多选值变更
    const handleMultipleValueChange = (optionValue: string) => {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];

      setSelectedValues(newValues);
      onValueChange?.(newValues);
    };

    // 处理移除 tag
    const handleRemoveTag = (valueToRemove: string) => {
      const newValues = selectedValues.filter((v) => v !== valueToRemove);
      setSelectedValues(newValues);
      onValueChange?.(newValues);
    };

    // 获取选中项的标签
    const getSelectedLabels = () => {
      return selectedValues
        .map((v) => options.find((opt) => opt.value === v)?.label)
        .filter(Boolean);
    };

    // 渲染 Icon
    const renderIcon = () => {
      return icon || <ChevronDown className="h-4 w-4 opacity-50" />;
    };

    // 单选模式
    if (!multiple) {
      return (
        <Select.Root
          value={currentValue}
          onValueChange={(val) => onValueChange?.(val)}
          defaultValue={defaultValue as string}
          disabled={disabled}
          name={name}
          required={required}
          dir={dir}
          open={open}
          onOpenChange={onOpenChange}
          {...props}
        >
          <SelectTriggerPrimitive
            className={cn(fullRounded && "rounded-full", triggerClassName)}
          >
            {iconPosition === "prefix" && (
              <SelectIconPrimitive asChild>
                <span className="mr-2">{renderIcon()}</span>
              </SelectIconPrimitive>
            )}

            <SelectValuePrimitive placeholder={placeholder} />

            {iconPosition === "suffix" && (
              <SelectIconPrimitive>{renderIcon()}</SelectIconPrimitive>
            )}
          </SelectTriggerPrimitive>

          <SelectContentPrimitive
            position={position}
            side={side}
            align={align}
            className={contentClassName}
          >
            {children ||
              options.map((option) => (
                <SelectItemPrimitive
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItemPrimitive>
              ))}
          </SelectContentPrimitive>
        </Select.Root>
      );
    }

    // 多选模式
    return (
      <div className="relative">
        <div
          className={cn(
            "h-[var(--size-com-md)] min-w-[200px]",
            fullRounded ? "rounded-full" : "rounded-[var(--radius-md)]",
            "border border-[var(--border-neutral)] bg-[var(--bg-container)]",
            "flex items-center gap-2",
            "px-[var(--padding-com-md)] py-[5px]",
            "cursor-pointer",
            "hover:border-[var(--border-brand)]",
            "transition-all duration-300",
            disabled &&
              "cursor-not-allowed opacity-50 bg-[var(--bg-container-disable)]",
            triggerClassName,
          )}
          onClick={() => !disabled && onOpenChange?.(!open)}
        >
          {iconPosition === "prefix" && (
            <span className="flex-shrink-0">{renderIcon()}</span>
          )}

          <div className="flex-1 flex flex-wrap gap-1 items-center overflow-hidden">
            {selectedValues.length > 0 ? (
              getSelectedLabels().map((label, index) => (
                <Tag
                  key={selectedValues[index]}
                  label={label!}
                  onRemove={() => handleRemoveTag(selectedValues[index])}
                />
              ))
            ) : (
              <span className="text-[var(--text-placeholder)]">
                {placeholder}
              </span>
            )}
          </div>

          {iconPosition === "suffix" && (
            <span className="flex-shrink-0">{renderIcon()}</span>
          )}
        </div>

        {/* 多选下拉菜单 */}
        {open && (
          <div
            className={cn(
              "absolute z-50 mt-1 w-full",
              "rounded-[var(--radius-md)]",
              "border border-[var(--border-neutral)]",
              "bg-[var(--bg-container)]",
              "shadow-md p-1",
              contentClassName,
            )}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5",
                  "rounded-[var(--radius-sm)]",
                  "cursor-pointer",
                  "hover:bg-[var(--bg-item-hover)]",
                  option.disabled && "opacity-50 cursor-not-allowed",
                )}
                onClick={() =>
                  !option.disabled && handleMultipleValueChange(option.value)
                }
              >
                <Checkbox
                  checked={selectedValues.includes(option.value)}
                  disabled={option.disabled}
                  onChange={() =>
                    !option.disabled && handleMultipleValueChange(option.value)
                  }
                />
                <span className="text-sm">{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);
BlockSelect.displayName = "BlockSelect";
//#endregion

// 导出子组件供高级用法
export {
  SelectGroupPrimitive as SelectGroup,
  SelectLabelPrimitive as SelectLabel,
  SelectSeparatorPrimitive as SelectSeparator,
  SelectItemPrimitive as SelectItem,
  SelectContentPrimitive as SelectContent,
  SelectTriggerPrimitive as SelectTrigger,
  SelectValuePrimitive as SelectValue,
};
