"use client";

import * as React from "react";
import { ThinkingStep } from "@/registry/wuhan/blocks/thinking-process/thinking-process-01";

export default function ThinkingProcessDemo() {
  return (
    <div className="w-full h-full max-w-2xl space-y-4">
      {/* 思考中状态 - 不显示时间，标题闪烁 */}
      <ThinkingStep
        status="thinking"
        title="思考中..."
        content="正在分析候选人的简历和岗位要求，评估匹配度..."
        defaultOpen
      />

      {/* 已完成状态 - 显示时间 */}
      <ThinkingStep
        status="completed"
        title="思考完成"
        duration={14}
        content="用户想要了解AI发展的趋势。这是一个比较开放的问题，需要从多个维度来概括当前的主要方向。考虑到用户可能不是专业人士，应该用清晰的结构和易懂的语言来组织信息。"
        defaultOpen
      />
    </div>
  );
}
