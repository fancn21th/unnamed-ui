"use client";

import {
  PromptButton,
  PromptGroup,
} from "@/registry/wuhan/blocks/prompt/prompt-01";
import { Sparkles, FileText, Lightbulb, BookOpen } from "lucide-react";

export default function PromptHorizontal() {
  return (
    <PromptGroup>
      <PromptButton icon={<Sparkles />} onClick={() => alert("总结内容")}>
        帮我总结一下这段内容
      </PromptButton>
      <PromptButton icon={<FileText />} onClick={() => alert("学习计划")}>
        给我列一个学习计划
      </PromptButton>
      <PromptButton icon={<Lightbulb />} onClick={() => alert("解释概念")}>
        解释一下这个概念
      </PromptButton>
      <PromptButton icon={<BookOpen />} onClick={() => alert("推荐资源")}>
        推荐一些学习资源
      </PromptButton>
    </PromptGroup>
  );
}
