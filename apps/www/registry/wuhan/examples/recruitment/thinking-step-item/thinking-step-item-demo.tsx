"use client";

import * as React from "react";
import { ThinkingStepItem } from "@/registry/wuhan/blocks/thinking-step-item/thinking-step-item-01";
import { BookOpen } from "lucide-react";

export default function ThinkingStepItemDemo() {
  return (
    <div className="w-full max-w-2xl space-y-4">
      {/* 成功状态 - 带引导句、工具调用和文件列表（符合图片效果） */}
      <ThinkingStepItem
        status="success"
        title="明确研究目标与边界"
        items={[
          {
            content: "明确研究目标与边界,我将调用知识和搜索工具",
            toolCall: {
              icon: <BookOpen className="size-4" />,
              title: "调取知识",
              content: "我正在调取知识库资料",
            },
            files: [
              { icon: "📄", name: "AI发展趋势.pdf" },
              { icon: "📄", name: "AI发展历史.doc" },
            ],
          },
        ]}
        defaultOpen
      />

      {/* 取消状态 */}
      <ThinkingStepItem
        status="cancel"
        title="已取消"
        items={[]}
        defaultOpen
      />

      {/* 加载中状态 */}
      <ThinkingStepItem
        status="loading"
        title="正在解析简历信息"
        items={[
          {
            content:
              "正在提取候选人的基本信息、工作经历、教育背景和技能列表...",
          },
        ]}
        defaultOpen
      />

      {/* 成功状态 - 带工具调用 */}
      <ThinkingStepItem
        status="success"
        title="调取知识库"
        items={[
          {
            toolCall: {
              icon: <BookOpen className="size-4" />,
              title: "调取知识",
              content: "已从知识库中检索到 5 条相关岗位要求信息",
            },
          },
        ]}
        defaultOpen
      />

      {/* 错误状态 */}
      <ThinkingStepItem
        status="error"
        title="API 调用失败"
        items={[
          {
            content: "无法连接到外部 API 服务，请检查网络连接后重试。",
          },
        ]}
        defaultOpen
      />
    </div>
  );
}
