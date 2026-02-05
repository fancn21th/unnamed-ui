"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  CheckboxRootPrimitive,
  CheckboxIndicatorPrimitive,
  CheckboxLabelPrimitive,
} from "@/registry/wuhan/blocks/checkbox/checkbox-01";

//#region Checkbox Types
/**
 * 复选框变更事件对象
 */
export interface CheckboxChangeEvent {
  target: {
    checked: boolean; // 复选框的选中状态
  };
  stopPropagation: () => void;
  preventDefault: () => void;
}

/**
 * 复选框各部分的 className 配置
 */
export interface CheckboxClassNames {
  root?: string; // 复选框根元素的类名
  indicator?: string; // 选中指示器的类名
  label?: string; // 标签的类名
  wrapper?: string; // 外层包装器的类名
}

/**
 * 复选框各部分的内联样式配置
 */
export interface CheckboxStyles {
  root?: React.CSSProperties; // 复选框根元素的样式
  indicator?: React.CSSProperties; // 选中指示器的样式
  label?: React.CSSProperties; // 标签的样式
  wrapper?: React.CSSProperties; // 外层包装器的样式
}

/**
 * 复选框组件属性
 */
export interface CheckboxProps {
  checked?: boolean; // 受控模式下的选中状态
  defaultChecked?: boolean; // 非受控模式下的默认选中状态
  disabled?: boolean; // 是否禁用
  indeterminate?: boolean; // 是否为半选状态（通常用于全选功能）
  children?: React.ReactNode; // 复选框标签内容
  className?: string; // 外层包装器的类名
  classNames?:
    | CheckboxClassNames
    | ((info: { props: CheckboxProps }) => CheckboxClassNames); // 各部分的类名配置，支持对象或函数
  styles?:
    | CheckboxStyles
    | ((info: { props: CheckboxProps }) => CheckboxStyles); // 各部分的样式配置，支持对象或函数
  onChange?: (e: CheckboxChangeEvent) => void; // 选中状态变更时的回调
  onBlur?: () => void; // 失去焦点时的回调
  onFocus?: () => void; // 获得焦点时的回调
  value?: string | number; // 复选框的值（用于表单提交）
  name?: string; // 复选框的 name 属性（用于表单提交）
  id?: string; // 复选框的 id 属性
}
//#endregion

