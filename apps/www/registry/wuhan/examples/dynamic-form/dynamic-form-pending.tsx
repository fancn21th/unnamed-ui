"use client";

import { DynamicForm } from "@/registry/wuhan/composed/dynamic-form/dynamic-form";
import type { FormSchema } from "@/registry/wuhan/composed/dynamic-form/dynamic-form";

const schema: FormSchema = {
  title: "用户信息表单",
  description: "请填写以下信息",
  fields: [
    {
      name: "username",
      label: "用户名",
      type: "input",
      placeholder: "请输入用户名",
      required: true,
    },
    {
      name: "email",
      label: "邮箱",
      type: "input",
      placeholder: "请输入邮箱地址",
      required: true,
    },
    {
      name: "bio",
      label: "个人简介",
      type: "textarea",
      placeholder: "请输入个人简介",
    },
  ],
};

export default function DynamicFormPending() {
  return (
    <DynamicForm
      schema={schema}
      status="pending"
      onFinish={(values) => console.log("表单提交:", values)}
    />
  );
}
