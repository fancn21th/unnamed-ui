import type { FieldSchema } from "./types";

/**
 * Schema 工具函数集合
 * 用于处理和转换表单 Schema
 */

/**
 * 从字段 Schema 中提取默认值
 * @param fields 字段配置数组
 * @returns 默认值对象
 */
export function extractDefaultValues(
  fields: FieldSchema[],
): Record<string, any> {
  const defaultValues: Record<string, any> = {};

  fields.forEach((field) => {
    if (field.defaultValue !== undefined) {
      defaultValues[field.name] = field.defaultValue;
    } else {
      // 根据字段类型设置合理的默认值
      switch (field.type) {
        case "checkbox":
          defaultValues[field.name] = false;
          break;
        case "switch":
          defaultValues[field.name] = false;
          break;
        case "number":
          defaultValues[field.name] = field.min ?? 0;
          break;
        case "slider":
          defaultValues[field.name] = field.range?.min ?? 0;
          break;
        default:
          defaultValues[field.name] = "";
      }
    }
  });

  return defaultValues;
}

/**
 * 根据字段值和选项获取显示标签
 * 用于只读模式下显示选择类字段的标签
 * @param value 字段值
 * @param field 字段配置
 * @returns 显示标签
 */
export function getDisplayLabel(value: any, field: FieldSchema): string {
  if (value === undefined || value === null || value === "") {
    return "-";
  }

  // 对于选择类字段，查找对应的 label
  if (field.options && (field.type === "select" || field.type === "radio")) {
    const option = field.options.find((opt) => opt.value === value);
    return option?.label ?? String(value);
  }

  // 对于 checkbox 和 switch，转换为是/否
  if (field.type === "checkbox" || field.type === "switch") {
    return value ? "是" : "否";
  }

  // 其他类型直接返回字符串值
  return String(value);
}

/**
 * 验证字段名是否存在于 Schema 中
 * @param name 字段名
 * @param fields 字段配置数组
 * @returns 是否存在
 */
export function isValidFieldName(name: string, fields: FieldSchema[]): boolean {
  return fields.some((field) => field.name === name);
}

/**
 * 过滤出指定的字段值
 * @param values 所有字段值
 * @param nameList 需要过滤的字段名列表
 * @returns 过滤后的字段值
 */
export function pickValues(
  values: Record<string, any>,
  nameList: string[],
): Record<string, any> {
  const picked: Record<string, any> = {};
  nameList.forEach((name) => {
    if (name in values) {
      picked[name] = values[name];
    }
  });
  return picked;
}

/**
 * 根据字段配置生成 AI 消息输出规范的 JSON Schema
 * 这个函数可以帮助 AI 理解表单结构并生成符合规范的表单配置
 * @param fields 字段配置数组
 * @returns JSON Schema
 */
export function generateJsonSchema(fields: FieldSchema[]) {
  const properties: Record<string, any> = {};
  const required: string[] = [];

  fields.forEach((field) => {
    const property: any = {
      type: getJsonSchemaType(field.type),
      description: field.description || field.label,
    };

    // 为选择类字段添加枚举
    if (field.options && field.type !== "checkbox") {
      property.enum = field.options.map((opt) => opt.value);
    }

    // 为数字类型添加范围
    if (field.type === "number" || field.type === "slider") {
      if (field.min !== undefined) property.minimum = field.min;
      if (field.max !== undefined) property.maximum = field.max;
    }

    properties[field.name] = property;

    if (field.required) {
      required.push(field.name);
    }
  });

  return {
    type: "object",
    properties,
    required,
  };
}

/**
 * 将表单字段类型映射到 JSON Schema 类型
 * @param fieldType 字段类型
 * @returns JSON Schema 类型
 */
function getJsonSchemaType(fieldType: string): string {
  switch (fieldType) {
    case "number":
    case "slider":
      return "number";
    case "checkbox":
    case "switch":
      return "boolean";
    default:
      return "string";
  }
}