//#region Checkbox Component
/**
 * 复选框组件
 * 支持受控和非受控两种模式，提供丰富的自定义样式选项
 */
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      disabled,
      indeterminate,
      children,
      className,
      classNames: classNamesProp,
      styles: stylesProp,
      onChange,
      onBlur,
      onFocus,
      value,
      name,
      id,
    },
    ref,
  ) => {
    // 非受控模式下的内部状态
    const [internalChecked, setInternalChecked] = React.useState(
      defaultChecked || false,
    );
    // 判断是否为受控模式
    const isControlled = checked !== undefined;
    // 获取当前选中状态（受控模式使用外部状态，非受控模式使用内部状态）
    const checkedValue = isControlled ? checked : internalChecked;

    // 处理 classNames 配置（支持对象或函数）
    const classNames =
      typeof classNamesProp === "function"
        ? classNamesProp({
            props: {
              checked,
              defaultChecked,
              disabled,
              indeterminate,
              children,
              className,
            },
          })
        : classNamesProp;

    // 处理 styles 配置（支持对象或函数）
    const styles =
      typeof stylesProp === "function"
        ? stylesProp({
            props: {
              checked,
              defaultChecked,
              disabled,
              indeterminate,
              children,
              className,
            },
          })
        : stylesProp;

    // 处理选中状态变更
    const handleCheckedChange = (newChecked: boolean) => {
      // 非受控模式下更新内部状态
      if (!isControlled) {
        setInternalChecked(newChecked);
      }

      // 触发 onChange 回调
      if (onChange) {
        const event: CheckboxChangeEvent = {
          target: { checked: newChecked },
          stopPropagation: () => {},
          preventDefault: () => {},
        };
        onChange(event);
      }
    };

    return (
      <div
        className={cn(
          "flex items-center gap-2",
          classNames?.wrapper,
          className,
        )}
        style={styles?.wrapper}
      >
        <CheckboxRootPrimitive
          ref={ref}
          id={id}
          name={name}
          value={value}
          checked={indeterminate ? "indeterminate" : checkedValue}
          onCheckedChange={handleCheckedChange}
          disabled={disabled}
          onBlur={onBlur}
          onFocus={onFocus}
          className={classNames?.root}
          style={styles?.root}
        >
          <CheckboxIndicatorPrimitive
            indeterminate={indeterminate}
            className={classNames?.indicator}
            style={styles?.indicator}
          />
        </CheckboxRootPrimitive>
        {children && (
          <CheckboxLabelPrimitive
            htmlFor={id}
            className={classNames?.label}
            style={styles?.label}
          >
            {children}
          </CheckboxLabelPrimitive>
        )}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
//#endregion

//#region CheckboxGroup Context
/**
 * 复选框组 Context 值类型
 */
interface CheckboxGroupContextValue<T = string | number | boolean> {
  value: T[]; // 当前选中的值数组
  onChange: (value: T, checked: boolean) => void; // 值变更回调
  name?: string; // 表单 name 属性
  disabled?: boolean; // 是否禁用整个组
}

// 创建复选框组 Context
const CheckboxGroupContext = React.createContext<
  CheckboxGroupContextValue<any> | undefined
>(undefined);

/**
 * 获取复选框组 Context
 * 用于在 CheckboxGroup 的子 Checkbox 中访问组的状态和配置
 */
export function useCheckboxGroup<T = string | number | boolean>() {
  return React.useContext(CheckboxGroupContext) as
    | CheckboxGroupContextValue<T>
    | undefined;
}
//#endregion

//#region CheckboxGroup Types
/**
 * 复选框选项配置（用于 options 属性）
 */
export interface CheckboxOption {
  label: React.ReactNode; // 选项显示的标签
  value: string | number; // 选项的值
  disabled?: boolean; // 是否禁用该选项
  title?: string; // 鼠标悬停时显示的提示文本
  className?: string; // 选项的类名
  style?: React.CSSProperties; // 选项的内联样式
}

/**
 * 复选框组组件属性
 */
export interface CheckboxGroupProps<T = string | number | boolean> {
  defaultValue?: T[]; // 非受控模式下的默认选中值数组
  value?: T[]; // 受控模式下的选中值数组
  disabled?: boolean; // 是否禁用整个组
  name?: string; // 表单 name 属性（会传递给所有子复选框）
  options?: (string | number | CheckboxOption)[]; // 选项数组，可以是简单值或 CheckboxOption 对象
  title?: string; // 组的标题
  className?: string; // 组容器的类名
  style?: React.CSSProperties; // 组容器的内联样式
  onChange?: (checkedValues: T[]) => void; // 选中值变更时的回调
  children?: React.ReactNode; // 子元素（使用 children 时不需要 options）
}
//#endregion

//#region CheckboxGroup Component
/**
 * 复选框组组件
 * 支持两种使用方式：
 * 1. 通过 options 属性配置选项列表
 * 2. 通过 children 自定义子复选框（需配合 useCheckboxGroup）
 */
export function CheckboxGroup<T = string | number | boolean>({
  defaultValue = [],
  value: valueProp,
  disabled,
  name,
  options = [],
  title,
  className,
  style,
  onChange,
  children,
}: CheckboxGroupProps<T>) {
  // 非受控模式下的内部状态
  const [internalValue, setInternalValue] = React.useState<T[]>(defaultValue);
  // 判断是否为受控模式
  const isControlled = valueProp !== undefined;
  // 获取当前选中值数组（受控模式使用外部状态，非受控模式使用内部状态）
  const value = (isControlled ? valueProp : internalValue) as T[];

  // 处理单个选项的选中状态变更
  const handleChange = (optionValue: T, checked: boolean) => {
    // 根据选中状态添加或移除值
    const newValue = checked
      ? [...value, optionValue]
      : value.filter((v) => v !== optionValue);

    // 非受控模式下更新内部状态
    if (!isControlled) {
      setInternalValue(newValue);
    }

    // 触发 onChange 回调
    if (onChange) {
      onChange(newValue);
    }
  };

  // 如果提供了 options，渲染选项列表
  if (options.length > 0) {
    return (
      <div className={cn("flex flex-col gap-2", className)} style={style}>
        {title && <div className="text-sm font-medium mb-2">{title}</div>}
        {options.map((option, index) => {
          // 判断选项是对象还是简单值
          const isOptionObject = typeof option === "object";
          // 提取选项值
          const optionValue = (
            isOptionObject ? (option as CheckboxOption).value : option
          ) as T;
          // 提取选项标签
          const optionLabel = isOptionObject
            ? (option as CheckboxOption).label
            : String(option);
          // 提取选项禁用状态
          const optionDisabled = isOptionObject
            ? (option as CheckboxOption).disabled
            : false;
          // 提取选项提示文本
          const optionTitle = isOptionObject
            ? (option as CheckboxOption).title
            : undefined;
          // 提取选项类名
          const optionClassName = isOptionObject
            ? (option as CheckboxOption).className
            : undefined;
          // 提取选项样式
          const optionStyle = isOptionObject
            ? (option as CheckboxOption).style
            : undefined;

          return (
            <Checkbox
              key={String(optionValue) || index}
              name={name}
              value={optionValue as string | number}
              checked={value.includes(optionValue)}
              disabled={disabled || optionDisabled}
              onChange={(e) => handleChange(optionValue, e.target.checked)}
              className={optionClassName}
              styles={{ wrapper: optionStyle }}
            >
              <span title={optionTitle}>{optionLabel}</span>
            </Checkbox>
          );
        })}
      </div>
    );
  }

  // 如果提供了 children，使用 context 传递 value 和 onChange
  return (
    <CheckboxGroupContext.Provider
      value={{ value, onChange: handleChange, name, disabled }}
    >
      <div className={cn("flex flex-col gap-2", className)} style={style}>
        {title && <div className="text-sm font-medium mb-2">{title}</div>}
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}
//#endregion
