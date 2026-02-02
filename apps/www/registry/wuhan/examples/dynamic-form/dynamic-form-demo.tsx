"use client";

import {
  DynamicForm,
  type FormSchema,
} from "@/registry/wuhan/composed/dynamic-form/dynamic-form";

const schema: FormSchema = {
  title: "快速开始",
  // description: "展示各种字段类型的基本用法",
  fields: [
    {
      name: "name",
      label: "姓名",
      type: "input",
      required: true,
      placeholder: "请输入您的姓名",
    },
    {
      name: "category",
      label: "分类",
      type: "select",
      required: true,
      options: [
        { value: "tech", label: "技术" },
        { value: "design", label: "设计" },
        { value: "product", label: "产品" },
      ],
    },
    {
      name: "priority",
      label: "优先级",
      type: "radio",
      options: [
        { value: "low", label: "低" },
        { value: "medium", label: "中" },
        { value: "high", label: "高" },
      ],
      // orientation: "horizontal",
      defaultValue: "medium",
    },
    {
      name: "active",
      label: "启用",
      type: "switch",
      defaultValue: true,
    },
  ],
};

export default function DynamicFormDemo() {
  return (
    <DynamicForm
      schema={schema}
      onFinish={(values) => {
        console.log("提交:", values);
      }}
    />
  );
}
