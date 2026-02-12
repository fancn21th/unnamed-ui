"use client";

import { AgentCardPrimitive } from "@/registry/wuhan/blocks/agent-card/agent-card-01";

export default function AgentCardBasicDemo() {
  return (
    <div className="w-full max-w-[650px] space-y-3">
      <AgentCardPrimitive
        title="智能写作助手"
        description="正在分析文档结构"
        size="md"
      />
      <AgentCardPrimitive
        title="数据分析师"
        description="正在处理数据报表"
        size="md"
      />
      <AgentCardPrimitive title="翻译官" description="多语言翻译" size="md" />
    </div>
  );
}
