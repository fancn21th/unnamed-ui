"use client";

import { AgentCard } from "@/registry/wuhan/composed/agent-card/agent-card";
import { Bot, Cpu, Sparkles } from "lucide-react";

export default function AgentCardCustomIconDemo() {
  return (
    <div className="w-full max-w-[650px] space-y-3">
      <AgentCard
        title="写作助手"
        description="智能写作辅助"
        icon={<Bot className="size-5 text-[var(--text-brand)]" />}
      />
      <AgentCard
        title="计算引擎"
        description="高性能计算"
        icon={<Cpu className="size-5 text-[var(--text-brand)]" />}
      />
      <AgentCard
        title="翻译官"
        description="多语言翻译"
        icon={<Sparkles className="size-5 text-[var(--text-brand)]" />}
      />
    </div>
  );
}
