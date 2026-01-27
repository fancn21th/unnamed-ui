import type { FormInstance, FormProps, Rule } from "antd/es/form";
import type { UploadProps } from "antd";
import type { ReactNode } from "react";

/**
 * 选项项接口
 */
export interface OptionItem {
  /** 显示文本 */
  label: string;
  /** 选项值 */
  value: string;
}

/**
 * 表单字段类型
 */
export type FieldType =
  | "radio"
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "upload";

/**
 * 表单状态类型
 */
export type FormStatus = "pending" | "confirmed";

/**
 * 必填标记位置
 */
export type RequiredMarkPosition = "before" | "after";

/**
 * 表单字段配置接口
 */
export interface FormFieldConfig {
  /** 字段名称（对应表单值的 key） */
  name: string;
  /** 字段标签 */
  label: string;
  /** 字段类型 */
  type: FieldType;
  /** 是否必填 */
  required?: boolean;
  /** 验证规则 */
  rules?: Rule[];
  /** 占位符 */
  placeholder?: string;
  /** 字段顺序（可选，用于自定义排序） */
  order?: number;
  /** 是否显示 */
  visible?: boolean;
  /** 自定义样式类名 */
  className?: string;
  /** Radio/Select/Checkbox 选项列表 */
  options?: OptionItem[];
  /** Radio/Checkbox 组件的列数（默认 3） */
  radioColumns?: number;
  /** Upload 组件接受的文件类型 */
  accept?: string;
  /** Upload 组件最大文件大小（MB） */
  maxSize?: number;
  /** Upload 组件最大文件数量 */
  maxCount?: number;
  /** Upload 组件的自定义上传行为 */
  customRequest?: UploadProps["customRequest"];
  /** Upload 组件的其他属性 */
  uploadProps?: Omit<
    UploadProps,
    "accept" | "maxCount" | "customRequest" | "fileList" | "onChange"
  >;
  /** 自定义渲染函数 */
  render?: (field: FormFieldConfig, form: FormInstance) => ReactNode;
}

/**
 * 表单值类型
 */
export type FormValues = Record<string, any>;

/**
 * 表单提交回调函数类型
 */
export type SubmitHandler = (values: FormValues) => void | Promise<void>;

/**
 * 确认按钮渲染函数类型
 */
export type SubmitButtonRender = (onSubmit: () => void) => ReactNode;

/**
 * InterviewInfoForm 组件属性接口
 */
export interface InterviewInfoFormProps {
  /** 自定义类名 */
  className?: string;
  /** 表单标题 */
  title?: string;
  /** 表单提交回调 */
  onSubmit?: SubmitHandler;
  /** 表单初始值 */
  initialValues?: FormValues;
  /** 字段配置列表（必传） */
  fields: FormFieldConfig[];
  /** 确认按钮文本 */
  submitButtonText?: string;
  /** 是否显示确认按钮 */
  showSubmitButton?: boolean;
  /** 自定义确认按钮渲染 */
  submitButtonRender?: SubmitButtonRender;
  /** 必填标记位置 */
  requiredMarkPosition?: RequiredMarkPosition;
  /** 必填标记颜色 */
  requiredMarkColor?: string;
  /** 是否显示字段序号 */
  showFieldOrder?: boolean;
  /** 是否只读模式（用于展示提交后的数据） */
  readOnly?: boolean;
  /** 表单状态 */
  status?: FormStatus;
  /** Form 组件的其他属性 */
  formProps?: Omit<FormProps, "form" | "layout" | "initialValues" | "onFinish">;
}
