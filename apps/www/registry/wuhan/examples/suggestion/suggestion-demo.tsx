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
        <SuggestionButton onClick={() => alert("继续编辑")}>
          继续编辑
        </SuggestionButton>
        <SuggestionButton onClick={() => alert("查看详情")}>
          查看详情
        </SuggestionButton>
        <SuggestionButton onClick={() => alert("分享结果")}>
          分享结果
        </SuggestionButton>
        <SuggestionButton onClick={() => alert("保存草稿")}>
          保存草稿
        </SuggestionButton>
      </SuggestionGroup>
    </div>
  );
}
