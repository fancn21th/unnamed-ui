"use client";

import * as React from "react";
import {
  AgentCardPrimitive,
  AgentCardContainerPrimitive,
  AgentCardHeaderPrimitive,
  AgentCardAiIcon,
} from "@/registry/wuhan/blocks/agent-card/agent-card-01";

/**
 * Agent Card 示例数据
 */
const agentExamples = [
  {
    title: "智能写作助手",
    description: "正在分析文档结构",
  },
  {
    title: "数据分析师",
    description: "正在处理数据报表",
  },
  {
    title: "翻译官",
    description: "多语言翻译",
  },
] as const;

export default function AgentCardDemo() {
  return (
    <div className="w-full max-w-[650px] mx-auto p-4 space-y-4">
      {/* 标题 */}
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
        Agent Card 组件示例
      </h2>

      {/* 基础展示 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          基础卡片
        </h3>
        {agentExamples.map((agent, index) => (
          <AgentCardPrimitive
            key={index}
            title={agent.title}
            description={agent.description}
            size="md"
          />
        ))}
      </div>

      {/* 不同尺寸展示 */}
      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          不同尺寸
        </h3>
        <AgentCardPrimitive title="小型卡片" description="小尺寸" size="sm" />
        <AgentCardPrimitive
          title="中型卡片"
          description="中尺寸（默认）"
          size="md"
        />
        <AgentCardPrimitive title="大型卡片" description="大尺寸" size="lg" />
      </div>
    </div>
  );
}
