"use client";

import { DynamicForm } from "@/registry/wuhan/composed/dynamic-form/dynamic-form";
import type { FormSchema } from "@/registry/wuhan/composed/dynamic-form/dynamic-form";

const schema: FormSchema = {
  title: "用户信息表单",
  description: "表单已确认，处于只读状态",
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

export default function DynamicFormConfirmed() {
  return (
    <DynamicForm
      schema={schema}
      status="confirmed"
      initialValues={{
        username: "张三",
        email: "zhangsan@example.com",
        bio: "这是一段个人简介",
      }}
      onFinish={(values) => console.log("表单提交:", values)}
    />
  );
}
