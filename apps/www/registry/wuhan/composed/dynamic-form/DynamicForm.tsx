"use client";

import * as React from "react";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/registry/wuhan/ui/button";
import {
  DynamicFormLayoutPrimitive,
  DynamicFormHeaderPrimitive,
  DynamicFormTitlePrimitive,
  DynamicFormBodyLayout,
  DynamicFormFooterPrimitive,
} from "@/registry/wuhan/blocks/dynamic-form/dynamic-form-01";
import { FormItem } from "./FormItem";
import { extractDefaultValues, pickValues } from "./schema-utils";
import type { DynamicFormProps, DynamicFormRef, FieldErrorInfo } from "./types";
import { cn } from "@/lib/utils";

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
      showActions = true,
      submitText = "提交",
      resetText = "重置",
      showTitle = true,
    },
    ref,
  ) => {
    // 从 schema 中提取默认值
    const schemaDefaultValues = React.useMemo(
      () => extractDefaultValues(schema.fields),
      [schema.fields],
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
      // @ts-ignore - zodResolver type compatibility issue with different zod versions
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
        onValuesChange(values as Record<string, any>);
      });

      return () => subscription.unsubscribe();
    }, [watch, onValuesChange]);

    // 表单提交成功处理
    const onSubmit = React.useCallback(
      (values: Record<string, any>) => {
        onFinish?.(values);
      },
      [onFinish],
    );

    // 表单提交失败处理
    const onError = React.useCallback(
      (formErrors: any) => {
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
          const fieldNames = nameList || schema.fields.map((f) => f.name);
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

        getFieldsValue: (nameList?: string[]): Record<string, any> => {
          const allValues = getValues();
          if (!nameList) return allValues;
          return pickValues(allValues, nameList);
        },

        validateFields: async (
          nameList?: string[],
        ): Promise<Record<string, any>> => {
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
            value?: any;
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
            const resetValues: Record<string, any> = {};
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
        schema.fields,
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
        {showTitle && schema.title && (
          <DynamicFormHeaderPrimitive>
            <DynamicFormTitlePrimitive>
              {schema.title}
            </DynamicFormTitlePrimitive>
          </DynamicFormHeaderPrimitive>
        )}

        {/* 表单描述 */}
        {schema.description && (
          <p className="text-muted-foreground text-sm">{schema.description}</p>
        )}

        {/* 表单主体 */}
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DynamicFormBodyLayout>
            {schema.fields.map((field) => (
              <FormItem
                key={field.name}
                field={field}
                control={control}
                readonly={readonly}
                error={errors[field.name] as FieldError}
              />
            ))}
          </DynamicFormBodyLayout>

          {/* 表单操作按钮 */}
          {showActions && !readonly && (
            <DynamicFormFooterPrimitive className="mt-6">
              <Button
                type="button"
                variant="outline"
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
