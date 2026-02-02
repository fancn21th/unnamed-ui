"use client";

import {
  DynamicForm,
  type FormSchema,
} from "@/registry/wuhan/composed/dynamic-form/dynamic-form";
import { StatusTag } from "@/registry/wuhan/composed/status-tag/status-tag";

const schema: FormSchema = {
  title: "订单信息",
  description: "填写订单详细信息",
  fields: [
    {
      name: "orderNumber",
      label: "订单编号",
      type: "input",
      placeholder: "自动生成",
      disabled: true,
      defaultValue: "ORD-2026-001",
    },
    {
      name: "customerName",
      label: "客户姓名",
      type: "input",
      required: true,
      placeholder: "请输入客户姓名",
    },
    {
      name: "product",
      label: "产品",
      type: "select",
      required: true,
      options: [
        { value: "laptop", label: "笔记本电脑" },
        { value: "phone", label: "智能手机" },
        { value: "tablet", label: "平板电脑" },
      ],
    },
    {
      name: "quantity",
      label: "数量",
      type: "number",
      defaultValue: 1,
      min: 1,
      max: 100,
    },
    {
      name: "urgent",
      label: "加急处理",
      type: "switch",
      defaultValue: false,
    },
    {
      name: "notes",
      label: "备注",
      type: "textarea",
      placeholder: "请输入备注信息",
    },
  ],
};

export default function DynamicFormWithExtra() {
  return (
    <DynamicForm
      schema={schema}
      extra={<StatusTag status="pending" />}
      onFinish={(values) => {
        console.log("提交:", values);
      }}
    />
  );
}
