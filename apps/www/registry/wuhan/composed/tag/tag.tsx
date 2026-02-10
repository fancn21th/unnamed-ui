"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import {
  TagContainerPrimitive,
  TagPrefixIconPrimitive,
  TagTextPrimitive,
  TagCloseButtonPrimitive,
  CheckableTagContainerPrimitive,
  CheckableTagIconPrimitive,
  CheckableTagTextPrimitive,
  type TagVariant,
  type TagTheme,
} from "@/registry/wuhan/blocks/tag/tag-01";

/**
 * Tag 组件的属性
 */
export interface TagProps {
  /** 标签文本 */
  children?: React.ReactNode;
  /** 变体 */
  variant?: TagVariant;
  /** 主题 */
  theme?: TagTheme;
  /** 前缀图标 */
  prefixIcon?: React.ReactNode;
  /** 是否可关闭 */
  closeable?: boolean;
  /** 关闭图标 */
  closeIcon?: React.ReactNode;
  /** 关闭回调 */
  onClose?: () => void;
  /** 是否为添加模式 */
  addable?: boolean;
  /** 添加模式的默认文本 */
  addText?: string;
  /** 点击添加模式标签的回调 */
  onAdd?: () => void;
  /** 自定义类名 */
  className?: string;
}

/**
 * Tag 组件
 * 支持多种变体、主题、可关闭和添加模式
 */
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      children,
      variant = "default",
      theme = "brand",
      prefixIcon,
      closeable = false,
      closeIcon,
      onClose,
      addable = false,
      addText = "添加标签",
      onAdd,
      className,
    },
    ref,
  ) => {
    const [visible, setVisible] = React.useState(true);

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      setVisible(false);
      onClose?.();
    };

    const handleAdd = () => {
      onAdd?.();
    };

    if (!visible) {
      return null;
    }

    return (
      <TagContainerPrimitive
        ref={ref}
        variant={variant}
        theme={theme}
        addable={addable}
        className={className}
        onClick={addable ? handleAdd : undefined}
      >
        {/* 前缀图标 */}
        {(prefixIcon || addable) && (
          <TagPrefixIconPrimitive>
            {addable ? <Plus className="h-3.5 w-3.5" /> : prefixIcon}
          </TagPrefixIconPrimitive>
        )}

        {/* 文本 */}
        <TagTextPrimitive>{addable ? addText : children}</TagTextPrimitive>

        {/* 关闭按钮 */}
        {closeable && !addable && (
          <TagCloseButtonPrimitive
            closeIcon={closeIcon}
            onClick={handleClose}
          />
        )}
      </TagContainerPrimitive>
    );
  },
);

Tag.displayName = "Tag";
/**
 * CheckableTag 组件的属性
 */
export interface CheckableTagProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  /** 标签文本 */
  children?: React.ReactNode;
  /** 是否选中 */
  checked?: boolean;
  /** 图标 */
  icon?: React.ReactNode;
  /** 选中状态变化回调 */
  onChange?: (checked: boolean) => void;
}

/**
 * CheckableTag 组件
 * 可选中的标签组件
 */
export const CheckableTag = React.forwardRef<
  HTMLButtonElement,
  CheckableTagProps
