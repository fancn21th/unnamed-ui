"use client";

import { useRef, useState } from "react";
import {
  DynamicForm,
  type DynamicFormRef,
  type FormSchema,
} from "@/registry/wuhan/composed/dynamic-form/dynamic-form";
import { Button } from "@/registry/wuhan/ui/button";

const schema: FormSchema = {
  title: "设置",
  fields: [
    {
      name: "name",
      label: "名称",
      type: "input",
      required: true,
      placeholder: "请输入名称",
    },
    {
      name: "email",
      label: "邮箱",
      type: "input",
      required: true,
      placeholder: "请输入邮箱",
    },
    {
      name: "theme",
      label: "主题",
      type: "select",
      options: [
        { value: "light", label: "浅色" },
        { value: "dark", label: "深色" },
        { value: "auto", label: "自动" },
      ],
      defaultValue: "auto",
    },
  ],
};

export default function DynamicFormRefMethods() {
  const formRef = useRef<DynamicFormRef>(null);
  const [output, setOutput] = useState<string>("");

  const handleGetValues = () => {
    const values = formRef.current?.getFieldsValue();
    setOutput(`当前值: ${JSON.stringify(values, null, 2)}`);
  };

  const handleGetErrors = () => {
    const errors = formRef.current?.getFieldsError();
    setOutput(`错误信息: ${JSON.stringify(errors, null, 2)}`);
  };

  const handleValidate = async () => {
    try {
      const values = await formRef.current?.validateFields();
      setOutput(`验证通过: ${JSON.stringify(values, null, 2)}`);
    } catch (error) {
      setOutput(`验证失败`);
    }
  };

  const handleReset = () => {
    formRef.current?.resetFields();
    setOutput("表单已重置");
  };

  const handleSetValues = () => {
    formRef.current?.setFields([
      { name: "name", value: "预设名称" },
      { name: "email", value: "preset@example.com" },
      { name: "theme", value: "dark" },
    ]);
    setOutput("已设置预设值");
  };

  return (
    <div className="space-y-4">
      <DynamicForm ref={formRef} schema={schema} showActions={false} />

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleGetValues}>
          获取值
        </Button>
        <Button variant="outline" size="sm" onClick={handleGetErrors}>
          获取错误
        </Button>
        <Button variant="outline" size="sm" onClick={handleValidate}>
          验证
        </Button>
        <Button variant="outline" size="sm" onClick={handleSetValues}>
          设置预设值
        </Button>
        <Button variant="outline" size="sm" onClick={handleReset}>
          重置
        </Button>
      </div>

      {output && (
        <pre className="rounded-md bg-muted p-4 text-sm">
          <code>{output}</code>
        </pre>
      )}
    </div>
  );
}
