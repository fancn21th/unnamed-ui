"use client";

import * as React from "react";
import {
  useForm,
  type FieldError,
  type FieldErrors,
  type Control,
  type UseFormReturn,
  type ControllerRenderProps,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Button } from "@/registry/wuhan/composed/block-button/block-button";
import {
  DynamicFormLayoutPrimitive,
  DynamicFormHeaderPrimitive,
  DynamicFormTitlePrimitive,
  DynamicFormBodyLayout,
  DynamicFormFooterPrimitive,
} from "@/registry/wuhan/blocks/dynamic-form/dynamic-form-01";
import { BlockInput } from "@/registry/wuhan/composed/block-input/block-input";
import { BlockSelect } from "@/registry/wuhan/composed/block-select/block-select";
import { RadioGroup, RadioGroupItem } from "@/registry/wuhan/ui/radio-group";
import { Switch } from "@/registry/wuhan/ui/switch";
import { Slider } from "@/registry/wuhan/ui/slider";
import {
  Field,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldError as FieldErrorComponent,
} from "@/registry/wuhan/ui/field";
import { cn } from "@/lib/utils";
import { StatusTag } from "@/registry/wuhan/composed/status-tag/status-tag";
import {
  extractDefaultValues,
  getDisplayLabel,
  pickValues,
} from "./dynamic-form-utils";

// ==================== 类型定义 ====================

/**
 * 表单字段类型枚举
 * 定义了表单支持的所有输入控件类型
 * @public
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
 * @public
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
 * 自定义组件属性
 * 自定义表单组件必须具备的属性接口
 * @public
 */
export interface CustomFieldComponentProps {
  /** 字段的当前值 */
  value: unknown;
  /** 值变更处理函数 */
  onChange: (value: unknown) => void;
  /** 字段失焦处理函数（可选） */
  onBlur?: () => void;
  /** 字段错误信息（可选） */
  error?: FieldError;
  /** 是否禁用（可选） */
  disabled?: boolean;
  /** 字段配置（可选，可用于访问其他配置信息） */
  field?: FieldSchema;
}

/**
 * 表单字段配置
 * 定义单个表单项的完整配置信息
 * @public
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
  defaultValue?: unknown;
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
  /** 自定义组件（需要具备 value 和 onChange 属性） */
  component?: React.ComponentType<CustomFieldComponentProps>;
  /** 自定义渲染函数（高级用法，优先级高于 component） */
  render?: (props: FieldRenderProps) => React.ReactNode;
}

/**
 * 字段渲染属性
 * 传递给自定义渲染函数的参数
 * @public
 */
export interface FieldRenderProps {
  /** 字段配置 */
  field: FieldSchema;
  /** react-hook-form 的字段值 */
  value: unknown;
  /** 字段值变更处理函数 */
  onChange: (value: unknown) => void;
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
 * @public
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
 * @public
 */
export interface DynamicFormProps {
  /** 表单的自定义样式类名 */
  className?: string;
  /** 表单的内联样式 */
  style?: React.CSSProperties;
  /** 表单 Schema 配置 */
  schema: FormSchema;
  /** 表单初始值 */
  initialValues?: Record<string, unknown>;
  /** 表单值变化时的回调 */
  onValuesChange?: (values: Record<string, unknown>) => void;
  /** 表单提交成功时的回调 */
  onFinish?: (values: Record<string, unknown>) => void;
  /** 表单提交失败时的回调 */
  onFinishFailed?: (errorInfo: {
    values: Record<string, unknown>;
    errors: FieldErrors<Record<string, unknown>>;
  }) => void;
  /** Zod 验证 Schema */
  validateSchema?: z.ZodType<Record<string, unknown>>;
  /** 是否只读模式 */
  readonly?: boolean;
  /** 状态 - 仅支持 pending 和 confirmed，confirmed 状态会自动设置为只读并隐藏 Footer */
  status?: "pending" | "confirmed";
  /** 是否显示预置的提交和重置按钮 */
  showActions?: boolean;
  /** 提交按钮文本 */
  submitText?: string;
  /** 重置按钮文本 */
  resetText?: string;
  /** 是否显示表单标题 */
  showTitle?: boolean;
  /** 表单头部额外信息 */
  extra?: React.ReactNode;
}

/**
 * 动态表单实例方法接口
 * 通过 ref 暴露给父组件的方法集合
 * @public
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
  getFieldsValue: (nameList?: string[]) => Record<string, unknown>;

  /**
   * 触发表单验证
   * @param nameList 字段名列表，不传则验证所有字段
   * @returns Promise，验证成功返回字段值，验证失败抛出错误
   */
  validateFields: (nameList?: string[]) => Promise<Record<string, unknown>>;

