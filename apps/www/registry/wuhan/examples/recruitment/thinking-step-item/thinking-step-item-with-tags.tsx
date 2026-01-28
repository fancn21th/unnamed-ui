"use client";

import * as React from "react";
import { ThinkingStepItem } from "@/registry/wuhan/blocks/thinking-step-item/thinking-step-item-01";
import { Database, Search, FileText } from "lucide-react";

export default function ThinkingStepItemWithTags() {
  return (
    <div className="w-full max-w-2xl space-y-4">
      {/* 带工具调用的子步骤 */}
      <ThinkingStepItem
        status="success"
        title="调取知识库"
        items={[
          {
            toolCall: {
              icon: <Database className="size-4" />,
              title: "知识库查询",
              content: "已从知识库中检索到 5 条相关岗位要求信息",
            },
          },
        ]}
        defaultOpen
      />

      {/* 带多个工具调用的子步骤 */}
      <ThinkingStepItem
        status="success"
        title="多步骤执行"
        items={[
          {
            toolCall: {
              icon: <Search className="size-4" />,
              title: "搜索引擎",
              content: "搜索了相关技术栈和行业趋势",
            },
          },
          {
            toolCall: {
              icon: <Database className="size-4" />,
              title: "数据库查询",
              content: "查询了候选人历史记录",
            },
          },
          {
            toolCall: {
              icon: <FileText className="size-4" />,
              title: "文档分析",
              content: "分析了简历和岗位描述",
            },
          },
        ]}
        defaultOpen
      />
    </div>
  );
}
