"use client";

import * as React from "react";

/**
 * 复选框组 Context 值类型（运行时用 unknown[] 承载，避免 any）
 */
export type CheckboxGroupContextValue = {
  value: readonly unknown[];
  onChange: (value: unknown, checked: boolean) => void;
  name?: string;
  disabled?: boolean;
};

export const CheckboxGroupContext = React.createContext<
  CheckboxGroupContextValue | undefined
>(undefined);

/**
 * 获取复选框组 Context
 * 用于在 CheckboxGroup 的子 Checkbox 中访问组的状态和配置
 */
export function useCheckboxGroup<T = string | number | boolean>() {
  return React.useContext(CheckboxGroupContext) as
    | {
        value: T[];
        onChange: (value: T, checked: boolean) => void;
        name?: string;
        disabled?: boolean;
      }
    | undefined;
}
