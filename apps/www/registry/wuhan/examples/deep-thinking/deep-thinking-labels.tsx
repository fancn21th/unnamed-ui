"use client";

import { DeepThinking } from "@/registry/wuhan/composed/deep-thinking/deep-thinking";

export default function DeepThinkingLabels() {
  return (
    <div className="space-y-4 w-full h-full max-w-2xl">
      {/* 中文标签 */}
      <DeepThinking
        status="thinking"
        labels={{
          thinkingTitle: "AI 正在深度分析",
          completedTitle: "分析完毕",
          failedTitle: "分析异常",
        }}
        content="正在进行多维度分析，识别问题的关键要素..."
      />

      {/* 英文标签 */}
      <DeepThinking
        status="completed"
        labels={{
          thinkingTitle: "AI is thinking",
          completedTitle: "Thinking completed",
          failedTitle: "Thinking failed",
        }}
        content="The AI has completed its analysis and is ready to respond. The thinking process included semantic understanding, knowledge retrieval, and logical reasoning."
      />

      {/* 带时长的标签 */}
      <DeepThinking
        status="completed"
        labels={{
          thinkingTitle: "推理中...",
          completedTitle: "推理完成 ✓",
          failedTitle: "推理失败 ✗",
        }}
        title="推理完成 ✓ (耗时 4.2 秒)"
        content="推理过程：问题分解 → 知识检索 → 逻辑分析 → 答案生成"
        defaultOpen
      />
    </div>
  );
}
