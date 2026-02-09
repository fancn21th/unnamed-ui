"use client";

import * as React from "react";
import {
  BlockInputContainerPrimitive,
  BlockInputPrefixPrimitive,
  BlockInputSuffixPrimitive,
  BlockInputPrimitive,
  BlockTextareaPrimitive,
} from "@/registry/wuhan/blocks/block-input/block-input-01";
import { cn } from "@/lib/utils";

/**
 * 输入框组件的属性
 */
export interface BlockInputProps {
  /** 输入框的值 */
  value?: string;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 占位符文本 */
  placeholder?: string;
  /** 前缀图标或元素 */
  prefix?: React.ReactNode;
  /** 后缀图标或元素 */
  suffix?: React.ReactNode;
  /** 是否为多行输入 */
  multiline?: boolean;
  /** 多行输入的行数 */
  rows?: number;
  /** 是否为危险状态（错误） */
  danger?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为全圆角 */
  fullRounded?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 输入框的类名 */
  inputClassName?: string;
  /** 自动聚焦 */
  autoFocus?: boolean;
  /** 最大长度 */
  maxLength?: number;
  /** 输入类型（仅单行输入有效） */
  type?: string;
  /** 失焦回调 */
  onBlur?: () => void;
  /** 聚焦回调 */
  onFocus?: () => void;
  /** 键盘按下回调 */
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

/**
 * 输入框组件
 * 支持单行和多行输入模式，提供前后缀图标，支持多种状态样式
 */
export const BlockInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  BlockInputProps
>(
  (
    {
      value,
      onChange,
      placeholder,
      prefix,
      suffix,
      multiline = false,
      rows = 3,
      danger = false,
      disabled = false,
      fullRounded = false,
      className,
      inputClassName,
      autoFocus,
      maxLength,
      type = "text",
      onBlur,
      onFocus,
      onKeyDown,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      onChange?.(e.target.value);
    };

    const handleFocus = () => {
      setIsFocused(true);
      onFocus?.();
    };

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    return (
      <BlockInputContainerPrimitive
        danger={danger}
        disabled={disabled}
        fullRounded={fullRounded}
        isFocused={isFocused}
        className={cn(!multiline ? "h-[var(--size-com-md)]" : "", className)}
      >
        {prefix && (
          <BlockInputPrefixPrimitive>{prefix}</BlockInputPrefixPrimitive>
        )}

        {multiline ? (
          <BlockTextareaPrimitive
            ref={ref as React.Ref<HTMLTextAreaElement>}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={inputClassName}
            autoFocus={autoFocus}
            maxLength={maxLength}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
          />
        ) : (
          <BlockInputPrimitive
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClassName}
            autoFocus={autoFocus}
            maxLength={maxLength}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
          />
        )}

        {suffix && (
          <BlockInputSuffixPrimitive>{suffix}</BlockInputSuffixPrimitive>
        )}
      </BlockInputContainerPrimitive>
    );
  },
);

BlockInput.displayName = "BlockInput";
