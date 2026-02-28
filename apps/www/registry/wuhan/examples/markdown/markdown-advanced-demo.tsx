"use client";

import { useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import Markdown from "@/registry/wuhan/composed/markdown";
import SourcesSidebar from "@/registry/wuhan/composed/sources-sidebar/sources-sidebar";
import type { SourceItem } from "@/registry/wuhan/composed/custom-sources/utils";
import { ExecutionResult } from "@/registry/wuhan/composed/execution-result/execution-result";
import { DynamicForm } from "@/registry/wuhan/composed/dynamic-form/dynamic-form";
import { ThinkingStep } from "@/registry/wuhan/composed/thinking-process/thinking-process";
import { ThinkingLoadingDotsPrimitive } from "@/registry/wuhan/blocks/thinking-process/thinking-process-01";
import type { ThinkingStepItemProps } from "@/registry/wuhan/composed/thinking-step-item/thinking-step-item";

const Badge: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-[var(--Container-bg-brand-light-hover)] px-2 py-0.5 text-xs text-[var(--Text-text-brand)]">
    {children}
  </span>
);

const Callout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="rounded-lg border border-[var(--Border-border-neutral)] bg-[var(--Container-bg-container)] p-3 text-sm text-[var(--Text-text-secondary)]">
    {children}
  </div>
);

const ThinkingProcessBlock = () => {
  const subSteps = [
    {
      status: "success",
      title: "明确研究目标与边界",
      items: [
        {
          content: "明确研究目标与边界，我将调用知识和搜索工具。",
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
      ],
      defaultOpen: true,
    },
    {
      status: "loading",
      title: "对比岗位与简历关键信息",
      items: [{ content: "正在抽取关键技能并计算匹配度..." }],
      defaultOpen: true,
    },
    {
      status: "success",
      title: "生成结论与问题清单",
      items: [{ content: "已生成 10 个面试问题，并输出风险点说明。" }],
      defaultOpen: true,
    },
  ] satisfies ThinkingStepItemProps[];

  return (
    <div className="flex flex-col gap-4">
      <ThinkingStep
        status="thinking"
        title="思考中..."
        content="思考中生成的内容"
      />
      <ThinkingStep
        status="completed"
        title="思考完成"
        duration={14}
        content="用户想要了解AI发展的趋势，需要从多个维度来概括当前的主要方向。"
      />
      <ThinkingStep
        status="completed"
        title="思考完成（contentBlocks）"
        duration={30}
        contentBlocks={[
          {
            type: "text",
            key: "intro",
            content: "下面是本次分析的关键子步骤（可与文字穿插渲染）：",
          },
          { type: "subSteps", key: "steps", steps: subSteps },
          {
            type: "text",
            key: "outro",
            content: "下一步需要补充任务信息以生成最终方案：",
          },
          { type: "node", key: "form", node: <DynamicFormBlock /> },
        ]}
      />
      <ThinkingStep status="thinking" title="搜索中..." longRunning />
      <ThinkingStep
        status="cancelled"
        title="已取消"
        contentBlocks={[{ type: "subSteps", key: "steps", steps: subSteps }]}
      />
      <ThinkingStep
        status="thinking"
        title="思考中（自定义图标）"
        icon={<ThinkingLoadingDotsPrimitive />}
        content="正在汇总候选人的关键信息与风险点..."
      />
    </div>
  );
};

const ExecutionResultBlock = () => (
  <ExecutionResult
    title="执行完成，调用 2 个工具"
    items={[
      {
        status: "success",
        title: "调用 search_api",
        toolName: "search_api",
        sections: [
          { title: "请求", content: "query=ai trends 2026" },
          { title: "响应", content: "返回 12 条结果" },
        ],
      },
      {
        status: "loading",
        title: "调用 summarize_api",
        toolName: "summarize_api",
        sections: [{ title: "响应", content: "正在处理中..." }],
      },
    ]}
  />
);

const DynamicFormBlock = () => (
  <DynamicForm
    schema={{
      title: "需求信息",
      description: "填写任务基础信息",
      fields: [
        {
          name: "title",
          label: "任务名称",
          type: "input",
          required: true,
          placeholder: "例如：生成会议摘要",
        },
        {
          name: "priority",
          label: "优先级",
          type: "select",
          options: [
            { value: "high", label: "高" },
            { value: "medium", label: "中" },
            { value: "low", label: "低" },
          ],
        },
        {
          name: "notify",
          label: "通知我",
          type: "switch",
        },
      ],
    }}
    showActions={false}
  />
);

const DataSourceBadge: React.FC<any> = ({
  children,
  sources,
  onOpenSidebar,
}) => {
  const key = Number.parseInt(String(children ?? "0"), 10);
  return (
    <button
      type="button"
      className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--Container-bg-neutral-light-hover)] px-1 text-[10px] text-[var(--Text-text-primary)]"
      onClick={(event) => {
        event.stopPropagation();
        if (onOpenSidebar && Array.isArray(sources)) {
          onOpenSidebar({ sources, activeKey: Number.isNaN(key) ? 0 : key });
        }
      }}
    >
      {children}
    </button>
  );
};

export default function MarkdownAdvancedDemo() {
  const sources = useMemo<SourceItem[]>(
    () => [
      {
        key: 1,
        title: "内部知识库",
        content: "内部摘要信息，用于展示来源卡片与侧边栏。",
        sourceType: "internal",
      },
      {
        key: 2,
        title: "外部报告",
        content: "外部资料摘要，用于展示外部来源样式。",
        url: "https://example.com/report",
        sourceType: "external",
        domain: "example.com",
        sourceName: "Example",
      },
    ],
    [],
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const content = `# Markdown 自定义能力展示

使用自定义标签渲染徽标 <badge>New</badge>，并插入自定义提示块：

<callout>这是一段自定义组件内容，可用于提示、警告或强调。</callout>

## 业务组件渲染

<thinking-process></thinking-process>

<execution-result></execution-result>

同时支持来源标记 <sup>1</sup> 与外部来源 <sup>2</sup>。

\`\`\`ts
export const hello = () => "Markdown is powerful";
\`\`\`
`;

  return (
    <div className="flex flex-wrap gap-6">
      <div className="min-w-[800px] flex-1 rounded-lg border border-[var(--Border-border-neutral)] p-4">
        <Markdown
          content={content}
          status="success"
          preset="block"
          sources={sources}
          onOpenSidebar={() => setSidebarOpen(true)}
          components={{
            sup: DataSourceBadge,
            callout: Callout,
            "thinking-process": ThinkingProcessBlock,
            "execution-result": ExecutionResultBlock,
          }}
          renderPlugins={[
            ({ components, config }) => ({
              components: { ...components, badge: Badge },
              config,
            }),
          ]}
        />
      </div>

      {sidebarOpen && (
        <div className="shrink-0 rounded-lg border border-[var(--Border-border-neutral)]">
          <SourcesSidebar
            sources={sources}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
