"use client";

import {
  SuggestionButton,
  SuggestionGroup,
} from "@/registry/wuhan/blocks/suggestion/suggestion-01";
import { ArrowRight, ExternalLink, Download } from "lucide-react";

export default function SuggestionCustomIcon() {
  return (
    <SuggestionGroup>
      <SuggestionButton icon={<ArrowRight />} onClick={() => alert("继续")}>
        继续下一步
      </SuggestionButton>
      <SuggestionButton
        icon={<ExternalLink />}
        onClick={() => alert("外部链接")}
      >
        在新窗口打开
      </SuggestionButton>
      <SuggestionButton icon={<Download />} onClick={() => alert("下载")}>
        下载文件
      </SuggestionButton>
    </SuggestionGroup>
  );
}
