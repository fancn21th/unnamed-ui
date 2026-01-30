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
 * @public
 */
export interface FeedbackOption {
  id: string;
  label: React.ReactNode;
}

/**
 * @public
 */
export interface FeedbackProps {
  title?: React.ReactNode;
  options: FeedbackOption[];
  selectedId?: string;
  defaultSelectedId?: string;
  onSelect?: (id: string) => void;
  inputValue?: string;
  defaultInputValue?: string;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  submitLabel?: React.ReactNode;
  onSubmit?: (payload: { selectedId: string; inputValue: string }) => void;
  onClose?: () => void;
}

/**
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
      selectedId,
      defaultSelectedId = "",
      onSelect,
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
    const [localSelected, setLocalSelected] = React.useState(defaultSelectedId);
    const [localInput, setLocalInput] = React.useState(defaultInputValue);

    const currentSelected = selectedId ?? localSelected;
    const currentInput = inputValue ?? localInput;

    const handleSelect = React.useCallback(
      (id: string) => {
        setLocalSelected(id);
        onSelect?.(id);
      },
      [onSelect],
    );

    const handleInputChange = React.useCallback(
      (value: string) => {
        setLocalInput(value);
        onInputChange?.(value);
      },
      [onInputChange],
    );

    const handleSubmit = React.useCallback(
      (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit?.({ selectedId: currentSelected, inputValue: currentInput });
      },
      [currentSelected, currentInput, onSubmit],
    );

    return (
      <form ref={ref} onSubmit={handleSubmit} aria-label="Feedback form">
        <FeedbackContainerPrimitive onClose={onClose}>
          <FeedbackHeaderPrimitive title={title} onClose={onClose} />

          <ToggleButtonGroupPrimitive>
            {options.map((option) => (
              <ToggleButtonPrimitive
                key={option.id}
                selected={currentSelected === option.id}
                onClick={() => handleSelect(option.id)}
                variant="default"
              >
                {option.label}
              </ToggleButtonPrimitive>
            ))}
          </ToggleButtonGroupPrimitive>

          <FeedbackInputContainerPrimitive>
            <FeedbackInputPrimitive
              placeholder={placeholder}
              value={currentInput}
              onChange={(event) => handleInputChange(event.target.value)}
            />
          </FeedbackInputContainerPrimitive>

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
 * @public
 */
export const FeedbackInput = FeedbackInputPrimitive;
/**
 * @public
 */
export const FeedbackInputContainer = FeedbackInputContainerPrimitive;
