"use client";

import { useState } from "react";
import { ResponsiveSender } from "@/registry/wuhan/composed/sender/responsive-sender";
import { QuoteContentComposed } from "@/registry/wuhan/composed/quote-content/quote-content";
import { Button as BlockButton } from "@/registry/wuhan/composed/block-button/block-button";
import { SenderResponsiveAttachmentButton } from "@/registry/wuhan/blocks/sender/sender-responsive-01";
import { SenderResponsiveSendButton } from "@/registry/wuhan/blocks/sender/sender-responsive-01";
import { SenderResponsiveButtonGroup } from "@/registry/wuhan/blocks/sender/sender-responsive-01";
import { Image, FileText, Trash2, Paperclip, Database } from "lucide-react";

export default function SenderResponsiveDemo() {
  const [value, setValue] = useState("");
  const [submitHint, setSubmitHint] = useState("");
  const [overflowStatus, setOverflowStatus] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const canSend = value.trim().length > 0 || attachments.length > 0;

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="w-full max-w-2xl text-sm text-muted-foreground">
        响应式示例：输入框和按钮默认单行，溢出时自动切换到多行布局
      </div>

      {/* 溢出状态指示器 */}
      <div className="w-full max-w-2xl flex items-center gap-2 text-xs">
        <span
          className={`px-2 py-1 rounded ${
            overflowStatus
              ? "bg-amber-100 text-amber-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {overflowStatus ? "多行模式 (溢出)" : "单行模式 (正常)"}
        </span>
      </div>

      <ResponsiveSender
        value={value}
        onChange={setValue}
        placeholder="输入你的需求，溢出时会自动换行"
        quoteContent={
          <QuoteContentComposed content="引用：请帮我总结这段需求，并输出待办列表。" />
        }
        getCanSend={({ value: currentValue }) => currentValue.trim().length > 0}
        sendDisabled={!canSend}
        submitOnEnter
        onOverflowChange={setOverflowStatus}
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

      {/* 示例：使用 buttonGroupChildren 自定义按钮内容 */}
      <ResponsiveSender
        value={value}
        onChange={setValue}
        placeholder="使用 buttonGroupChildren 自定义按钮内容"
        getCanSend={({ value: currentValue }) => currentValue.trim().length > 0}
        sendDisabled={!canSend}
        submitOnEnter
        onOverflowChange={setOverflowStatus}
        buttonGroupChildren={
          <SenderResponsiveButtonGroup isOverflow={overflowStatus}>
            <div className="pr-[var(--gap-sm)] pl-[var(--gap-sm)] gap-[var(--gap-sm)] rounded-[var(--radius-sm)] bg-[var(--bg-neutral-light)]">
              <span className="font-size-1 text-[var(--text-secondary)]">
                0个数据源
              </span>
            </div>
            <SenderResponsiveSendButton type="submit" disabled={!canSend} />
          </SenderResponsiveButtonGroup>
        }
      />

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
