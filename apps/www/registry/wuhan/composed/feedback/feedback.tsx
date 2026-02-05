"use client";

import * as React from "react";
import {
  FeedbackContainerPrimitive,
  FeedbackHeaderPrimitive,
  FeedbackInputContainerPrimitive,
  FeedbackInputPrimitive,
  FeedbackSubmitButtonPrimitive,
} from "@/registry/wuhan/blocks/feedback/feedback-01";
import {
  ToggleButtonGroupPrimitive,
  ToggleButtonPrimitive,
} from "@/registry/wuhan/blocks/toggle-button/toggle-button-01";

/**
 * 反馈选项接口
 * 定义单个反馈选项的结构
 * @public
 */
export interface FeedbackOption {
  /** 选项的唯一标识符 */
  id: string;
  /** 选项显示的标签，可以是文本或任意 React 节点 */
  label: React.ReactNode;
}

/**
 * Feedback 组件属性接口
 * 用于创建完整的反馈表单，包含标题、选项、输入框和提交按钮
 * @public
 */
export interface FeedbackProps {
  /** 反馈表单标题 */
  title?: React.ReactNode;
  /** 反馈选项列表，用户可以选择其中一个或多个 */
  options: FeedbackOption[];
  /** 是否支持多选模式，默认为 true */
  multiple?: boolean;
  /** 受控模式：当前选中的选项 ID（单选模式） */
  selectedId?: string;
  /** 受控模式：当前选中的选项 ID 列表（多选模式） */
  selectedIds?: string[];
  /** 非受控模式：默认选中的选项 ID */
  defaultSelectedId?: string;
  /** 非受控模式：默认选中的选项 ID 列表 */
  defaultSelectedIds?: string[];
  /** 单选模式：选项选择变化时的回调函数 */
  onSelect?: (id: string) => void;
  /** 多选模式：选项选择变化时的回调函数 */
  onSelectChange?: (ids: string[]) => void;
  /** 受控模式：输入框的当前值 */
  inputValue?: string;
  /** 非受控模式：输入框的默认值 */
  defaultInputValue?: string;
  /** 输入框内容变化时的回调函数 */
  onInputChange?: (value: string) => void;
  /** 输入框占位符文本 */
  placeholder?: string;
  /** 提交按钮显示的标签 */
  submitLabel?: React.ReactNode;
  /** 表单提交时的回调函数 */
  onSubmit?: (payload: {
    selectedId: string;
    selectedIds: string[];
    inputValue: string;
  }) => void;
  /** 关闭按钮点击时的回调函数 */
  onClose?: () => void;
}

/**
 * Feedback 反馈表单组合组件
 *
 * 提供完整的反馈收集界面，包含：
 * - 反馈选项按钮组（使用 ToggleButton）
 * - 详细描述输入框
 * - 提交按钮
 * - 关闭功能
 *
 * 支持单选和多选两种模式，默认为多选模式
 *
 * @example
 * ```tsx
 * // 多选模式（默认）
 * <FeedbackComposed
 *   options={[
 *     { id: "harmful", label: "有害/不安全" },
 *     { id: "false", label: "信息虚假" },
 *     { id: "other", label: "其他" }
 *   ]}
 *   onSubmit={(data) => console.log(data.selectedIds)}
 * />
 *
 * // 单选模式
 * <FeedbackComposed
 *   multiple={false}
 *   title="有什么问题?"
 *   options={[
 *     { id: "harmful", label: "有害/不安全" },
 *     { id: "false", label: "信息虚假" }
 *   ]}
 *   onSubmit={(data) => console.log(data.selectedId)}
 * />
 * ```
 *
 * @public
 */
export const FeedbackComposed = React.forwardRef<
  HTMLFormElement,
  FeedbackProps