  /**
   * 设置一组字段的状态
   * @param fields 字段状态数组
   */
  setFields: (
    fields: Array<{
      name: string;
      value?: unknown;
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
  getForm: () => UseFormReturn<Record<string, unknown>>;
}

/**
 * 字段错误信息结构
 * @public
 */
export interface FieldErrorInfo {
  name: string;
  errors: string[];
}

// ==================== 主组件：DynamicForm ====================

/**
 * DynamicForm 组件
 * 动态表单组件，根据 Schema 配置动态生成表单
 *
 * @example
 * ```tsx
 * const formRef = useRef<DynamicFormRef>(null);
 *
 * const schema = {
 *   title: "用户信息",
 *   fields: [
 *     { name: "name", label: "姓名", type: "input", required: true },
 *     { name: "email", label: "邮箱", type: "input" }
 *   ]
 * };
 *
 * <DynamicForm
 *   ref={formRef}
 *   schema={schema}
 *   onFinish={(values) => console.log(values)}
 * />
 * ```
 *
 * @public
 */
export const DynamicForm = React.forwardRef<DynamicFormRef, DynamicFormProps>(
  (
    {
      className,
      style,
      schema,
      initialValues = {},
      onValuesChange,
      onFinish,
      onFinishFailed,
      validateSchema,
      readonly = false,
      status,
      showActions = true,
      submitText = "提交",
      resetText = "重置",
      showTitle = true,
      extra,
    },
    ref,
  ) => {
    // 如果 status 是 confirmed，自动设置为只读
    const effectiveReadonly = readonly || status === "confirmed";

    const safeSchema = React.useMemo<FormSchema>(
      () => schema ?? { fields: [] },
      [schema],
    );

    // 从 schema 中提取默认值
    const schemaDefaultValues = React.useMemo(
      () => extractDefaultValues(safeSchema.fields),
      [safeSchema.fields],
    );

    // 合并初始值和 schema 默认值
    const mergedDefaultValues = React.useMemo(
      () => ({
        ...schemaDefaultValues,
        ...initialValues,
      }),
      [schemaDefaultValues, initialValues],
    );

    // 初始化表单
    const form = useForm({
      // @ts-expect-error - zodResolver type compatibility issue with different zod versions
      resolver: validateSchema ? zodResolver(validateSchema) : undefined,
      defaultValues: mergedDefaultValues,
      mode: "onChange",
    });

    const {
      control,
      handleSubmit,
      reset,
      watch,
      formState: { errors },
      getValues,
      setValue,
      setError,
      clearErrors,
      trigger,
    } = form;

    // 监听表单值变化
    React.useEffect(() => {
      if (!onValuesChange) return;

      const subscription = watch((values) => {
        onValuesChange(values as Record<string, unknown>);
      });

      return () => subscription.unsubscribe();
    }, [watch, onValuesChange]);

    // 表单提交成功处理
    const onSubmit = React.useCallback(
      (values: Record<string, unknown>) => {
        onFinish?.(values);
      },
      [onFinish],
    );

    // 表单提交失败处理
    const onError = React.useCallback(
      (formErrors: FieldErrors<Record<string, unknown>>) => {
        onFinishFailed?.({
          values: getValues(),
          errors: formErrors,
        });
      },
      [onFinishFailed, getValues],
    );

    // 暴露实例方法给父组件
    React.useImperativeHandle(
      ref,
      () => ({
        getFieldsError: (nameList?: string[]): FieldErrorInfo[] => {
          const fieldNames = nameList || safeSchema.fields.map((f) => f.name);
          return fieldNames.map((name) => {
            const error = errors[name];
            return {
              name,
              errors:
                error && typeof error === "object" && "message" in error
                  ? [String(error.message) || "验证失败"]
                  : [],
            };
          });
        },

        getFieldsValue: (nameList?: string[]): Record<string, unknown> => {
          const allValues = getValues();
          if (!nameList) return allValues;
          return pickValues(allValues, nameList);
        },

        validateFields: async (
          nameList?: string[],
        ): Promise<Record<string, unknown>> => {
          const isValid = await trigger(nameList);
          if (!isValid) {
            const currentErrors = form.formState.errors;
            throw new Error(
              `验证失败: ${Object.keys(currentErrors).join(", ")}`,
            );
          }
          return nameList ? pickValues(getValues(), nameList) : getValues();
        },

        setFields: (
          fields: Array<{
            name: string;
            value?: unknown;
            errors?: string[];
          }>,
        ) => {
          fields.forEach(({ name, value, errors: fieldErrors }) => {
            if (value !== undefined) {
              setValue(name, value);
            }
            if (fieldErrors && fieldErrors.length > 0) {
              setError(name, {
                type: "manual",
                message: fieldErrors[0],
              });
            } else if (fieldErrors && fieldErrors.length === 0) {
              clearErrors(name);
            }
          });
        },

        resetFields: (nameList?: string[]) => {
          if (!nameList) {
            reset(mergedDefaultValues);
          } else {
            const resetValues: Record<string, unknown> = {};
            nameList.forEach((name) => {
              resetValues[name] = mergedDefaultValues[name];
            });
            reset({ ...getValues(), ...resetValues });
          }
        },

        submit: async () => {
          await handleSubmit(onSubmit, onError)();
        },

        getForm: () => form,
      }),
      [
        safeSchema.fields,
        errors,
        getValues,
        trigger,
        setValue,
        setError,
        clearErrors,
        reset,
        mergedDefaultValues,
        handleSubmit,
        onSubmit,
        onError,
        form,
      ],
    );

    return (
      <DynamicFormLayoutPrimitive className={cn(className)} style={style}>
        {/* 表单头部 */}
        {showTitle && safeSchema.title && (
          <DynamicFormHeaderPrimitive>
            <DynamicFormTitlePrimitive>
              {safeSchema.title}
            </DynamicFormTitlePrimitive>
            {status && (status === "pending" || status === "confirmed") && (
              <StatusTag status={status} />
            )}
            {extra || null}
          </DynamicFormHeaderPrimitive>
        )}

        {/* 表单描述 */}
        {safeSchema.description && (
          <p className="text-muted-foreground text-sm">
            {safeSchema.description}
          </p>
        )}

        {/* 表单主体 */}
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DynamicFormBodyLayout>
            {safeSchema.fields.map((field) => (
              <FormItem
                key={field.name}
                field={field}
                control={control}
                readonly={effectiveReadonly}
                error={errors[field.name] as FieldError}
              />
            ))}
          </DynamicFormBodyLayout>

          {/* 表单操作按钮 - confirmed 状态不显示 */}
          {showActions && !effectiveReadonly && (
            <DynamicFormFooterPrimitive className="mt-6">
              <Button
                type="button"
                variant="outline"
                color="secondary"
                onClick={() => reset(mergedDefaultValues)}
              >
                {resetText}
              </Button>
              <Button type="submit">{submitText}</Button>
            </DynamicFormFooterPrimitive>
          )}
        </form>
      </DynamicFormLayoutPrimitive>
    );
  },
);

DynamicForm.displayName = "DynamicForm";

// ==================== 内部组件：FormItem ====================

/**
 * FormItem 组件属性
 * @internal
 */
interface FormItemProps {
  /** 字段配置 */
  field: FieldSchema;
  /** react-hook-form 的 control */
  control: Control<Record<string, unknown>>;
  /** 是否只读模式 */
  readonly?: boolean;
  /** 字段错误信息 */
  error?: FieldError;
}

/**
 * FormItem 组件
 * 根据字段配置渲染对应的表单控件
 * 统一包裹 Field 布局组件，处理标签、描述、错误提示
 *
 * @internal
 */
const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ field, control, readonly, error }, ref) => {
    // 如果是只读模式，渲染只读视图
    if (readonly) {
      return (
        <Field ref={ref} orientation={field.orientation}>
          <FieldTitle>{field.label}</FieldTitle>
          <div className="text-sm">
            <Controller
              name={field.name}
              control={control}
              render={({ field: formField }) => (
                <span>{getDisplayLabel(formField.value, field)}</span>
              )}
            />
          </div>
          {field.description && (
            <FieldDescription>{field.description}</FieldDescription>
          )}
        </Field>
      );
    }

    // 如果有自定义渲染函数，使用自定义渲染（优先级最高）
    if (field.render) {
      return (
        <Field ref={ref} orientation={field.orientation}>
          <Controller
            name={field.name}
            control={control}
            render={({ field: formField }) => (
              <>
                {field.render!({
                  field,
                  value: formField.value,
                  onChange: formField.onChange,
                  onBlur: formField.onBlur,
                  error,
                  disabled: field.disabled,
                  readonly,
                })}
              </>
            )}
          />
        </Field>
      );
    }

    // 如果有自定义组件，使用自定义组件
    if (field.component) {
      const CustomComponent = field.component;
      return (
        <Field
          ref={ref}
          orientation={field.orientation}
          data-invalid={!!error}
          className={cn(field.disabled && "opacity-50")}
        >
          <FieldLabel htmlFor={field.name}>
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </FieldLabel>
          <Controller
            name={field.name}
            control={control}
            render={({ field: formField }) => (
              <CustomComponent
                value={formField.value}
                onChange={formField.onChange}
                onBlur={formField.onBlur}
                error={error}
                disabled={field.disabled}
                field={field}
              />
            )}
          />
          {field.description && (
            <FieldDescription>{field.description}</FieldDescription>
          )}
          {error && <FieldErrorComponent>{error.message}</FieldErrorComponent>}
        </Field>
      );
    }

    // 根据字段类型渲染对应的控件
    return (
      <Field
        ref={ref}
        orientation={field.orientation}
        data-invalid={!!error}
        className={cn(field.disabled && "opacity-50")}
      >
        <FieldLabel htmlFor={field.name}>
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </FieldLabel>
        <Controller
          name={field.name}
          control={control}
          render={({ field: formField }) => (
            <>{renderFieldControl(field, formField, error)}</>
          )}
        />
        {field.description && (
          <FieldDescription>{field.description}</FieldDescription>
        )}
        {error && <FieldErrorComponent>{error.message}</FieldErrorComponent>}
      </Field>
    );
  },
);
FormItem.displayName = "FormItem";

