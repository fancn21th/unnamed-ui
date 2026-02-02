"use client";

import { useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { ComposedSender } from "@/registry/wuhan/composed/sender/sender";
import { QuoteContentComposed } from "@/registry/wuhan/composed/quote-content/quote-content";
import { Brain, Search, FileText, Image, Trash2 } from "lucide-react";

export default function SenderDemo() {
  const [value, setValue] = useState("");
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [submitHint, setSubmitHint] = useState("");
  const [attachments, setAttachments] = useState([
    {
      key: "att-1",
      filename: "design-reference.png",
      sizeLabel: "1.8MB",
      previewUrl:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=320&auto=format&fit=crop&q=60",
      kind: "image" as const,
    },
    {
      key: "att-2",
      filename: "requirements.docx",
      sizeLabel: "240KB",
      kind: "doc" as const,
    },
  ]);

  const modes = [
    { key: "deep", name: "深度思考", icon: Brain },
    { key: "web", name: "联网搜索", icon: Search },
  ];
  const canSend = value.trim().length > 0 || attachments.length > 0;

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="w-full max-w-2xl text-sm text-muted-foreground">
        组合示例：数据适配、附件限制、模式策略、发送校验一体化
      </div>
      <ComposedSender
        value={value}
        onChange={setValue}
        placeholder="输入你的需求，支持附件和模式切换"
        quoteContent={
          <QuoteContentComposed content="引用：请帮我总结这段需求，并输出待办列表。" />
        }
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
        onAttachmentClick={(item) =>
          setSubmitHint(`已点击附件：${item.name ?? item.id}`)
        }
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
              kind: "doc" as const,
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
          icon: mode.icon as ComponentType<SVGProps<SVGSVGElement>>,
        })}
        modeSelection="exclusive"
        allowEmptySelection={false}
        onModeChange={(next) => setSelectedModes(next)}
        getCanSend={({
          value: currentValue,
          attachments: currentAttachments,
        }) => currentValue.trim().length > 0 || currentAttachments.length > 0}
        sendDisabled={!canSend}
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
        <div className="w-full max-w-2xl text-xs text-slate-500">
          {submitHint}
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          setValue("");
          setAttachments([]);
        }}
        className="w-full max-w-2xl inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-500 hover:bg-slate-100"
      >
        <Trash2 className="size-3" />
        清空输入与附件
      </button>
    </div>
  );
}
