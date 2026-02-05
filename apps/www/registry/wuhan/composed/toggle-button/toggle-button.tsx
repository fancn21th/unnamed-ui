"use client";

import * as React from "react";
import {
  ToggleButtonPrimitive,
  ToggleButtonGroupPrimitive,
} from "@/registry/wuhan/blocks/toggle-button/toggle-button-01";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

/**
 * 开关按钮选项
 * @public
 */
export interface ToggleOption {
  /** 选项唯一标识 */
  id: string;
  /** 选项显示文本 */
  label: string;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 开关按钮组件属性
 * @public
 */
export interface ToggleButtonProps {
  /**
   * 按钮选项列表
   */
  options: ToggleOption[];

  /**
   * 当前选中的选项 ID（单选模式）
   */
  value?: string;

  /**
   * 当前选中的选项 ID 列表（多选模式）
   */
  values?: string[];

  /**
   * 选项变化回调（单选模式）
   * @param value - 新选中的选项 ID，取消选择时为 undefined
   */
  onChange?: (value: string | undefined) => void;

  /**
   * 选项变化回调（多选模式）
   * @param values - 新选中的选项 ID 列表
   */
  onValuesChange?: (values: string[]) => void;

  /**
   * 是否为多选模式
   * @default false
   */
  multiple?: boolean;

  /**
   * 按钮变体样式
   * - "default": 默认样式（用于反馈组件等场景，高度 32px）
   * - "compact": 紧凑样式（用于 sender 组件等场景，高度使用 CSS 变量）
   * @default "default"
   */
  variant?: "default" | "compact";

  /**
   * 是否无边框模式
   * @default false
   */
  borderless?: boolean;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 按钮容器自定义类名
   */
  groupClassName?: string;
}

// ==================== Composed 组件 ====================

/**
 * 开关按钮组件
 *
 * 提供单选和多选模式的开关按钮组，支持两种变体样式。
 * 适用于反馈选项选择、模式切换（如深度思考、联网搜索）等场景。
 *
 * @example
 * ```tsx
 * // 单选模式（反馈场景）
 * const [feedback, setFeedback] = useState<string>();
 * <ToggleButton
 *   options={[
 *     { id: "harmful", label: "有害/不安全" },
 *     { id: "false", label: "信息虚假" },
 *   ]}
 *   value={feedback}
 *   onChange={setFeedback}
 * />
 *
 * // 多选模式（sender 模式切换）
 * const [modes, setModes] = useState<string[]>([]);
 * <ToggleButton
 *   options={[
 *     { id: "web-search", label: "联网搜索" },
 *     { id: "deep-think", label: "深度思考" },
 *   ]}
 *   values={modes}
 *   onValuesChange={setModes}
 *   multiple
 *   variant="compact"
 * />
 * ```
 *
 * @public
 */
export const ToggleButton = React.forwardRef<HTMLDivElement, ToggleButtonProps>(
  (
    {
      options,
      value,
      values,
      onChange,
      onValuesChange,
      multiple = false,
      variant = "default",
      borderless = false,
      className,
      groupClassName,
    },
    ref,
  ) => {
    // 单选模式处理
    const handleSingleClick = React.useCallback(
      (optionId: string) => {
        if (!onChange) return;
        // 点击已选中的选项时取消选择
        onChange(value === optionId ? undefined : optionId);
      },
      [value, onChange],
    );

    // 多选模式处理
    const handleMultipleClick = React.useCallback(
      (optionId: string) => {
        if (!onValuesChange) return;
        const currentValues = values || [];
        const newValues = currentValues.includes(optionId)
          ? currentValues.filter((id) => id !== optionId)
          : [...currentValues, optionId];
        onValuesChange(newValues);
      },
      [values, onValuesChange],
    );

    // 判断选项是否选中
    const isSelected = React.useCallback(
      (optionId: string) => {
        if (multiple) {
          return (values || []).includes(optionId);
        }
        return value === optionId;
      },
      [multiple, value, values],
    );

    return (
      <ToggleButtonGroupPrimitive ref={ref} className={cn(groupClassName)}>
        {options.map((option) => (
          <ToggleButtonPrimitive
            key={option.id}
            selected={isSelected(option.id)}
            multiple={multiple}
            variant={variant}
            borderless={borderless}
            disabled={option.disabled}
            onClick={() => {
              if (option.disabled) return;
              if (multiple) {
                handleMultipleClick(option.id);
              } else {
                handleSingleClick(option.id);
              }
            }}
            className={className}
          >
            {option.label}
          </ToggleButtonPrimitive>
        ))}
      </ToggleButtonGroupPrimitive>
    );
  },
);

ToggleButton.displayName = "ToggleButton";
