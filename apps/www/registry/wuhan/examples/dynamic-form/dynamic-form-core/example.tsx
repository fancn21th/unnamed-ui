"use client";

import * as React from "react";
import { useRef } from "react";
import * as z from "zod";
import {
  DynamicForm,
  type DynamicFormRef,
  type FormSchema,
} from "./index";
import { Button } from "@/registry/wuhan/ui/button";

/**
 * DynamicForm 使用示例
 * 演示了基础用法、表单验证、实例方法调用等功能
 */
export default function DynamicFormExample() {
  const formRef = useRef<DynamicFormRef>(null);

  // 表单配置 Schema
  const schema: FormSchema = {
    title: "Bug 反馈表单",
    description: "请填写以下信息帮助我们更好地解决问题",
    fields: [
      {
        name: "title",
        label: "Bug 标题",
        type: "input",
        placeholder: "简要描述遇到的问题",
        required: true,
        description: "请用简洁的语言描述问题",
      },
      {
        name: "description",
        label: "详细描述",
        type: "textarea",
        placeholder: "请详细描述问题的复现步骤、预期结果和实际结果...",
        required: true,
      },
      {
        name: "priority",
        label: "优先级",
        type: "select",
        defaultValue: "medium",
        options: [
          { value: "low", label: "低 - 不影响使用" },
          { value: "medium", label: "中 - 部分功能受影响" },
          { value: "high", label: "高 - 严重影响使用" },
          { value: "critical", label: "紧急 - 系统无法使用" },
        ],
        description: "根据问题的严重程度选择优先级",
      },
      {
        name: "category",
        label: "问题分类",
        type: "radio",
        defaultValue: "ui",
        options: [
          { value: "ui", label: "界面问题" },
          { value: "function", label: "功能异常" },
          { value: "performance", label: "性能问题" },
          { value: "other", label: "其他" },
        ],
        orientation: "horizontal",
      },
      {
        name: "reproducible",
        label: "是否可复现",
        type: "switch",
        defaultValue: true,
        description: "该问题是否能够稳定复现",
      },
      {
        name: "severity",
        label: "影响范围",
        type: "slider",
        defaultValue: 50,
        range: {
          min: 0,
          max: 100,
          step: 10,
        },
        description: "受影响的功能或用户比例（0-100）",
      },
      {
        name: "attachScreenshot",
        label: "已附加截图",
        type: "checkbox",
        defaultValue: false,
      },
    ],
  };

  // Zod 验证 Schema
  const validateSchema = z.object({
    title: z
      .string()
      .min(5, "标题至少需要 5 个字符")
      .max(50, "标题最多 50 个字符"),
    description: z
      .string()
      .min(20, "描述至少需要 20 个字符")
      .max(500, "描述最多 500 个字符"),
    priority: z.enum(["low", "medium", "high", "critical"]),
    category: z.enum(["ui", "function", "performance", "other"]),
    reproducible: z.boolean(),
    severity: z.number().min(0).max(100),
    attachScreenshot: z.boolean(),
  });

  // 表单提交成功
  const handleFinish = (values: Record<string, any>) => {
    console.log("表单提交成功:", values);
    alert("Bug 反馈已提交！\n" + JSON.stringify(values, null, 2));
  };

  // 表单提交失败
  const handleFinishFailed = (errorInfo: any) => {
    console.error("表单验证失败:", errorInfo);
  };

  // 表单值变化
  const handleValuesChange = (values: Record<string, any>) => {
    console.log("表单值变化:", values);
  };

  // 获取表单值
  const handleGetValues = () => {
    const values = formRef.current?.getFieldsValue();
    console.log("当前表单值:", values);
    alert("当前表单值：\n" + JSON.stringify(values, null, 2));
  };

  // 验证表单
  const handleValidate = async () => {
    try {
      const values = await formRef.current?.validateFields();
      console.log("验证通过:", values);
      alert("表单验证通过！");
    } catch (error) {
      console.error("验证失败:", error);
      alert("表单验证失败，请检查输入！");
    }
  };

  // 设置字段值
  const handleSetFields = () => {
    formRef.current?.setFields([
      { name: "title", value: "示例 Bug 标题" },
      { name: "description", value: "这是一个示例描述，用于演示 setFields 方法的使用。" },
      { name: "priority", value: "high" },
    ]);
  };

  // 重置表单
  const handleReset = () => {
    formRef.current?.resetFields();
  };

  // 手动提交
  const handleManualSubmit = async () => {
    await formRef.current?.submit();
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      {/* 主表单 */}
      <DynamicForm
        ref={formRef}
        schema={schema}
        validateSchema={validateSchema}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        onValuesChange={handleValuesChange}
      />

      {/* 实例方法演示 */}
      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-semibold">实例方法演示</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleGetValues}>
            获取表单值
          </Button>
          <Button variant="outline" onClick={handleValidate}>
            验证表单
          </Button>
          <Button variant="outline" onClick={handleSetFields}>
            设置字段值
          </Button>
          <Button variant="outline" onClick={handleReset}>
            重置表单
          </Button>
          <Button variant="outline" onClick={handleManualSubmit}>
            手动提交
          </Button>
        </div>
      </div>

      {/* 只读模式示例 */}
      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-semibold">只读模式预览</h3>
        <DynamicForm
          schema={{
            ...schema,
            title: "已提交的 Bug 报告",
          }}
          initialValues={{
            title: "登录页面无法加载",
            description:
              "当用户尝试访问登录页面时，页面显示空白。已在 Chrome 和 Firefox 浏览器中复现。",
            priority: "high",
            category: "function",
            reproducible: true,
            severity: 80,
            attachScreenshot: true,
          }}
          readonly={true}
          showActions={false}
        />
      </div>
    </div>
  );
}
