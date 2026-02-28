"use client";

import {
  PromptButton,
  PromptGroup,
} from "@/registry/wuhan/composed/prompt/prompt";
import { Sparkles, FileText, Lightbulb } from "lucide-react";

export default function PromptDemo() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h4 className="text-sm font-medium text-[var(--Text-text-primary)] mb-4">
          Prompt 01
        </h4>
        <PromptGroup variant="horizontal">
          <PromptButton
            variant="horizontal"
            icon={<Sparkles />}
            onClick={() => alert("Prompt 01")}
          >
            帮我总结内容
          </PromptButton>
          <PromptButton
            variant="horizontal"
            icon={<FileText />}
            onClick={() => alert("Prompt 01")}
          >
            列一个学习计划
          </PromptButton>
          <PromptButton
            variant="horizontal"
            icon={<Lightbulb />}
            onClick={() => alert("Prompt 01")}
          >
            解释这个概念
          </PromptButton>
        </PromptGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium text-[var(--Text-text-primary)] mb-4">
          Prompt 02
        </h4>
        <PromptGroup variant="vertical">
          <PromptButton
            variant="vertical"
            icon={<Sparkles />}
            onClick={() => alert("Prompt 02")}
          >
            介绍一下人工智能对互联网行业发展的影响
          </PromptButton>
          <PromptButton
            variant="vertical"
            icon={<FileText />}
            onClick={() => alert("Prompt 02")}
          >
            介绍一下人工智能对互联网行业发展的影响
          </PromptButton>
          <PromptButton
            variant="vertical"
            icon={<Lightbulb />}
            onClick={() => alert("Prompt 02")}
          >
            帮我总结内容，并给出学习计划
          </PromptButton>
        </PromptGroup>
      </div>
    </div>
  );
}