>(
  (
    {
      title = "有什么问题?",
      options,
      multiple = true,
      selectedId,
      selectedIds,
      defaultSelectedId = "",
      defaultSelectedIds = [],
      onSelect,
      onSelectChange,
      inputValue,
      defaultInputValue = "",
      onInputChange,
      placeholder = "请输入详细描述...",
      submitLabel = "提交",
      onSubmit,
      onClose,
    },
    ref,
  ) => {
    // 内部状态：用于非受控模式
    const [localSelected, setLocalSelected] = React.useState(defaultSelectedId);
    const [localSelectedIds, setLocalSelectedIds] =
      React.useState(defaultSelectedIds);
    const [localInput, setLocalInput] = React.useState(defaultInputValue);

    // 当前值：优先使用受控模式的值，否则使用内部状态
    const currentSelected = multiple
      ? undefined
      : (selectedId ?? localSelected);
    const currentSelectedIds = multiple
      ? (selectedIds ?? localSelectedIds)
      : [];
    const currentInput = inputValue ?? localInput;

    // 判断选项是否选中
    const isSelected = React.useCallback(
      (id: string) => {
        if (multiple) {
          return currentSelectedIds.includes(id);
        }
        return currentSelected === id;
      },
      [multiple, currentSelected, currentSelectedIds],
    );

    // 选项选择处理函数
    const handleSelect = React.useCallback(
      (id: string) => {
        if (multiple) {
          // 多选模式
          const newIds = currentSelectedIds.includes(id)
            ? currentSelectedIds.filter((i) => i !== id)
            : [...currentSelectedIds, id];
          setLocalSelectedIds(newIds);
          onSelectChange?.(newIds);
        } else {
          // 单选模式
          const newId = currentSelected === id ? "" : id;
          setLocalSelected(newId);
          onSelect?.(id);
        }
      },
      [multiple, currentSelected, currentSelectedIds, onSelect, onSelectChange],
    );

    // 输入框变化处理函数
    const handleInputChange = React.useCallback(
      (value: string) => {
        setLocalInput(value);
        onInputChange?.(value);
      },
      [onInputChange],
    );

    // 表单提交处理函数
    const handleSubmit = React.useCallback(
      (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit?.({
          selectedId: currentSelected ?? "",
          selectedIds: currentSelectedIds,
          inputValue: currentInput,
        });
      },
      [currentSelected, currentSelectedIds, currentInput, onSubmit],
    );

    return (
      <form ref={ref} onSubmit={handleSubmit} aria-label="Feedback form">
        <FeedbackContainerPrimitive onClose={onClose}>
          {/* 反馈表单头部：标题 + 关闭按钮 */}
          <FeedbackHeaderPrimitive title={title} onClose={onClose} />

          {/* 反馈选项按钮组 */}
          <ToggleButtonGroupPrimitive>
            {options.map((option) => (
              <ToggleButtonPrimitive
                key={option.id}
                selected={isSelected(option.id)}
                multiple={multiple}
                onClick={() => handleSelect(option.id)}
                variant="default"
              >
                {option.label}
              </ToggleButtonPrimitive>
            ))}
          </ToggleButtonGroupPrimitive>

          {/* 详细描述输入框 */}
          <FeedbackInputContainerPrimitive>
            <FeedbackInputPrimitive
              placeholder={placeholder}
              value={currentInput}
              onChange={(event) => handleInputChange(event.target.value)}
            />
          </FeedbackInputContainerPrimitive>

          {/* 提交按钮 */}
          <div>
            <FeedbackSubmitButtonPrimitive type="submit">
              {submitLabel}
            </FeedbackSubmitButtonPrimitive>
          </div>
        </FeedbackContainerPrimitive>
      </form>
    );
  },
);
FeedbackComposed.displayName = "FeedbackComposed";

/**
 * 反馈输入框组件
 * 导出用于独立使用
 * @public
 */
export const FeedbackInput = FeedbackInputPrimitive;

/**
 * 反馈输入框容器组件
 * 导出用于独立使用
 * @public
 */
export const FeedbackInputContainer = FeedbackInputContainerPrimitive;
