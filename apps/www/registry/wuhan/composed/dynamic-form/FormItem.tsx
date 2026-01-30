"use client";

import * as React from "react";
import { Controller, type Control, type FieldError } from "react-hook-form";
import { Input } from "@/registry/wuhan/ui/input";
import { Textarea } from "@/registry/wuhan/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/wuhan/ui/select";
import { Switch } from "@/registry/wuhan/ui/switch";
import { Slider } from "@/registry/wuhan/ui/slider";
import {
  Field,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldError as FieldErrorComponent,
} from "@/registry/wuhan/ui/field";
import type { FieldSchema } from "./types";
import { getDisplayLabel } from "./schema-utils";
import { cn } from "@/lib/utils";

/**
 * FormItem 组件属性
 * @public
 */
export interface FormItemProps {
  /** 字段配置 */
  field: FieldSchema;
  /** react-hook-form 的 control */
  control: Control<any>;
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
 * @public
 */
export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
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

    // 如果有自定义渲染函数，使用自定义渲染
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
 */
function renderFieldControl(
  field: FieldSchema,
  formField: any,
  error?: FieldError,
) {
  const { type, placeholder, disabled, options, min, max, step, range } = field;

  switch (type) {
    case "input":
      return (
        <Input
          id={field.name}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          {...formField}
        />
      );

    case "textarea":
      return (
        <Textarea
          id={field.name}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          {...formField}
        />
      );

    case "select":
      return (
        <Select
          value={formField.value}
          onValueChange={formField.onChange}
          disabled={disabled}
        >
          <SelectTrigger id={field.name} aria-invalid={!!error}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem
                key={String(option.value)}
                value={String(option.value)}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "switch":
      return (
        <div className="flex items-center gap-2">
          <Switch
            id={field.name}
            checked={formField.value}
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
            checked={formField.value}
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
            value={[formField.value]}
            onValueChange={(values) => formField.onChange(values[0])}
            disabled={disabled}
            className="flex-1"
          />
          <span className="text-muted-foreground min-w-12 text-right text-sm">
            {formField.value}
          </span>
        </div>
      );

    case "number":
      return (
        <Input
          id={field.name}
          type="number"
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          aria-invalid={!!error}
          {...formField}
          onChange={(e) => {
            const value = e.target.value === "" ? "" : Number(e.target.value);
            formField.onChange(value);
          }}
        />
      );

    case "radio":
      return (
        <div className="flex flex-col gap-2">
          {options?.map((option) => (
            <label
              key={String(option.value)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name={field.name}
                value={String(option.value)}
                checked={formField.value === option.value}
                onChange={() => formField.onChange(option.value)}
                disabled={disabled || option.disabled}
                className="h-4 w-4"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      );

    default:
      return (
        <Input
          id={field.name}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          {...formField}
        />
      );
  }
}
