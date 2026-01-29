"use client";

import { ThinkingStep } from "@/registry/wuhan/composed/thinking-process/thinking-process";

export default function ThinkingProcessDefault() {
  return (
    <div className="w-full h-full max-w-2xl">
      <ThinkingStep
        status="completed"
        title="思考完成"
        duration={14}
        content="分析完成，已生成详细方案。"
        defaultOpen
      />
    </div>
  );
}
