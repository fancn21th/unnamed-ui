"use client";

import {
  DynamicForm,
  type FormSchema,
} from "@/registry/wuhan/composed/dynamic-form/dynamic-form";

const schema: FormSchema = {
  title: "用户资料",
  description: "已完成的用户资料信息",
  fields: [
    {
      name: "username",
      label: "用户名",
      type: "input",
    },
    {
      name: "email",
      label: "邮箱",
      type: "input",
    },
    {
      name: "role",
      label: "角色",
      type: "select",
      options: [
        { value: "admin", label: "管理员" },
        { value: "user", label: "普通用户" },
      ],
    },
    {
      name: "plan",
      label: "订阅计划",
      type: "radio",
      options: [
        { value: "free", label: "免费版" },
        { value: "pro", label: "专业版" },
        { value: "enterprise", label: "企业版" },
      ],
      orientation: "horizontal",
    },
    {
      name: "notifications",
      label: "接收通知",
      type: "switch",
    },
    {
      name: "bio",
      label: "个人简介",
      type: "textarea",
    },
  ],
};

const initialValues = {
  username: "张三",
  email: "zhangsan@example.com",
  role: "admin",
  plan: "pro",
  notifications: true,
  bio: "热爱编程的开发者，专注于前端技术栈。",
};

export default function DynamicFormReadonly() {
  return (
    <DynamicForm
      schema={schema}
      initialValues={initialValues}
      readonly={true}
      showActions={false}
    />
  );
}
