import type { ComponentProps } from "@ant-design/x-markdown";
import {
  DynamicForm as DynamicFormComponent,
  type FormSchema,
} from "@/components/wuhan/composed/dynamic-form";

const fallbackSchema: FormSchema = {
  title: "补充信息",
  fields: [
    {
      name: "timeRange",
      label: "你关注的时间范围是多久？",
      type: "radio",
      required: true,
      options: [
        { label: "短期 1-2 年", value: "1-2" },
        { label: "中期 3-5 年", value: "3-5" },
        { label: "长期 5-10 年", value: "5-10" },
      ],
    },
    {
      name: "focusArea",
      label: "你更关注哪些 AI 技术方向？",
      type: "radio",
      options: [
        { label: "大模型", value: "llm" },
        { label: "多模态", value: "multimodal" },
        { label: "生成式 AI", value: "genai" },
        { label: "AGI", value: "agi" },
        { label: "多选项", value: "other" },
      ],
    },
    {
      name: "focusAngle",
      label: "你是从什么角度关注这些趋势？",
      type: "input",
      placeholder: "请输入",
    },
    {
      name: "industry",
      label: "你是从什么行业关注这些趋势？",
      type: "select",
      placeholder: "请选择",
      options: [
        { label: "互联网", value: "internet" },
        { label: "金融", value: "finance" },
        { label: "制造业", value: "manufacturing" },
        { label: "教育", value: "education" },
        { label: "医疗", value: "healthcare" },
      ],
    },
    {
      name: "attachments",
      label: "你有需要补充上传的文件吗？",
      type: "input",
      placeholder: "上传文件",
    },
  ],
};

const parseSchema = (value: unknown): FormSchema | null => {
  if (!value) return null;
  if (typeof value === "object") {
    return value as FormSchema;
  }
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as FormSchema;
    } catch {
      return null;
    }
  }
  return null;
};

export const DynamicForm: React.FC<ComponentProps> = (props) => {
  const rawSchema =
    (props as Record<string, unknown>).schema ??
    (props as Record<string, unknown>)["data-schema"] ??
    (props as Record<string, unknown>)["data-raw"] ??
    (typeof props.children === "string" ? props.children : undefined);
  const schema = parseSchema(rawSchema) ?? fallbackSchema;

  return <DynamicFormComponent schema={schema} submitText="确认" />;
};

export default DynamicForm;
