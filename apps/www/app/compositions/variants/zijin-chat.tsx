"use client";

import * as React from "react";
import { AIMessage, UserMessage } from "@/registry/wuhan/composed/message/message";
import {
  SenderActionBar,
  SenderAttachmentButton,
  SenderContainer,
  SenderSendButton,
  SenderTextarea,
} from "@/registry/wuhan/blocks/sender/sender-01";
import {
  ToggleButtonPrimitive,
} from "@/registry/wuhan/blocks/toggle-button/toggle-button-01";
import { Button } from "@/registry/wuhan/ui/button";
import {
  BarChart3,
  Brain,
  Globe,
  MessageSquareText,
  Search,
  Sparkles,
} from "lucide-react";
import { useChat } from "../hooks/use-chat";
import type { UseChatHistoryReturn } from "../hooks/use-chat-history";
import { LoadingDots } from "../components/loading-dots";
import {
  ComposerAttachmentStrip,
  MessageAttachments,
  toChatAttachmentMeta,
} from "../components/attachments";
import {
  useComposerAttachments,
  type ComposerAttachment,
} from "../hooks/use-composer-attachments";

const ZIJIN_ORANGE_ICON_DATA_URI =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='98' height='98' viewBox='0 0 98 98'><rect width='98' height='98' rx='16' fill='%23F97316'/></svg>";

function ZijinQuickActionButton({
  icon,
  children,
  onClick,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className="h-[34px] gap-[var(--gap-xs)] rounded-[var(--radius-circle)] py-[var(--padding-com-sm)] px-[var(--padding-com-lg)] border border-[var(--border-neutral)] bg-[var(--bg-container)] hover:bg-[var(--bg-neutral-light-hover)] transition-colors font-[var(--font-family-cn)] font-[var(--font-weight-400)] font-size-2 leading-[var(--line-height-2)] tracking-[0px] text-[var(--text-primary)]"
    >
      <span className="text-[var(--text-brand)]">{icon}</span>
      <span>{children}</span>
    </Button>
  );
}

function ZijinSender({
  value,
  onChange,
  attachments,
  onAttachmentRemove,
  deepThink,
  webSearch,
  onToggleDeepThink,
  onToggleWebSearch,
  onAttach,
  onSend,
  isLoading,
  sendDisabled,
}: {
  value: string;
  onChange: (v: string) => void;
  attachments: ComposerAttachment[];
  onAttachmentRemove: (id: string) => void;
  deepThink: boolean;
  webSearch: boolean;
  onToggleDeepThink: () => void;
  onToggleWebSearch: () => void;
  onAttach: () => void;
  onSend: () => void;
  isLoading?: boolean;
  sendDisabled?: boolean;
}) {
  return (
    <SenderContainer
      className="bg-[var(--bg-container)]"
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
    >
      <ComposerAttachmentStrip attachments={attachments} onRemove={onAttachmentRemove} />
      <SenderTextarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="输入你的问题..."
      />

      <SenderActionBar className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SenderAttachmentButton type="button" onClick={onAttach} />
          <ToggleButtonPrimitive type="button" variant="compact" selected={deepThink} onClick={onToggleDeepThink}>
            <Brain className="size-4" />
            深度思考
          </ToggleButtonPrimitive>
          <ToggleButtonPrimitive type="button" variant="compact" selected={webSearch} onClick={onToggleWebSearch}>
            <Globe className="size-4" />
            联网搜索
          </ToggleButtonPrimitive>
        </div>

        <div className="flex items-center gap-2">
          <SenderSendButton type="submit" disabled={sendDisabled} generating={!!isLoading} />
        </div>
      </SenderActionBar>
    </SenderContainer>
  );
}