/**
 * 根据字段类型渲染对应的表单控件
 * @internal
 */
function renderFieldControl(
  field: FieldSchema,
  formField: ControllerRenderProps<Record<string, unknown>, string>,
  error?: FieldError,
) {
  const { type, placeholder, disabled, options, min, max, step, range } = field;

  switch (type) {
    case "input":
      return (
        <BlockInput
          className="bg-[var(--Container-bg-container)]"
          value={(formField.value as string) ?? ""}
          onChange={(val) => formField.onChange(val)}
          onBlur={formField.onBlur}
          placeholder={placeholder}
          disabled={disabled}
          danger={!!error}
        />
      );

    case "textarea":
      return (
        <BlockInput
          className="bg-[var(--Container-bg-container)]"
          multiline
          rows={3}
          value={(formField.value as string) ?? ""}
          onChange={(val) => formField.onChange(val)}
          onBlur={formField.onBlur}
          placeholder={placeholder}
          disabled={disabled}
          danger={!!error}
        />
      );

    case "select":
      return (
        <BlockSelect
          value={String(formField.value ?? "")}
          onValueChange={(val) => {
            const option = options?.find((o) => String(o.value) === val);
            formField.onChange(option ? option.value : val);
          }}
          options={
            options?.map((opt) => ({
              label: opt.label,
              value: String(opt.value),
              disabled: opt.disabled,
            })) ?? []
          }
          placeholder={placeholder}
          disabled={disabled}
        />
      );

    case "switch":
      return (
        <div className="flex items-center gap-2">
          <Switch
            id={field.name}
            checked={formField.value as boolean}
            onCheckedChange={formField.onChange}
            disabled={disabled}
          />
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={field.name}
            checked={formField.value as boolean}
            onChange={(e) => formField.onChange(e.target.checked)}
            disabled={disabled}
            className="h-4 w-4 rounded border-input"
          />
        </div>
      );

    case "slider":
      return (
        <div className="flex items-center gap-4">
          <Slider
            id={field.name}
            min={range?.min ?? min ?? 0}
            max={range?.max ?? max ?? 100}
            step={range?.step ?? step ?? 1}
            value={[formField.value as number]}
            onValueChange={(values) => formField.onChange(values[0])}
            disabled={disabled}
            className="flex-1"
          />
          <span className="text-muted-foreground min-w-12 text-right text-sm">
            {formField.value as number}
          </span>
        </div>
      );

    case "number":
      return (
        <BlockInput
          className="bg-[var(--Container-bg-container)]"
          type="number"
          value={
            formField.value !== undefined && formField.value !== ""
              ? String(formField.value)
              : ""
          }
          onChange={(val) => {
            const value = val === "" ? "" : Number(val);
            formField.onChange(value);
          }}
          onBlur={formField.onBlur}
          placeholder={placeholder}
          disabled={disabled}
          danger={!!error}
        />
      );

    case "radio":
      return (
        <RadioGroup
          value={String(formField.value ?? "")}
          onValueChange={(val) => {
            const option = options?.find((o) => String(o.value) === val);
            formField.onChange(option ? option.value : val);
          }}
          className="flex flex-row gap-[var(--gap-2xl)]"
        >
          {options?.map((option) => (
            <label
              key={String(option.value)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <RadioGroupItem
                value={String(option.value)}
                disabled={disabled || option.disabled}
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      );

    default:
      return (
        <BlockInput
          className="bg-[var(--Container-bg-container)]"
          value={(formField.value as string) ?? ""}
          onChange={(val) => formField.onChange(val)}
          onBlur={formField.onBlur}
          placeholder={placeholder}
          disabled={disabled}
          danger={!!error}
        />
      );
  }
}
