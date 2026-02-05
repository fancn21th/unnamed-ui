"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  RadioGroupRootPrimitive,
  RadioGroupItemPrimitive,
  RadioGroupIndicatorPrimitive,
  RadioLabelPrimitive,
} from "@/registry/wuhan/blocks/radio/radio-01";

//#region Radio Context
/**
 * Radio 组 Context 值类型
 */
interface RadioGroupContextValue {
  value?: any;
  onChange?: (value: any) => void;
  name?: string;
  disabled?: boolean;
}

// 创建 Radio 组 Context
const RadioGroupContext = React.createContext<
  RadioGroupContextValue | undefined
>(undefined);

/**
 * 获取 Radio 组 Context
 * 用于在 RadioGroup 的子 Radio 中访问组的状态和配置
 */
export function useRadioGroup() {
  return React.useContext(RadioGroupContext);
}
//#endregion

//#region Radio Types
/**
 * Radio 各部分的 className 配置
 */
export interface RadioClassNames {
  root?: string; // 单选框根元素的类名
  indicator?: string; // 选中指示器的类名
  label?: string; // 标签的类名
  wrapper?: string; // 外层包装器的类名
}

/**
 * Radio 各部分的内联样式配置
 */
export interface RadioStyles {
  root?: React.CSSProperties; // 单选框根元素的样式
  indicator?: React.CSSProperties; // 选中指示器的样式
  label?: React.CSSProperties; // 标签的样式
  wrapper?: React.CSSProperties; // 外层包装器的样式
}

/**
 * Radio 组件属性
 */
export interface RadioProps {
  checked?: boolean; // 指定当前是否选中
  defaultChecked?: boolean; // 初始是否选中
  disabled?: boolean; // 禁用 Radio
  children?: React.ReactNode; // Radio 标签内容
  classNames?:
    | RadioClassNames
    | ((info: { props: RadioProps }) => RadioClassNames); // 各部分的类名配置，支持对象或函数
  styles?: RadioStyles | ((info: { props: RadioProps }) => RadioStyles); // 各部分的样式配置，支持对象或函数
  value?: any; // 根据 value 进行比较，判断是否选中
  id?: string; // Radio 的 id 属性
  name?: string; // Radio 的 name 属性
}
//#endregion

//#region Radio Component
/**
 * Radio 单选框组件
 * 通常与 RadioGroup 一起使用，也可以单独使用
 */
export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  (
    {
      checked,
      defaultChecked,
      disabled,
      children,
      classNames: classNamesProp,
      styles: stylesProp,
      value,
      id,
      name,
    },
    ref,
  ) => {
    const groupContext = useRadioGroup();

    // 从 context 或 props 获取配置
    const isDisabled = disabled || groupContext?.disabled;
    const radioName = name || groupContext?.name;
    const isChecked =
      groupContext?.value !== undefined
        ? groupContext.value === value
        : checked;

    // 处理 classNames 配置（支持对象或函数）
    const classNames =
      typeof classNamesProp === "function"
        ? classNamesProp({
            props: {
              checked,
              defaultChecked,
              disabled,
              children,
              value,
              id,
              name,
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
              children,
              value,
              id,
              name,
            },
          })
        : stylesProp;

    const handleClick = () => {
      if (!isDisabled && groupContext?.onChange) {
        groupContext.onChange(value);
      }
    };

    return (
      <div
        className={cn("flex items-center gap-2", classNames?.wrapper)}
        style={styles?.wrapper}
      >
        <RadioGroupItemPrimitive
          ref={ref}
          id={id}
          value={value}
          disabled={isDisabled}
          checked={isChecked}
          onClick={handleClick}
          className={cn("peer", classNames?.root)}
          style={styles?.root}
        >
          <RadioGroupIndicatorPrimitive
            className={classNames?.indicator}
            style={styles?.indicator}
          />
        </RadioGroupItemPrimitive>
        {children && (
          <RadioLabelPrimitive
            htmlFor={id}
            className={classNames?.label}
            style={styles?.label}
          >
            {children}
          </RadioLabelPrimitive>
        )}
      </div>
    );
  },
);
Radio.displayName = "Radio";
//#endregion

//#region RadioGroup Types
/**
 * Radio 选项配置（用于 options 属性）
 */
export interface RadioOptionType {
  label?: React.ReactNode; // 用于作为 Radio 选项展示的文本
  value: string | number | boolean; // 关联 Radio 选项的值
  style?: React.CSSProperties; // 应用到 Radio 选项的 style
  className?: string; // Radio 选项的类名
  disabled?: boolean; // 指定 Radio 选项是否要禁用
  title?: string; // 添加 Title 属性值
  id?: string; // 添加 Radio Id 属性值
  required?: boolean; // 指定 Radio 选项是否必填
}

/**
 * RadioGroup 组件属性
 */
export interface RadioGroupProps {
  block?: boolean; // 将 RadioGroup 宽度调整为其父宽度的选项
  buttonStyle?: "outline" | "solid"; // RadioButton 的风格样式
  classNames?:
    | RadioClassNames
    | ((info: { props: RadioGroupProps }) => RadioClassNames); // 各部分的类名配置，支持对象或函数
  defaultValue?: any; // 默认选中的值
  disabled?: boolean; // 禁选所有子单选器
  name?: string; // RadioGroup 下所有 input[type="radio"] 的 name 属性
  options?: (string | number | RadioOptionType)[]; // 以配置形式设置子元素
  optionType?: "default" | "button"; // 用于设置 Radio options 类型
  orientation?: "horizontal" | "vertical"; // 排列方向
  size?: "large" | "middle" | "small"; // 大小，只对按钮样式生效
  styles?: RadioStyles | ((info: { props: RadioGroupProps }) => RadioStyles); // 各部分的样式配置，支持对象或函数
  value?: any; // 用于设置当前选中的值
  vertical?: boolean; // 值为 true，Radio Group 为垂直方向
  onChange?: (value: any) => void; // 选项变化时的回调函数
  children?: React.ReactNode; // 子元素
  className?: string; // 组容器的类名
  style?: React.CSSProperties; // 组容器的内联样式
  title?: string; // 组的标题
}
//#endregion

