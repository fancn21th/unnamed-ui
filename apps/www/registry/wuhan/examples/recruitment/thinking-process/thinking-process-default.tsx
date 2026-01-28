"use client";

import * as React from "react";
import { ThinkingStep } from "@/registry/wuhan/blocks/thinking-process/thinking-process-01";

export default function ThinkingProcessDefault() {
  return (
    <div className="w-full h-full max-w-2xl">
      {/* 默认用法 - 已完成状态 */}
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
