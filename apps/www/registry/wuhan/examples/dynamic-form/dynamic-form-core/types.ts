import type { FieldError, UseFormReturn } from "react-hook-form";
import type { z } from "zod";

/**
 * 表单字段类型枚举
 * 定义了表单支持的所有输入控件类型
 */
export type FieldType =
  | "input" // 单行文本输入
  | "textarea" // 多行文本输入
  | "select" // 下拉选择
  | "radio" // 单选按钮组
  | "checkbox" // 复选框
  | "switch" // 开关
  | "slider" // 滑块
  | "date" // 日期选择器
  | "number"; // 数字输入

/**
 * 选项数据结构
 * 用于 select、radio、checkbox 等选择类控件
 */
export interface FieldOption {
  /** 选项的值 */
  value: string | number | boolean;
  /** 选项的显示文本 */
  label: string;
  /** 是否禁用该选项 */
  disabled?: boolean;
}

/**
 * 表单字段配置
 * 定义单个表单项的完整配置信息
 */
export interface FieldSchema {
  /** 字段唯一标识，对应表单值的键名 */
  name: string;
  /** 字段显示标签 */
  label: string;
  /** 字段类型 */
  type: FieldType;
  /** 字段描述信息，显示在输入框下方 */
  description?: string;
  /** 字段占位符文本 */
  placeholder?: string;
  /** 默认值 */
  defaultValue?: any;
  /** 是否必填 */
  required?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 选择类字段的选项列表 */
  options?: FieldOption[];
  /** 字段布局方向 */
  orientation?: "vertical" | "horizontal" | "responsive";
  /** 数字输入的最小值 */
  min?: number;
  /** 数字输入的最大值 */
  max?: number;
  /** 数字输入的步进值 */
  step?: number;
  /** 滑块的范围配置 */
  range?: {
    min: number;
    max: number;
    step?: number;
  };
  /** 自定义渲染函数（高级用法） */
  render?: (props: FieldRenderProps) => React.ReactNode;
}

/**
 * 字段渲染属性
 * 传递给自定义渲染函数的参数
 */
export interface FieldRenderProps {
  /** 字段配置 */
  field: FieldSchema;
  /** react-hook-form 的字段值 */
  value: any;
  /** 字段值变更处理函数 */
  onChange: (value: any) => void;
  /** 字段失焦处理函数 */
  onBlur: () => void;
  /** 字段错误信息 */
  error?: FieldError;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读模式 */
  readonly?: boolean;
}

/**
 * 表单 Schema
 * 定义整个动态表单的配置结构
 */
export interface FormSchema {
  /** 表单标题 */
  title?: string;
  /** 表单描述 */
  description?: string;
  /** 表单字段列表 */
  fields: FieldSchema[];
}

/**
 * 动态表单组件属性
 */
export interface DynamicFormProps {
  /** 表单的自定义样式类名 */
  className?: string;
  /** 表单的内联样式 */
  style?: React.CSSProperties;
  /** 表单 Schema 配置 */
  schema: FormSchema;
  /** 表单初始值 */
  initialValues?: Record<string, any>;
  /** 表单值变化时的回调 */
  onValuesChange?: (values: Record<string, any>) => void;
  /** 表单提交成功时的回调 */
  onFinish?: (values: Record<string, any>) => void;
  /** 表单提交失败时的回调 */
  onFinishFailed?: (errorInfo: {
    values: Record<string, any>;
    errors: Record<string, FieldError>;
  }) => void;
  /** Zod 验证 Schema */
  validateSchema?: z.ZodType<any>;
  /** 是否只读模式 */
  readonly?: boolean;
  /** 是否显示预置的提交和重置按钮 */
  showActions?: boolean;
  /** 提交按钮文本 */
  submitText?: string;
  /** 重置按钮文本 */
  resetText?: string;
  /** 是否显示表单标题 */
  showTitle?: boolean;
}

/**
 * 动态表单实例方法接口
 * 通过 ref 暴露给父组件的方法集合
 */
export interface DynamicFormRef {
  /**
   * 获取一组字段名对应的错误信息
   * @param nameList 字段名列表，不传则返回所有字段的错误
   * @returns 错误信息数组
   */
  getFieldsError: (
    nameList?: string[],
  ) => Array<{ name: string; errors: string[] }>;

  /**
   * 获取一组字段名对应的值
   * @param nameList 字段名列表，不传则返回所有字段的值
   * @returns 字段值对象
   */
  getFieldsValue: (nameList?: string[]) => Record<string, any>;

  /**
   * 触发表单验证
   * @param nameList 字段名列表，不传则验证所有字段
   * @returns Promise，验证成功返回字段值，验证失败抛出错误
   */
  validateFields: (nameList?: string[]) => Promise<Record<string, any>>;

  /**
   * 设置一组字段的状态
   * @param fields 字段状态数组
   */
  setFields: (
    fields: Array<{
      name: string;
      value?: any;
      errors?: string[];
    }>,
  ) => void;

  /**
   * 重置一组字段到 initialValues
   * @param nameList 字段名列表，不传则重置所有字段
   */
  resetFields: (nameList?: string[]) => void;

  /**
   * 提交表单
   * @returns Promise
   */
  submit: () => Promise<void>;

  /**
   * 获取 react-hook-form 的表单实例（高级用法）
   */
  getForm: () => UseFormReturn<any>;
}

/**
 * 字段错误信息结构
 */
export interface FieldErrorInfo {
  name: string;
  errors: string[];
}
