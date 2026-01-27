import type { FormInstance } from "antd";
import type { Rule } from "antd/es/form";

/**
 * 字段类型枚举
 * - input: 单行文本输入框
 * - select: 下拉选择框（支持单选和多选）
 * - datePicker: 日期选择器
 * - inputNumber: 数字输入框
 */
export type FieldType = "input" | "select" | "datePicker" | "inputNumber";

/**
 * 选项配置（用于 select 类型）
 */
export interface OptionItem {
  label: string;
  value: string | number;
}

/**
 * 字段配置接口
 * 定义了每个表单字段的完整配置信息
 */
export interface FormFieldConfig {
  /** 字段名称（唯一标识） */
  name: string;

  /** 字段类型 */
  type: FieldType;

  /** 字段标签（会自动添加序号） */
  label: string;

  /** 输入提示文本 */
  placeholder?: string;

  /** 初始值 */
  initialValue?: any;

  /** 验证规则（Ant Design Form.Item rules） */
  rules?: Rule[];

  /** 是否禁用 */
  disabled?: boolean;

  /** 选项列表（select 类型必需） */
  options?: OptionItem[];

  /** Select 模式：单选或多选 */
  mode?: "multiple" | "tags";

  /** 日期格式（datePicker 类型使用） */
  format?: string;

  /** InputNumber 最小值 */
  min?: number;

  /** InputNumber 最大值 */
  max?: number;

  /** InputNumber 步长 */
  step?: number;

  /** InputNumber 小数精度 */
  precision?: number;
}

/**
 * 表单提交回调函数类型
 * @param values 表单值对象
 */
export type OnSubmitCallback = (
  values: Record<string, any>,
) => void | Promise<void>;

/**
 * ConfirmJDForm 组件 Props
 */
export interface ConfirmJDFormProps {
  /** 自定义类名 */
  className?: string;

  /** 表单标题 */
  title?: string;

  /** 字段配置列表 */
  fields: FormFieldConfig[];

  /** 表单提交回调 */
  onSubmit?: OnSubmitCallback;

  /** 提交按钮文本 */
  submitButtonText?: string;

  /** Form 实例（可选，外部控制） */
  form?: FormInstance;
}
