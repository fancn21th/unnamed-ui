import * as React from "react";
import { SidebarComposed } from "../../components/wuhan/composed/sidebar";
import { AvatarHeader } from "../../components/wuhan/composed/avatar-header";
import { AIMessage, UserMessage } from "../../components/wuhan/composed/message";
import { ThinkingStep } from "../../components/wuhan/composed/thinking-process";
import type { ThinkingStepItemProps } from "../../components/wuhan/composed/thinking-step-item";
import Markdown from "../../components/wuhan/composed/markdown.tsx";
import { QuoteContentComposed } from "../../components/wuhan/composed/quote-content";
import { ComposedSender } from "../../components/wuhan/composed/sender";
import {
  BookOpen,
  Sparkles,
  Brain,
  Search,
  FileText,
  Image,
} from "lucide-react";

const aiFormMessage = `为了给你提供有价值的 AI 发展趋势分析，我需要了解几个关键点：

\`\`\`dynamic-form
{"title":"补充信息","fields":[{"name":"timeRange","label":"你关注的时间范围是多久？","type":"radio","required":true,"options":[{"label":"短期 1-2 年","value":"1-2"},{"label":"中期 3-5 年","value":"3-5"},{"label":"长期 5-10 年","value":"5-10"}]},{"name":"focusArea","label":"你更关注哪些 AI 技术方向？","type":"radio","options":[{"label":"大模型","value":"llm"},{"label":"多模态","value":"multimodal"},{"label":"生成式 AI","value":"genai"},{"label":"AGI","value":"agi"},{"label":"多选项","value":"other"}]},{"name":"focusAngle","label":"你是从什么角度关注这些趋势？","type":"input","placeholder":"请输入"},{"name":"industry","label":"你是从什么行业关注这些趋势？","type":"select","placeholder":"请选择","options":[{"label":"互联网","value":"internet"},{"label":"金融","value":"finance"},{"label":"制造业","value":"manufacturing"},{"label":"教育","value":"education"},{"label":"医疗","value":"healthcare"}]},{"name":"attachments","label":"你有需要补充上传的文件吗？","type":"input","placeholder":"上传文件"}]}
\`\`\`

已经确认补充信息，我会为您深入分析当前的AI发展趋势，并为您构建 AI设计系统提供坚实的理论支撑。我将先进行深入的研究和梳理。`;