//#region RadioGroup Component
/**
 * RadioGroup 单选框组组件
 * 支持两种使用方式：
 * 1. 通过 options 属性配置选项列表
 * 2. 通过 children 自定义子单选框（需配合 useRadioGroup）
 */
export function RadioGroup({
  block = false,
  buttonStyle = "outline",
  classNames: classNamesProp,
  defaultValue,
  disabled = false,
  name,
  options = [],
  optionType = "default",
  orientation = "horizontal",
  size = "middle",
  styles: stylesProp,
  value: valueProp,
  vertical = false,
  onChange,
  children,
  className,
  style,
  title,
}: RadioGroupProps) {
  // 非受控模式下的内部状态
  const [internalValue, setInternalValue] = React.useState<any>(defaultValue);
  // 判断是否为受控模式
  const isControlled = valueProp !== undefined;
  // 获取当前选中值（受控模式使用外部状态，非受控模式使用内部状态）
  const value = isControlled ? valueProp : internalValue;

  // 处理选中值变更
  const handleChange = (newValue: any) => {
    // 非受控模式下更新内部状态
    if (!isControlled) {
      setInternalValue(newValue);
    }

    // 触发 onChange 回调
    if (onChange) {
      onChange(newValue);
    }
  };

  // 确定最终的排列方向
  const finalOrientation =
    orientation || (vertical ? "vertical" : "horizontal");

  // 处理 classNames 配置（支持对象或函数）
  const classNames =
    typeof classNamesProp === "function"
      ? classNamesProp({
          props: {
            block,
            buttonStyle,
            defaultValue,
            disabled,
            name,
            options,
            optionType,
            orientation,
            size,
            value: valueProp,
            vertical,
            onChange,
            children,
            className,
            style,
            title,
          },
        })
      : classNamesProp;

  // 处理 styles 配置（支持对象或函数）
  const styles =
    typeof stylesProp === "function"
      ? stylesProp({
          props: {
            block,
            buttonStyle,
            defaultValue,
            disabled,
            name,
            options,
            optionType,
            orientation,
            size,
            value: valueProp,
            vertical,
            onChange,
            children,
            className,
            style,
            title,
          },
        })
      : stylesProp;

  // 如果提供了 options，渲染选项列表
  if (options.length > 0) {
    return (
      <div className={cn(block && "w-full")}>
        {title && <div className="text-sm font-medium mb-2">{title}</div>}
        <RadioGroupContext.Provider
          value={{ value, onChange: handleChange, name, disabled }}
        >
          <RadioGroupRootPrimitive
            value={value}
            onValueChange={handleChange}
            disabled={disabled}
            name={name}
            className={cn(
              "flex gap-4",
              finalOrientation === "vertical" ? "flex-col" : "flex-row",
              className,
            )}
            style={style}
          >
            {options.map((option, index) => {
              // 判断选项是对象还是简单值
              const isOptionObject = typeof option === "object";
              // 提取选项值
              const optionValue = isOptionObject
                ? (option as RadioOptionType).value
                : option;
              // 提取选项标签
              const optionLabel = isOptionObject
                ? (option as RadioOptionType).label
                : String(option);
              // 提取选项禁用状态
              const optionDisabled = isOptionObject
                ? (option as RadioOptionType).disabled
                : false;
              // 提取选项提示文本
              const optionTitle = isOptionObject
                ? (option as RadioOptionType).title
                : undefined;
              // 提取选项类名
              const optionClassName = isOptionObject
                ? (option as RadioOptionType).className
                : undefined;
              // 提取选项样式
              const optionStyle = isOptionObject
                ? (option as RadioOptionType).style
                : undefined;
              // 提取选项 ID
              const optionId = isOptionObject
                ? (option as RadioOptionType).id
                : undefined;

              return (
                <Radio
                  key={optionId || String(optionValue) || index}
                  value={optionValue}
                  disabled={disabled || optionDisabled}
                  id={optionId}
                  classNames={{ wrapper: optionClassName }}
                  styles={{ wrapper: optionStyle }}
                >
                  <span title={optionTitle}>{optionLabel}</span>
                </Radio>
              );
            })}
          </RadioGroupRootPrimitive>
        </RadioGroupContext.Provider>
      </div>
    );
  }

  // 如果提供了 children，使用 context 传递 value 和 onChange
  return (
    <div className={cn(block && "w-full")}>
      {title && <div className="text-sm font-medium mb-2">{title}</div>}
      <RadioGroupContext.Provider
        value={{ value, onChange: handleChange, name, disabled }}
      >
        <RadioGroupRootPrimitive
          value={value}
          onValueChange={handleChange}
          disabled={disabled}
          name={name}
          className={cn(
            "flex gap-4",
            finalOrientation === "vertical" ? "flex-col" : "flex-row",
            className,
          )}
          style={style}
        >
          {children}
        </RadioGroupRootPrimitive>
      </RadioGroupContext.Provider>
    </div>
  );
}
//#endregion
