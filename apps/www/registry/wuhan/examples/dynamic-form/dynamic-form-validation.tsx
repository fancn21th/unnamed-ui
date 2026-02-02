"use client";

import {
  DynamicForm,
  type FormSchema,
} from "@/registry/wuhan/composed/dynamic-form/dynamic-form";
import { z } from "zod";

const schema: FormSchema = {
  title: "注册表单",
  description: "带验证的用户注册表单",
  fields: [
    {
      name: "username",
      label: "用户名",
      type: "input",
      required: true,
      placeholder: "至少3个字符",
    },
    {
      name: "email",
      label: "邮箱",
      type: "input",
      required: true,
      placeholder: "有效的邮箱地址",
    },
    {
      name: "password",
      label: "密码",
      type: "input",
      required: true,
      placeholder: "至少6个字符",
    },
    {
      name: "age",
      label: "年龄",
      type: "number",
      required: true,
      min: 18,
      max: 100,
      placeholder: "必须年满18岁",
    },
    {
      name: "website",
      label: "个人网站",
      type: "input",
      placeholder: "https://example.com",
    },
    {
      name: "agree",
      label: "同意用户协议",
      type: "checkbox",
      required: true,
    },
  ],
};

const validateSchema = z.object({
  username: z.string().min(3, "用户名至少需要3个字符"),
  email: z.string().email("请输入有效的邮箱地址"),
  password: z.string().min(6, "密码至少需要6个字符"),
  age: z.number().min(18, "必须年满18岁").max(100, "年龄不能超过100岁"),
  website: z.string().url("请输入有效的URL").optional().or(z.literal("")),
  agree: z.boolean().refine((val) => val === true, {
    message: "必须同意用户协议",
  }),
});

export default function DynamicFormValidation() {
  return (
    <DynamicForm
      schema={schema}
      validateSchema={validateSchema}
      onFinish={(values) => {
        console.log("验证通过，提交的数据:", values);
      }}
      onFinishFailed={(errorInfo) => {
        console.log("验证失败:", errorInfo);
      }}
    />
  );
}
