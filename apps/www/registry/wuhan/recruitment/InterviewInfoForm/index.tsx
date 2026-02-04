"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Form, Radio, Input, Button, Checkbox } from "antd";
import {
  StyledInterviewInfoForm,
  StyledInterviewInfoFormTitle,
  StyledRequiredMark,
  StyledEmptyValue,
  StyledRadioGroup,
  StyledRadioGroupContainer,
  StyledCheckboxGroup,
  StyledCheckboxGroupContainer,
} from "./style";
import UploadField from "./UploadField";
import {
  DEFAULT_TITLE,
  DEFAULT_SUBMIT_BUTTON_TEXT,
  DEFAULT_REQUIRED_MARK_COLOR,
  DEFAULT_REQUIRED_MARK_POSITION,
  DEFAULT_RADIO_COLUMNS,
  DEFAULT_TEXTAREA_ROWS,
  EMPTY_VALUE_TEXT,
} from "./constants";
import type {
  InterviewInfoFormProps,
  FormFieldConfig,
  FormStatus,
} from "./types";

// 导出类型供外部使用
export type {
  InterviewInfoFormProps,
  FormFieldConfig,
  OptionItem,
  FieldType,
  FormStatus,
} from "./types";
export { default as UploadField } from "./UploadField";

/**
 * InterviewInfoForm 组件
 *
 * 基于字段配置的灵活表单组件，支持动态字段、自定义渲染、字段排序等功能。
 *
 * @example
 * ```tsx
 * <InterviewInfoForm
 *   title="补充确认信息"
 *   fields={fields}
 *   onSubmit={(values) => console.log(values)}
 * />
 * ```
 */
