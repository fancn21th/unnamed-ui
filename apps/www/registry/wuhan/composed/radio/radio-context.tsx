"use client";

import * as React from "react";

/** Radio 选项值（与 antd Radio 对齐） */
export type RadioValue = string | number | boolean;

/**
 * Radio 组 Context 值类型
 */
export interface RadioGroupContextValue {
  value?: RadioValue;
  onChange?: (value: RadioValue) => void;
  name?: string;
  disabled?: boolean;
}

export const RadioGroupContext = React.createContext<
  RadioGroupContextValue | undefined
>(undefined);

/**
 * 获取 Radio 组 Context
 * 用于在 RadioGroup 的子 Radio 中访问组的状态和配置
 */
export function useRadioGroup() {
  return React.useContext(RadioGroupContext);
}
