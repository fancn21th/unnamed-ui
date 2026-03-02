"use client";

import * as React from "react";
import {
  ToggleButtonPrimitive,
  ToggleButtonGroupPrimitive,
} from "@/registry/wuhan/blocks/toggle-button/toggle-button-01";
import { Tooltip } from "@/registry/wuhan/composed/tooltip/tooltip";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

/**
 * 开关按钮选项
 * @public
 */
export interface ToggleOption {
  /** 选项唯一标识 */
  id: string;
  /** 选项显示文本（兼作 aria-label） */
  label: string;
  /** 图标（设置后仅显示图标，不显示 label） */
  icon?: React.ReactNode;
  /** 悬停提示（设置后由组件内部用 Tooltip 包裹按钮，DOM 结构正确） */
  tooltip?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 单个选项的类名 */
  className?: string;
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
   * 单选模式默认值（非受控）
   */
  defaultValue?: string;

  /**
   * 多选模式默认值（非受控）
   */
  defaultValues?: string[];

  /**
   * 按钮组的 aria-label（无障碍）
   */
  ariaLabel?: string;

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

  /**
   * 自定义选项渲染，可自由包装、组合内容
   * 简单 Tooltip 场景推荐用 option.tooltip
   * @param option - 当前选项
   * @param context - 上下文信息
   * @returns 渲染内容，将作为 ToggleButtonPrimitive 的 children
   */
  renderOption?: (
    option: ToggleOption,
    context: {
      selected: boolean;
      optionId: string;
      disabled?: boolean;
      index: number;
    },
  ) => React.ReactNode;
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
 *
 * // 简单 Tooltip（推荐用 option.tooltip）
 * <ToggleButton
 *   options={[
 *     {
 *       id: "web-search",
 *       label: "联网搜索",
 *       icon: <Globe className="size-4" />,
 *       tooltip: "联网搜索",
 *     },
 *   ]}
 *   value={value}
 *   onChange={setValue}
 *   variant="compact"
 *   className="p-2"
 * />
 * ```
 *
 * @public
 */
export const ToggleButton = React.forwardRef<HTMLDivElement, ToggleButtonProps>(
  (
    {
      options,
      value: valueProp,
      values: valuesProp,
      defaultValue,
      defaultValues,
      onChange,
      onValuesChange,
      multiple = false,
      variant = "default",
      borderless = false,
      className,
      groupClassName,
      ariaLabel,
      renderOption,
    },
    ref,
  ) => {
    // 非受控模式
    const [internalValue, setInternalValue] = React.useState<
      string | undefined
    >(valueProp === undefined ? defaultValue : undefined);
    const [internalValues, setInternalValues] = React.useState<string[]>(
      valuesProp === undefined ? (defaultValues ?? []) : [],
    );

    const isControlled = valueProp !== undefined || valuesProp !== undefined;
    const value = isControlled ? valueProp : internalValue;
    const values = React.useMemo(
      () => (isControlled ? (valuesProp ?? []) : internalValues),
      [isControlled, valuesProp, internalValues],
    );

    // 开发环境校验（兼容 Vite import.meta.env 与 Next.js process.env）
    const isDev =
      (typeof import.meta !== "undefined" &&
        (import.meta as { env?: { DEV?: boolean } }).env?.DEV) ||
      (typeof (globalThis as { process?: { env?: { NODE_ENV?: string } } })
        .process !== "undefined" &&
        (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process
          ?.env?.NODE_ENV === "development");
    if (isDev) {
      if (valueProp !== undefined && valuesProp !== undefined) {
        console.warn(
          "[ToggleButton] 不能同时使用 value 和 values，请根据 multiple 选择其一",
        );
      }
      if (valueProp !== undefined && !multiple) {
        const validIds = options.map((o) => o.id);
        if (valueProp && !validIds.includes(valueProp)) {
          console.warn(
            `[ToggleButton] value "${valueProp}" 不在 options 的 id 列表中`,
          );
        }
      }
      if (valuesProp !== undefined && multiple) {
        const validIds = options.map((o) => o.id);
        const invalid = valuesProp.filter((id) => !validIds.includes(id));
        if (invalid.length > 0) {
          console.warn(
            `[ToggleButton] values 中 ${invalid.join(", ")} 不在 options 的 id 列表中`,
          );
        }
      }
    }

    // 单选模式处理
    const handleSingleClick = React.useCallback(
      (optionId: string) => {
        const nextValue = value === optionId ? undefined : optionId;
        if (!isControlled) setInternalValue(nextValue);
        onChange?.(nextValue);
      },
      [value, onChange, isControlled],
    );

    // 多选模式处理
    const handleMultipleClick = React.useCallback(
      (optionId: string) => {
        const currentValues = values;
        const newValues = currentValues.includes(optionId)
          ? currentValues.filter((id) => id !== optionId)
          : [...currentValues, optionId];
        if (!isControlled) setInternalValues(newValues);
        onValuesChange?.(newValues);
      },
      [values, onValuesChange, isControlled],
    );

    // 判断选项是否选中
    const isSelected = React.useCallback(
      (optionId: string) => {
        if (multiple) {
          return values.includes(optionId);
        }
        return value === optionId;
      },
      [multiple, value, values],
    );

    const renderButton = (option: ToggleOption, index: number) => {
      const selected = isSelected(option.id);
      const content = renderOption
        ? renderOption(option, {
            selected,
            optionId: option.id,
            disabled: option.disabled,
            index,
          })
        : (option.icon ?? option.label);

      const button = (
        <ToggleButtonPrimitive
          key={option.id}
          selected={selected}
          multiple={multiple}
          variant={variant}
          borderless={borderless}
          disabled={option.disabled}
          aria-label={option.label}
          onClick={() => {
            if (option.disabled) return;
            if (multiple) {
              handleMultipleClick(option.id);
            } else {
              handleSingleClick(option.id);
            }
          }}
          className={cn(className, option.className)}
        >
          {content}
        </ToggleButtonPrimitive>
      );

      if (option.tooltip && !renderOption) {
        return (
          <Tooltip key={option.id} content={option.tooltip}>
            {button}
          </Tooltip>
        );
      }

      return button;
    };

    return (
      <ToggleButtonGroupPrimitive
        ref={ref}
        className={cn(groupClassName)}
        role={multiple ? "group" : "radiogroup"}
        aria-label={ariaLabel}
      >
        {options.map((option, index) => renderButton(option, index))}
      </ToggleButtonGroupPrimitive>
    );
  },
);

ToggleButton.displayName = "ToggleButton";
