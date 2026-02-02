"use client";

import {
  DynamicForm,
  type FormSchema,
} from "@/registry/wuhan/composed/dynamic-form/dynamic-form";

const schema: FormSchema = {
  title: "用户信息",
  description: "请填写您的基本信息",
  fields: [
    {
      name: "username",
      label: "用户名",
      type: "input",
      required: true,
      placeholder: "请输入用户名",
    },
    {
      name: "email",
      label: "邮箱",
      type: "input",
      placeholder: "example@email.com",
    },
    {
      name: "bio",
      label: "个人简介",
      type: "textarea",
      placeholder: "介绍一下自己...",
    },
    {
      name: "role",
      label: "角色",
      type: "select",
      required: true,
      options: [
        { value: "user", label: "普通用户" },
        { value: "admin", label: "管理员" },
        { value: "guest", label: "访客" },
      ],
    },
    {
      name: "notifications",
      label: "接收通知",
      type: "switch",
      defaultValue: true,
    },
  ],
};

export default function DynamicFormDefault() {
  return (
    <DynamicForm
      schema={schema}
      onFinish={(values) => {
        console.log("提交的数据:", values);
      }}
    />
  );
}
