"use client";

import { BookOpen } from "lucide-react";
import { ThinkingStep } from "@/registry/wuhan/composed/thinking-process/thinking-process";
import type { ThinkingStepItemProps } from "@/registry/wuhan/composed/thinking-step-item/thinking-step-item";

export default function ThinkingProcessCustom() {
  const steps: ThinkingStepItemProps[] = [
    {
      status: "success",
      title: "整理需求",
      items: [
        {
          content: "明确目标与范围。",
          toolCall: {
            icon: <BookOpen className="size-4" />,
            title: "调取知识",
            content: "读取历史资料",
          },
        },
      ],
    },
    {
      status: "loading",
      title: "分析方案",
      items: [{ content: "正在生成分析结构..." }],
    },
  ];

  return (
    <div className="w-full h-full max-w-2xl">
      <ThinkingStep
        status="completed"
        title="思考完成"
        duration={24}
        contentBlocks={[
          { type: "text", key: "intro", content: "下面是关键子步骤：" },
          { type: "subSteps", key: "steps", steps },
          { type: "text", key: "outro", content: "以上步骤已完成。" },
        ]}
        defaultOpen
      />
    </div>
  );
}