const thinkingSubSteps = [
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

export function NewPage() {
  const [value, setValue] = React.useState("");
  const [selectedModes, setSelectedModes] = React.useState<string[]>([]);
  const [submitHint, setSubmitHint] = React.useState("");
  const [attachments, setAttachments] = React.useState<
    Array<{
      key: string;
      filename: string;
      sizeLabel?: string;
      previewUrl?: string;
      kind: "image" | "doc";
    }>
  >([
    {
      key: "att-1",
      filename: "design-reference.png",
      sizeLabel: "1.8MB",
      previewUrl:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=320&auto=format&fit=crop&q=60",
      kind: "image",
    },
    {
      key: "att-2",
      filename: "requirements.docx",
      sizeLabel: "240KB",
      kind: "doc",
    },
  ]);

  const modes = [
    { key: "deep", name: "深度思考", icon: Brain },
    { key: "web", name: "联网搜索", icon: Search },
  ];

  const quoteContent = (
    <QuoteContentComposed
      content="引用：请帮我总结这段需求，并输出待办列表。"
      onClose={() => undefined}
    />
  );

  return (
    <div className="flex h-[100vh] w-full flex-col overflow-hidden bg-[var(--Page-bg-page)] text-slate-900">
      <header className="flex flex-shrink-0 h-14 items-center justify-between border-b border-slate-200 bg-white px-4">
        <div className="text-sm font-semibold">Agent Console</div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Workspace</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>Online</span>
        </div>
      </header>

      <main className="flex flex-1 gap-4 px-4 py-4 overflow-hidden">
        <SidebarComposed
          conversations={[{ id: "1", title: "Conversation 1" }]}
          header={{
            title: "Agent Console",
            icon: <Sparkles className="size-4" />,
          }}
          footer={({ collapsed }) => (
            <AvatarHeader name={!collapsed ? "User" : null} />
          )}
        />

        <section className="flex flex-1 flex-col rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-3 text-sm font-semibold">
            Conversation
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 text-sm">
            <div className="flex flex-col gap-4">
              <div className="flex justify-end">
                <UserMessage>
                  <Markdown
                    content={"我想了解一下今天的**待办**，请列个清单。"}
                    status="success"
                  />
                </UserMessage>
              </div>
              <div className="flex justify-start">
                <AIMessage>
                  <Markdown
                    content={aiFormMessage}
                    status="success"
                  />
                </AIMessage>
              </div>
              <div className="flex justify-start">
                <AIMessage>
                  <ThinkingStep
                    status="completed"
                    title="思考完成（contentBlocks）"
                    duration={30}
                    contentBlocks={[
                      { type: "subSteps", key: "steps", steps: thinkingSubSteps },
                    ]}
                  />
                </AIMessage>
              </div>
            </div>
          </div>
            <ComposedSender
              value={value}
              onChange={setValue}
              placeholder="输入你的需求，支持附件和模式切换"
              quoteContent={quoteContent}
              attachments={attachments}
              attachmentAdapter={(item) => ({
                id: item.key,
                name: item.filename,
                fileSize: item.sizeLabel,
                thumbnail: item.previewUrl,
                isImage: item.kind === "image",
                icon:
                  item.kind === "image" ? (
                    <Image className="size-4" />
                  ) : (
                    <FileText className="size-4" />
                  ),
              })}
              onAttachmentRemove={(id) =>
                setAttachments((prev) => prev.filter((item) => item.key !== id))
              }
              onAttachmentClick={(item) => {
                // setSubmitHint(`已点击附件：${item.name ?? item.id}`)
                console.log(item);
              }}
              maxAttachments={3}
              accept=".pdf,.docx,.png"
              sizeLimit={5 * 1024 * 1024}
              onAttachRequest={() => {
                const nextId = `att-${Date.now()}`;
                setAttachments((prev) => [
                  ...prev,
                  {
                    key: nextId,
                    filename: "new-attachment.pdf",
                    sizeLabel: "88KB",
                    kind: "doc",
                  },
                ]);
              }}
              onAttachLimitExceed={({ maxAttachments }) =>
                setSubmitHint(`最多只能上传 ${maxAttachments ?? 0} 个附件`)
              }
              modes={modes}
              selectedModes={selectedModes}
              modeAdapter={(mode) => ({
                id: mode.key,
                label: mode.name,
                icon:
                  mode.icon as React.ComponentType<
                    React.SVGProps<SVGSVGElement>
                  >,
              })}
              modeSelection="exclusive"
              allowEmptySelection={false}
              onModeChange={(next) => setSelectedModes(next)}
              getCanSend={({ value, attachments }) =>
                value.trim().length > 0 || attachments.length > 0
              }
              submitOnEnter
              onSubmit={({ canSend, reason }) => {
                if (canSend) {
                  setSubmitHint("");
                  return;
                }
                setSubmitHint(
                  reason === "empty"
                    ? "请输入内容或添加附件"
                    : reason === "generating"
                      ? "内容生成中，请稍候"
                      : reason === "disabled"
                        ? "当前不可发送"
                        : "未满足发送条件",
                );
              }}
              onSend={() => {
                setValue("");
              }}
            />
            {submitHint && (
              <div className="mt-2 text-xs text-slate-500">{submitHint}</div>
            )}
        </section>

        <aside className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-xs font-semibold uppercase text-slate-400">
            Right Panel
          </div>
        </aside>
      </main>
    </div>
  );
}
