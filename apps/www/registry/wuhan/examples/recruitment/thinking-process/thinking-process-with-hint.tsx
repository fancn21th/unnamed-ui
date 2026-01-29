"use client";

import { ThinkingStep } from "@/registry/wuhan/composed/thinking-process/thinking-process";

export default function ThinkingProcessWithHint() {
  return (
    <div className="w-full h-full max-w-2xl space-y-4">
      <ThinkingStep status="thinking" title="搜索中..." longRunning />
      <ThinkingStep
        status="thinking"
        title="处理中..."
        hint="任务将持续数分钟，可稍后查看"
        longRunning
      />
    </div>
  );
}