const InterviewInfoForm: React.FC<InterviewInfoFormProps> = ({
  className,
  title = DEFAULT_TITLE,
  onSubmit,
  initialValues,
  fields = [],
  submitButtonText = DEFAULT_SUBMIT_BUTTON_TEXT,
  showSubmitButton = true,
  submitButtonRender,
  requiredMarkPosition = DEFAULT_REQUIRED_MARK_POSITION,
  requiredMarkColor = DEFAULT_REQUIRED_MARK_COLOR,
  showFieldOrder = true,
  readOnly: externalReadOnly,
  status: externalStatus,
  formProps,
}) => {
  const [form] = Form.useForm();
  const [internalStatus, setInternalStatus] = useState<FormStatus>(
    externalStatus || "pending",
  );

  // 同步外部状态
  useEffect(() => {
    if (externalStatus !== undefined) {
      setInternalStatus(externalStatus);
    }
  }, [externalStatus]);

  // 计算当前状态和只读模式
  const status: FormStatus = useMemo(
    () => (externalStatus !== undefined ? externalStatus : internalStatus),
    [externalStatus, internalStatus],
  );

  const readOnly: boolean = useMemo(
    () =>
      externalReadOnly !== undefined
        ? externalReadOnly
        : status === "confirmed",
    [externalReadOnly, status],
  );

  /**
   * 表单提交处理
   */
  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();

      // 调用提交回调
      await onSubmit?.(values);

      // 确认后切换为只读模式，并更新表单值以确保只读模式下能正确显示数据
      form.setFieldsValue(values);

      // 确认后状态变为已确认（只读模式会自动关联）
      setInternalStatus("confirmed");
    } catch (error) {
      // 验证失败时，Ant Design 会自动显示错误信息
      // 这里只记录错误，不显示额外的提示
      if (process.env.NODE_ENV === "development") {
        console.warn("[InterviewInfoForm] 表单验证失败:", error);
      }
    }
  }, [form, onSubmit]);

  /**
   * 渲染必填标记
   */
  const renderRequiredMark = useCallback(
    (required?: boolean): React.ReactNode => {
      if (!required) return null;

      const mark = (
        <StyledRequiredMark $color={requiredMarkColor} aria-label="必填字段">
          *
        </StyledRequiredMark>
      );

      return requiredMarkPosition === "before" ? (
        <>
          {mark} <span />
        </>
      ) : (
        <>
          <span /> {mark}
        </>
      );
    },
    [requiredMarkColor, requiredMarkPosition],
  );

  /**
   * 渲染字段标签
   */
  const renderLabel = useCallback(
    (field: FormFieldConfig, index: number): React.ReactNode => {
      const orderPrefix = showFieldOrder ? `${index + 1}. ` : "";
      const labelContent = `${orderPrefix}${field.label}`;
      const requiredMark = renderRequiredMark(field.required);

      if (requiredMarkPosition === "before") {
        return (
          <span>
            {requiredMark}
            {labelContent}
          </span>
        );
      }

      return (
        <span>
          {labelContent}
          {requiredMark}
        </span>
      );
    },
    [showFieldOrder, renderRequiredMark, requiredMarkPosition],
  );

  /**
   * 渲染只读值（纯文本）
   */
  const renderReadOnlyValue = useCallback(
    (field: FormFieldConfig, value: any): React.ReactNode => {
      if (value === null || value === undefined || value === "") {
        return (
          <StyledEmptyValue aria-label="空值">
            {EMPTY_VALUE_TEXT}
          </StyledEmptyValue>
        );
      }

      switch (field.type) {
        case "radio": {
          const selectedOption = field.options?.find(
            (opt) => opt.value === value,
          );
          return <span>{selectedOption?.label || value}</span>;
        }

        case "checkbox":
          if (Array.isArray(field.options)) {
            const selectedLabels =
              field.options?.map((opt) => opt.label).join("、") || "";
            return <span>{selectedLabels || EMPTY_VALUE_TEXT}</span>;
          }
          return <span>{EMPTY_VALUE_TEXT}</span>;

        case "upload":
          // 上传字段由 UploadField 组件处理
          return null;

        default:
          return <span>{String(value)}</span>;
      }
    },
    [],
  );

  /**
   * 渲染字段输入组件
   */
  const renderFieldInput = useCallback(
    (field: FormFieldConfig): React.ReactNode => {
      // 只读模式
      if (readOnly) {
        if (field.type === "upload") {
          return (
            <UploadField
              field={field}
              form={form}
              readOnly={readOnly}
              initialValues={initialValues}
            />
          );
        }
        const value =
          initialValues?.[field.name] || form.getFieldValue(field.name);
        return (
          <div
            className={`readonly-value-${field.name}`}
            role="textbox"
            aria-readonly="true"
          >
            {renderReadOnlyValue(field, value)}
          </div>
        );
      }

      // 编辑模式：自定义渲染
      if (field.render) {
        return field.render(field, form);
      }

      // 编辑模式：根据类型渲染
      switch (field.type) {
        case "radio":
          if (!field.options || field.options.length === 0) {
            console.warn(
              `[InterviewInfoForm] Radio 字段 "${field.name}" 缺少 options 配置`,
            );
            return null;
          }
          return (
            <StyledRadioGroup className={`radio-group-${field.name}`}>
              <Radio.Group className={`radio-group-${field.name}`}>
                <StyledRadioGroupContainer
                  className="radio-group-container"
                  $columns={field.radioColumns || DEFAULT_RADIO_COLUMNS}
                  role="radiogroup"
                  aria-label={field.label}
                >
                  {field.options.map((option) => (
                    <Radio
                      key={option.value}
                      value={option.value}
                      className={`radio-item-${field.name}`}
                    >
                      {option.label}
                    </Radio>
                  ))}
                </StyledRadioGroupContainer>
              </Radio.Group>
            </StyledRadioGroup>
          );

        case "input":
          return (
            <Input
              placeholder={field.placeholder || `请输入${field.label}`}
              className={`input-${field.name}`}
              allowClear
              aria-label={field.label}
            />
          );

        case "textarea":
          return (
            <Input.TextArea
              placeholder={field.placeholder || `请输入${field.label}`}
              className={`textarea-${field.name}`}
              rows={DEFAULT_TEXTAREA_ROWS}
              allowClear
              aria-label={field.label}
            />
          );

        case "checkbox":
          if (!field.options || field.options.length === 0) {
            console.warn(
              `[InterviewInfoForm] Checkbox 字段 "${field.name}" 缺少 options 配置`,
            );
            return null;
          }
          return (
            <StyledCheckboxGroup className={`checkbox-group-${field.name}`}>
              <Checkbox.Group className={`checkbox-group-${field.name}`}>
                <StyledCheckboxGroupContainer
                  className="checkbox-group-container"
                  $columns={field.radioColumns || DEFAULT_RADIO_COLUMNS}
                  role="group"
                  aria-label={field.label}
                >
                  {field.options.map((option) => (
                    <Checkbox
                      key={option.value}
                      value={option.value}
                      className={`checkbox-item-${field.name}`}
                    >
                      {option.label}
                    </Checkbox>
                  ))}
                </StyledCheckboxGroupContainer>
              </Checkbox.Group>
            </StyledCheckboxGroup>
          );

        case "upload":
          return (
            <UploadField
              field={field}
              form={form}
              readOnly={readOnly}
              initialValues={initialValues}
            />
          );

        case "select":
          // TODO: 实现 select 类型
          console.warn(
            `[InterviewInfoForm] Select 字段类型尚未实现: ${field.name}`,
          );
          return null;

        default:
          return (
            <Input
              placeholder={field.placeholder || `请输入${field.label}`}
              className={`input-${field.name}`}
              allowClear
              aria-label={field.label}
            />
          );
      }
    },
    [readOnly, form, initialValues, renderReadOnlyValue],
  );

  /**
   * 计算字段验证规则
   */
  const getFieldRules = useCallback(
    (field: FormFieldConfig) => {
      if (readOnly) return [];
      if (field.rules) return field.rules;
      if (field.required) {
        return [{ required: true, message: `请输入${field.label}` }];
      }
      return [];
    },
    [readOnly],
  );

  /**
   * 排序并过滤字段
   */
  const sortedFields = useMemo(
    () =>
      fields
        .filter((field) => field.visible !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [fields],
  );

  return (
    <StyledInterviewInfoForm
      className={className}
      role="form"
      aria-label={title}
    >
      <div className="form-header">
        {title && (
          <StyledInterviewInfoFormTitle id="form-title" aria-level={2}>
            {title}
          </StyledInterviewInfoFormTitle>
        )}
      </div>
      <Form
        form={form}
        layout="vertical"
        className="interview-form"
        initialValues={initialValues}
        requiredMark={false}
        aria-labelledby="form-title"
        {...formProps}
      >
        {sortedFields.map((field, index) => (
          <Form.Item
            key={field.name}
            label={renderLabel(field, index)}
            name={field.name}
            rules={getFieldRules(field)}
            className={
              field.className || (field.required ? "form-item-required" : "")
            }
          >
            {renderFieldInput(field)}
          </Form.Item>
        ))}

        {/* 确认按钮 - 只读模式下不显示 */}
        {!readOnly && showSubmitButton && (
          <Form.Item className="form-item-submit">
            {submitButtonRender ? (
              submitButtonRender(handleSubmit)
            ) : (
              <Button
                type="primary"
                onClick={handleSubmit}
                className="submit-button"
                aria-label="提交表单"
              >
                {submitButtonText}
              </Button>
            )}
          </Form.Item>
        )}
      </Form>
    </StyledInterviewInfoForm>
  );
};

export default InterviewInfoForm;