>(
  (
    {
      children,
      checked = false,
      icon,
      onChange,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const handleClick = () => {
      if (!disabled) {
        onChange?.(!checked);
      }
    };

    return (
      <CheckableTagContainerPrimitive
        ref={ref}
        checked={checked}
        disabled={disabled}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {/* 图标 */}
        {icon && <CheckableTagIconPrimitive>{icon}</CheckableTagIconPrimitive>}

        {/* 文本 */}
        <CheckableTagTextPrimitive>{children}</CheckableTagTextPrimitive>
      </CheckableTagContainerPrimitive>
    );
  },
);

CheckableTag.displayName = "CheckableTag";

/**
 * CheckableTagGroup 语义化 DOM 类型
 */
type CheckableTagGroupSemanticDOM = "root" | "tag";

/**
 * 选项配置类型
 */
type CheckableTagOption = {
  label: React.ReactNode;
  value: string | number;
};

/**
 * CheckableTagGroup 组件的属性
 */
export interface CheckableTagGroupProps {
  /** 选项列表 */
  options?: CheckableTagOption[];
  /** 是否多选 */
  multiple?: boolean;
  /** 选中值（受控） */
  value?: string | number | Array<string | number> | null;
  /** 初始选中值（非受控） */
  defaultValue?: string | number | Array<string | number> | null;
  /** 是否禁用 */
  disabled?: boolean;
  /** 选中状态变化回调 */
  onChange?: (value: string | number | Array<string | number> | null) => void;
  /** 自定义类名 */
  classNames?:
    | Record<CheckableTagGroupSemanticDOM, string>
    | ((info: {
        props: CheckableTagGroupProps;
      }) => Record<CheckableTagGroupSemanticDOM, string>);
  /** 自定义样式 */
  styles?:
    | Record<CheckableTagGroupSemanticDOM, React.CSSProperties>
    | ((info: {
        props: CheckableTagGroupProps;
      }) => Record<CheckableTagGroupSemanticDOM, React.CSSProperties>);
}

/**
 * CheckableTagGroup 组件
 * 可选中标签组，支持单选和多选
 */
export const CheckableTagGroup = React.forwardRef<
  HTMLDivElement,
  CheckableTagGroupProps
>(
  (
    {
      options = [],
      multiple = false,
      value: controlledValue,
      defaultValue,
      disabled = false,
      onChange,
      classNames,
      styles,
    },
    ref,
  ) => {
    // 非受控状态
    const [internalValue, setInternalValue] = React.useState<
      string | number | Array<string | number> | null
    >(defaultValue ?? (multiple ? [] : null));

    // 使用受控值或内部值
    const currentValue =
      controlledValue !== undefined ? controlledValue : internalValue;

    // 解析类名和样式
    const resolvedClassNames =
      typeof classNames === "function"
        ? classNames({
            props: {
              options,
              multiple,
              value: controlledValue,
              defaultValue,
              disabled,
              onChange,
              classNames,
              styles,
            },
          })
        : classNames;

    const resolvedStyles =
      typeof styles === "function"
        ? styles({
            props: {
              options,
              multiple,
              value: controlledValue,
              defaultValue,
              disabled,
              onChange,
              classNames,
              styles,
            },
          })
        : styles;

    // 检查是否选中
    const isChecked = (optionValue: string | number): boolean => {
      if (currentValue === null) return false;
      if (multiple) {
        return (
          Array.isArray(currentValue) && currentValue.includes(optionValue)
        );
      }
      return currentValue === optionValue;
    };

    // 处理点击
    const handleChange = (optionValue: string | number) => {
      if (disabled) return;

      let newValue: string | number | Array<string | number> | null;

      if (multiple) {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        if (currentArray.includes(optionValue)) {
          // 取消选中
          newValue = currentArray.filter((v) => v !== optionValue);
          if (newValue.length === 0) newValue = [];
        } else {
          // 选中
          newValue = [...currentArray, optionValue];
        }
      } else {
        // 单选模式
        if (currentValue === optionValue) {
          // 取消选中
          newValue = null;
        } else {
          // 选中
          newValue = optionValue;
        }
      }

      // 更新状态
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <div
        ref={ref}
        className={resolvedClassNames?.root}
        style={resolvedStyles?.root}
      >
        {options.map((option) => (
          <CheckableTag
            key={option.value}
            checked={isChecked(option.value)}
            disabled={disabled}
            onChange={() => handleChange(option.value)}
            className={resolvedClassNames?.tag}
            style={resolvedStyles?.tag}
          >
            {option.label}
          </CheckableTag>
        ))}
      </div>
    );
  },
);

CheckableTagGroup.displayName = "CheckableTagGroup";
