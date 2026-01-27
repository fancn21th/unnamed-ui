"use client";

import React, { useMemo, useCallback } from "react";
import { Form, Input, Select, DatePicker, InputNumber, Button } from "antd";
import dayjs from "dayjs";
import { StyledConfirmJDForm } from "./style";
import {
  DEFAULT_TITLE,
  DEFAULT_SUBMIT_BUTTON_TEXT,
  DEFAULT_DATE_FORMAT,
  DEFAULT_INPUT_NUMBER_CONFIG,
} from "./constants";
import type { ConfirmJDFormProps, FormFieldConfig } from "./types";

// 导出类型供外部使用
export type {
  ConfirmJDFormProps,
  FormFieldConfig,
  FieldType,
  OptionItem,
} from "./types";

const ConfirmJDForm: React.FC<ConfirmJDFormProps> = ({
  className,
  title = DEFAULT_TITLE,
  fields = [],
  onSubmit,
  submitButtonText = DEFAULT_SUBMIT_BUTTON_TEXT,
  form: externalForm,
}) => {
  const [internalForm] = Form.useForm();
  const form = externalForm || internalForm;

  /**
   * 计算初始值
   * 从字段配置中提取 initialValue 构建表单初始值对象
   */
  const initialValues = useMemo(() => {
    const values: Record<string, any> = {};

    fields.forEach((field) => {
      if (field.initialValue !== undefined && field.initialValue !== null) {
        // 日期类型需要转换为 dayjs 对象
        if (field.type === "datePicker" && field.initialValue) {
          values[field.name] = dayjs(field.initialValue);
        } else {
          values[field.name] = field.initialValue;
        }
      }
    });

    return values;
  }, [fields]);

  /**
   * 表单提交处理
   * 验证通过后，获取所有表单值并调用 onSubmit 回调
   */
  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();

      // 日期字段格式化为字符串
      const formattedValues = { ...values };
      fields.forEach((field) => {
        if (field.type === "datePicker" && formattedValues[field.name]) {
          const dateFormat = field.format || DEFAULT_DATE_FORMAT;
          formattedValues[field.name] = dayjs(
            formattedValues[field.name],
          ).format(dateFormat);
        }
      });

      // 调用提交回调
      await onSubmit?.(formattedValues);
    } catch (error) {
      // 验证失败时，Ant Design 会自动显示错误信息
      // 开发环境下记录错误日志
      if (process.env.NODE_ENV === "development") {
        console.warn("[ConfirmJDForm] 表单验证失败:", error);
      }
    }
  }, [form, fields, onSubmit]);

  /**
   * 渲染字段标签（带序号）
   * 格式：1. 岗位名称
   */
  const renderLabel = useCallback(
    (field: FormFieldConfig, index: number): string => {
      return `${index + 1}. ${field.label}`;
    },
    [],
  );

  /**
   * 渲染字段输入组件
   * 根据字段类型动态渲染对应的 Ant Design 组件
   */
  const renderFieldInput = useCallback(
    (field: FormFieldConfig): React.ReactNode => {
      switch (field.type) {
        case "input":
          return (
            <Input
              placeholder={field.placeholder || `请输入${field.label}`}
              disabled={field.disabled}
              allowClear
              aria-label={field.label}
            />
          );

        case "select":
          if (!field.options || field.options.length === 0) {
            console.warn(
              `[ConfirmJDForm] Select 字段 "${field.name}" 缺少 options 配置`,
            );
            return null;
          }
          return (
            <Select
              placeholder={field.placeholder || `请选择${field.label}`}
              disabled={field.disabled}
              mode={field.mode}
              options={field.options}
              allowClear
              aria-label={field.label}
            />
          );

        case "datePicker":
          return (
            <DatePicker
              placeholder={field.placeholder || `请选择${field.label}`}
              disabled={field.disabled}
              format={field.format || DEFAULT_DATE_FORMAT}
              style={{ width: "100%" }}
              aria-label={field.label}
            />
          );

        case "inputNumber":
          return (
            <InputNumber
              placeholder={field.placeholder || `请输入${field.label}`}
              disabled={field.disabled}
              min={field.min ?? DEFAULT_INPUT_NUMBER_CONFIG.min}
              max={field.max}
              step={field.step ?? DEFAULT_INPUT_NUMBER_CONFIG.step}
              // precision={field.precision ?? DEFAULT_INPUT_NUMBER_CONFIG.precision}
              style={{ width: "100%" }}
              aria-label={field.label}
            />
          );

        default:
          console.warn(`[ConfirmJDForm] 未知字段类型: ${field.type}`);
          return null;
      }
    },
    [],
  );

  return (
    <StyledConfirmJDForm className={className} role="form" aria-label={title}>
      {/* 表单标题 */}
      {title && (
        <div className="form-title" id="form-title" aria-level={2}>
          {title}
        </div>
      )}

      {/* 表单主体 */}
      <Form
        form={form}
        layout="vertical"
        className="confirm-jd-form"
        initialValues={initialValues}
        aria-labelledby="form-title"
      >
        {fields.map((field, index) => (
          <Form.Item
            key={field.name}
            label={renderLabel(field, index)}
            name={field.name}
            rules={field.rules}
            required={field.rules?.some(
              (rule) =>
                typeof rule === "object" && "required" in rule && rule.required,
            )}
          >
            {renderFieldInput(field)}
          </Form.Item>
        ))}

        {/* 确认按钮 - 右对齐 */}
        <Form.Item className="form-item-submit">
          <Button
            type="primary"
            onClick={handleSubmit}
            className="submit-button"
            aria-label="提交表单"
          >
            {submitButtonText}
          </Button>
        </Form.Item>
      </Form>
    </StyledConfirmJDForm>
  );
};

export default ConfirmJDForm;
