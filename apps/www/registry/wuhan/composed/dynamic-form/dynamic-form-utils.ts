import type { FieldSchema } from "./dynamic-form";

/**
 * 从字段 Schema 中提取默认值
 * @param fields 字段配置数组
 * @returns 默认值对象
 * @public
 */
export function extractDefaultValues(
  fields: FieldSchema[],
): Record<string, unknown> {
  const defaultValues: Record<string, unknown> = {};

  fields.forEach((field) => {
    if (field.defaultValue !== undefined) {
      defaultValues[field.name] = field.defaultValue;
    } else {
      switch (field.type) {
        case "checkbox":
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
 * @public
 */
export function getDisplayLabel(value: unknown, field: FieldSchema): string {
  if (value === undefined || value === null || value === "") {
    return "-";
  }

  if (field.options && (field.type === "select" || field.type === "radio")) {
    const option = field.options.find((opt) => opt.value === value);
    return option?.label ?? String(value);
  }

  if (field.type === "checkbox" || field.type === "switch") {
    return value ? "是" : "否";
  }

  return String(value);
}

/**
 * 过滤出指定的字段值
 * @param values 所有字段值
 * @param nameList 需要过滤的字段名列表
 * @returns 过滤后的字段值
 * @public
 */
export function pickValues(
  values: Record<string, unknown>,
  nameList: string[],
): Record<string, unknown> {
  const picked: Record<string, unknown> = {};
  nameList.forEach((name) => {
    if (name in values) {
      picked[name] = values[name];
    }
  });
  return picked;
}

/**
 * 根据字段配置生成 AI 消息输出规范的 JSON Schema
 * @param fields 字段配置数组
 * @returns JSON Schema
 * @public
 */
export function generateJsonSchema(fields: FieldSchema[]) {
  const properties: Record<string, unknown> = {};
  const required: string[] = [];

  fields.forEach((field) => {
    const property: Record<string, unknown> = {
      type: getJsonSchemaType(field.type),
      description: field.description || field.label,
    };

    if (field.options && field.type !== "checkbox") {
      property.enum = field.options.map((opt) => opt.value);
    }

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
