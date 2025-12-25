"use client";

import {
  QuickActionButton,
  QuickActionGroup,
  QuickActionIcon,
} from "@/registry/wuhan/blocks/quick-action/quick-action-01";
import {
  Sparkles,
  FileText,
  Lightbulb,
  BookOpen,
  Code,
  MessageSquare,
} from "lucide-react";

export default function QuickActionDemo() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="text-center">
        <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
          你好，我今天能帮你什么？
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
          选择一个快速操作开始对话
        </p>
      </div>

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
        <QuickActionButton onClick={() => alert("代码审查")}>
          <QuickActionIcon>
            <Code className="size-4" />
          </QuickActionIcon>
          <span>帮我审查这段代码</span>
        </QuickActionButton>
        <QuickActionButton onClick={() => alert("翻译文本")}>
          <QuickActionIcon>
            <MessageSquare className="size-4" />
          </QuickActionIcon>
          <span>翻译这段文本</span>
        </QuickActionButton>
      </QuickActionGroup>
    </div>
  );
}
