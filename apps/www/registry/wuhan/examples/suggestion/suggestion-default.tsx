"use client";

import {
  SuggestionButton,
  SuggestionGroup,
} from "@/registry/wuhan/blocks/suggestion/suggestion-01";

export default function SuggestionDefault() {
  return (
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
    </SuggestionGroup>
  );
}
