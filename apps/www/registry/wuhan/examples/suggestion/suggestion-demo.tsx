"use client";

import {
  SuggestionButton,
  SuggestionGroup,
} from "@/registry/wuhan/blocks/suggestion/suggestion-01";

export default function SuggestionDemo() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="text-center">
        <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
          接下来你可以
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">选择一个操作继续</p>
      </div>

      <SuggestionGroup>
        <SuggestionButton>
          介绍一下人工智能对互联网行业发展的影响
        </SuggestionButton>
        <SuggestionButton>
          介绍一下人工智能对互联网行业发展的影响，并给出学习计划
        </SuggestionButton>
        <SuggestionButton>
          介绍一下人工智能对互联网行业发展的影响，并给出学习计划
        </SuggestionButton>
      </SuggestionGroup>
    </div>
  );
}
