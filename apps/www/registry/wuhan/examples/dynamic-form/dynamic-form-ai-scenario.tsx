"use client";

import { useState } from "react";
import {
  DynamicForm,
  type FormSchema,
  generateJsonSchema,
} from "@/registry/wuhan/composed/dynamic-form/dynamic-form";
import { Button } from "@/registry/wuhan/ui/button";

// 模拟 AI 返回的表单配置
const aiGeneratedSchema: FormSchema = {
  title: "旅行计划",
  description: "AI 为您生成的旅行计划表单",
  fields: [
    {
      name: "destination",
      label: "目的地",
      type: "input",
      required: true,
      placeholder: "您想去哪里？",
    },
    {
      name: "duration",
      label: "旅行时长（天）",
      type: "number",
      required: true,
      min: 1,
      max: 30,
      defaultValue: 7,
    },
    {
      name: "budget",
      label: "预算范围",
      type: "slider",
      range: {
        min: 1000,
        max: 50000,
        step: 1000,
      },
      defaultValue: 10000,
    },
    {
      name: "travelStyle",
      label: "旅行风格",
      type: "radio",
      required: true,
      options: [
        { value: "relaxed", label: "休闲放松" },
        { value: "adventure", label: "冒险探索" },
        { value: "cultural", label: "文化体验" },
        { value: "food", label: "美食之旅" },
      ],
      // orientation: "horizontal",
    },
    {
      name: "interests",
      label: "感兴趣的活动",
      type: "checkbox",
      options: [
        { value: "hiking", label: "徒步" },
        { value: "diving", label: "潜水" },
        { value: "museum", label: "博物馆" },
        { value: "shopping", label: "购物" },
      ],
    },
    {
      name: "needGuide",
      label: "需要导游",
      type: "switch",
      defaultValue: false,
    },
    {
      name: "specialRequests",
      label: "特殊要求",
      type: "textarea",
      placeholder: "请告诉我们您的特殊需求...",
    },
  ],
};

export default function DynamicFormAIScenario() {
  const [showSchema, setShowSchema] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  // 生成给 AI 的 JSON Schema
  const jsonSchema = generateJsonSchema(aiGeneratedSchema.fields);

  return (
    <div className="space-y-4">
      <div className="rounded-md border p-4">
        <p className="mb-2 text-sm text-muted-foreground">
          💡 AI 场景：用户说 "帮我规划一次旅行"，AI
          返回以下表单让用户填写详细信息
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSchema(!showSchema)}
        >
          {showSchema ? "隐藏" : "查看"} AI JSON Schema
        </Button>

        {showSchema && (
          <pre className="mt-4 overflow-auto rounded-md bg-muted p-4 text-xs">
            <code>{JSON.stringify(jsonSchema, null, 2)}</code>
          </pre>
        )}
      </div>

      <DynamicForm
        schema={aiGeneratedSchema}
        onFinish={(values) => {
          setFormData(values);
          console.log("用户提交的旅行计划:", values);
        }}
        onValuesChange={(values) => {
          console.log("表单值变化:", values);
        }}
      />

      {formData && (
        <div className="rounded-md border bg-muted/50 p-4">
          <h3 className="mb-2 font-semibold">提交的数据：</h3>
          <pre className="overflow-auto text-xs">
            <code>{JSON.stringify(formData, null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