export function ZijinChat({ history }: { history: UseChatHistoryReturn }) {
  const [value, setValue] = React.useState("");
  const [deepThink, setDeepThink] = React.useState(false);
  const [webSearch, setWebSearch] = React.useState(false);
  const composer = useComposerAttachments();

  // 使用 useMemo 确保 initialMessages 正确响应 currentConversation 的变化
  // 使用 currentConversationId 和 currentConversation 作为依赖，确保切换时能正确更新
  const initialMessages = React.useMemo(() => {
    if (!history.currentConversationId) return [];
    return history.currentConversation?.messages || [];
  }, [history.currentConversationId, history.currentConversation]);

  const { messages, isLoading, sendMessage, removeAttachmentFromMessage } = useChat(
    { variant: "zijin", deepThink, webSearch },
    history.currentConversationId,
    initialMessages,
    (updatedMessages) => {
      if (history.currentConversationId) {
        history.updateConversationMessages(history.currentConversationId, updatedMessages);
      }
    },
  );

  const isEmpty = messages.length === 0;

  const sendWithComposer = async (rawText: string) => {
    const hasUploading = composer.attachments.some((a) => a.loading);
    if (hasUploading || isLoading) return;

    const readyAttachments = composer.attachments
      .filter((a) => !a.loading)
      .map(toChatAttachmentMeta);

    const text = rawText.trim() || (readyAttachments.length > 0 ? "（发送了附件）" : "");
    if (!text.trim() && readyAttachments.length === 0) return;

    setValue("");
    // keep image thumbnails (objectURL) alive for rendering inside message list
    composer.clearAll({ revokeThumbnails: false });

    if (!history.currentConversationId) {
      history.createConversation();
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    await sendMessage(text, readyAttachments);
  };

  const getZijinTimeForIndex = (index: number) => {
    const baseMinutes = 12 * 60 + 25 + index;
    const hh = String(Math.floor(baseMinutes / 60)).padStart(2, "0");
    const mm = String(baseMinutes % 60).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const handleSend = async () => {
    await sendWithComposer(value);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <input
        ref={composer.fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={composer.onFileInputChange}
      />

      {isEmpty ? (
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <div className="w-full max-w-[800px] flex flex-col items-center gap-6">
            <img src={ZIJIN_ORANGE_ICON_DATA_URI} alt="" className="w-[98px] h-[98px]" />
            <div className="text-[var(--text-primary)] font-[var(--font-family-cn)] font-[var(--font-weight-600)] font-size-4 leading-[var(--line-height-2)] tracking-[0px]">你好，我今天能帮你什么？</div>
            <div className="w-full">
              <ZijinSender
                value={value}
                onChange={setValue}
                attachments={composer.attachments}
                onAttachmentRemove={composer.removeAttachment}
                deepThink={deepThink}
                webSearch={webSearch}
                onToggleDeepThink={() => setDeepThink((v) => !v)}
                onToggleWebSearch={() => setWebSearch((v) => !v)}
                onAttach={() => composer.openFileDialog()}
                onSend={handleSend}
                isLoading={isLoading}
                sendDisabled={
                  isLoading ||
                  composer.isUploading ||
                  (!value.trim() && composer.attachments.length === 0)
                }
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <ZijinQuickActionButton
                icon={<MessageSquareText className="size-4" />}
                onClick={() => sendWithComposer("给我一个结论概要")}
              >
                结论概要
              </ZijinQuickActionButton>
              <ZijinQuickActionButton
                icon={<BarChart3 className="size-4" />}
                onClick={() => sendWithComposer("整理成要点清单")}
              >
                要点清单
              </ZijinQuickActionButton>
              <ZijinQuickActionButton
                icon={<Search className="size-4" />}
                onClick={() => sendWithComposer("帮我查找相关资料")}
              >
                查找资料
              </ZijinQuickActionButton>
              <ZijinQuickActionButton
                icon={<Brain className="size-4" />}
                onClick={() => sendWithComposer("给出分析思路")}
              >
                分析思路
              </ZijinQuickActionButton>
              <ZijinQuickActionButton
                icon={<Sparkles className="size-4" />}
                onClick={() => sendWithComposer("生成下一步建议")}
              >
                下一步建议
              </ZijinQuickActionButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="mx-auto w-full max-w-[800px] flex flex-col gap-4">
              {messages.map((m, index) => {
                if (m.role === "user") {
                  return (
                    <div key={m.id} className="flex justify-end w-full">
                      <div className="flex flex-col items-end gap-2 max-w-full">
                        <MessageAttachments
                          attachments={m.attachments}
                        />
                        <UserMessage>{m.content}</UserMessage>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={m.id} className="flex justify-start w-full">
                    <div className="flex flex-col items-start gap-2 max-w-full">
                      <AIMessage
                        status={m.status || "idle"}
                        generatingContent={
                          <div className="flex items-center gap-2">
                            <LoadingDots />
                            <span className="text-[var(--text-secondary)]">正在思考中...</span>
                          </div>
                        }
                      >
                        {m.content}
                      </AIMessage>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 mx-auto w-full max-w-[800px]">
            <ZijinSender
              value={value}
              onChange={setValue}
              attachments={composer.attachments}
              onAttachmentRemove={composer.removeAttachment}
              deepThink={deepThink}
              webSearch={webSearch}
              onToggleDeepThink={() => setDeepThink((v) => !v)}
              onToggleWebSearch={() => setWebSearch((v) => !v)}
              onAttach={() => composer.openFileDialog()}
              onSend={handleSend}
              isLoading={isLoading}
              sendDisabled={
                isLoading ||
                composer.isUploading ||
                (!value.trim() && composer.attachments.length === 0)
              }
            />
            <div className="mt-2 text-center align-middle text-[var(--text-tertiary)] font-[var(--font-family-cn)] font-[var(--font-weight-400)] font-size-1 leading-[var(--line-height-1)] tracking-[0px]">
              所有内容均由人工智能模型输出，不保证信息的准确性和完整性，内容仅供参考
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


