"use client";

import { BookOpen } from "lucide-react";
import { ThinkingStepItem } from "@/registry/wuhan/blocks/thinking-step-item/thinking-step-item-01";

export default function ThinkingStepItemDemo() {
  return (
    <div className="w-full max-w-2xl space-y-4 h-full">
      {/* 默认：不启用折叠（内容直接展示，无箭头） */}
      <ThinkingStepItem
        status="success"
        title="明确研究目标与边界"
        statusIcon={<BookOpen className="size-4" />}
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
      />

      {/* 可选：启用折叠（展示箭头，支持展开/收起） */}
      <ThinkingStepItem
        collapsible
        status="success"
        title="（可折叠）查看详情"
        items={[
          {
            key: "collapsible",
            content: "当你传入 collapsible 时才会启用展开/收起交互。",
          },
        ]}
        defaultOpen={false}
      />

      {/* 取消状态（默认不折叠） */}
      <ThinkingStepItem status="cancel" title="已取消" items={[]} />

      {/* 加载中状态 */}
      <ThinkingStepItem
        status="loading"
        title="正在解析简历信息"
        items={[
          {
            // 不传 content：将自动显示“思考中...”并闪烁
            toolCall: {
              icon: <BookOpen className="size-4" />,
              title: "解析中",
              content: "正在处理附件与字段映射",
            },
          },
        ]}
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
      />
    </div>
  );
}
