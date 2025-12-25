"use client";

import {
  PromptButton as PromptButtonHorizontal,
  PromptGroup as PromptGroup01,
} from "@/registry/wuhan/blocks/prompt/prompt-01";
import {
  PromptButton as PromptButtonVertical,
  PromptGroup as PromptGroup02,
} from "@/registry/wuhan/blocks/prompt/prompt-02";
import { Sparkles, FileText, Lightbulb } from "lucide-react";

export default function PromptDemo() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-4">
          Prompt 01
        </h4>
        <PromptGroup01>
          <PromptButtonHorizontal
            icon={<Sparkles />}
            onClick={() => alert("Prompt 01")}
          >
            帮我总结内容
          </PromptButtonHorizontal>
          <PromptButtonHorizontal
            icon={<FileText />}
            onClick={() => alert("Prompt 01")}
          >
            列一个学习计划
          </PromptButtonHorizontal>
          <PromptButtonHorizontal
            icon={<Lightbulb />}
            onClick={() => alert("Prompt 01")}
          >
            解释这个概念
          </PromptButtonHorizontal>
        </PromptGroup01>
      </div>

      <div>
        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-4">
          Prompt 02
        </h4>
        <PromptGroup02>
          <PromptButtonVertical
            icon={<Sparkles />}
            onClick={() => alert("Prompt 02")}
          >
            介绍一下人工智能对互联网行业发展的影响
          </PromptButtonVertical>
          <PromptButtonVertical
            icon={<FileText />}
            onClick={() => alert("Prompt 02")}
          >
            介绍一下人工智能对互联网行业发展的影响
          </PromptButtonVertical>
          <PromptButtonVertical
            icon={<Lightbulb />}
            onClick={() => alert("Prompt 02")}
          >
            帮我总结内容，并给出学习计划
          </PromptButtonVertical>
        </PromptGroup02>
      </div>
    </div>
  );
}
