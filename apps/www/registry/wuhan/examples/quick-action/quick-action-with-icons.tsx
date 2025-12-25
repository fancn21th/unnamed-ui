"use client";

import {
  QuickActionButton,
  QuickActionGroup,
  QuickActionIcon,
} from "@/registry/wuhan/blocks/quick-action/quick-action-01";
import { Sparkles, FileText, Lightbulb, BookOpen } from "lucide-react";

export default function QuickActionWithIcons() {
  return (
    <QuickActionGroup>
      <QuickActionButton onClick={() => alert("总结内容")}>
        <QuickActionIcon>
          <Sparkles className="size-4" />
        </QuickActionIcon>
        <span>帮我总结一下这段内容</span>
      </QuickActionButton>
      <QuickActionButton onClick={() => alert("学习计划")}>
        <QuickActionIcon>
          <FileText className="size-4" />
        </QuickActionIcon>
        <span>给我列一个学习计划</span>
      </QuickActionButton>
      <QuickActionButton onClick={() => alert("解释概念")}>
        <QuickActionIcon>
          <Lightbulb className="size-4" />
        </QuickActionIcon>
        <span>解释一下这个概念</span>
      </QuickActionButton>
      <QuickActionButton onClick={() => alert("推荐资源")}>
        <QuickActionIcon>
          <BookOpen className="size-4" />
        </QuickActionIcon>
        <span>推荐一些学习资源</span>
      </QuickActionButton>
    </QuickActionGroup>
  );
}
