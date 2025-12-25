"use client";

import * as React from "react";
import {
  Avatar,
  MessageAvatarHeader,
} from "@/registry/wuhan/blocks/avatar-header/avatar-header-01";
import { AIMessage, UserMessage } from "@/registry/wuhan/blocks/message/message-01";
import {
  SenderAttachmentButton,
  SenderContainer,
  SenderInputRegion,
  SenderSendButton,
  SenderTextarea,
} from "@/registry/wuhan/blocks/sender/sender-01";
import {
  QuickActionButton,
  QuickActionGroup,
  QuickActionIcon,
} from "@/registry/wuhan/blocks/quick-action/quick-action-01";
import { Wand2, Sparkles } from "lucide-react";
import {
  WelcomeContainer,
  WelcomeIcon,
  WelcomeText,
} from "@/registry/wuhan/blocks/welcome/welcome-01";
import { getTimeForIndex } from "../shared";
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

function WenxueSender({
  value,
  onChange,
  attachments,
  onAttachmentRemove,
  onAttach,
  onSend,
  isLoading,
  sendDisabled,
}: {
  value: string;
  onChange: (v: string) => void;
  attachments: ComposerAttachment[];
  onAttachmentRemove: (id: string) => void;
  onAttach: () => void;
  onSend: () => void;
  isLoading?: boolean;
  sendDisabled?: boolean;
}) {
  return (
    <SenderContainer
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
      <SenderInputRegion
        attachmentButton={
          <SenderAttachmentButton type="button" onClick={onAttach} disabled={isLoading} />
        }
        actions={
          <SenderSendButton type="submit" disabled={sendDisabled} generating={!!isLoading} />
        }
      />
    </SenderContainer>
  );
}

export function WenxueChat({ history }: { history: UseChatHistoryReturn }) {
  const [value, setValue] = React.useState("");
  const composer = useComposerAttachments();

  // 使用 useMemo 确保 initialMessages 正确响应 currentConversation 的变化
  // 使用 currentConversationId 和 currentConversation 作为依赖，确保切换时能正确更新
  const initialMessages = React.useMemo(() => {
    if (!history.currentConversationId) return [];
    return history.currentConversation?.messages || [];
  }, [history.currentConversationId, history.currentConversation]);

  const { messages, isLoading, sendMessage, removeAttachmentFromMessage } = useChat(
    { variant: "wenxue" },
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
            <WelcomeContainer>
              <WelcomeIcon>
                <Wand2 />
              </WelcomeIcon>
              <WelcomeText>你好，我今天能帮你什么？</WelcomeText>
            </WelcomeContainer>

            <QuickActionGroup>
              <QuickActionButton
                onClick={() => sendWithComposer("帮我总结一下这段内容")}
              >
                <QuickActionIcon>
                  <Sparkles className="size-4" />
                </QuickActionIcon>
                <span>帮我总结一下这段内容</span>
              </QuickActionButton>
              <QuickActionButton
                onClick={() => sendWithComposer("给我列一个学习计划")}
              >
                <QuickActionIcon>
                  <Sparkles className="size-4" />
                </QuickActionIcon>
                <span>给我列一个学习计划</span>
              </QuickActionButton>
            </QuickActionGroup>

            <div className="w-full">
              <WenxueSender
                value={value}
                onChange={setValue}
                attachments={composer.attachments}
                onAttachmentRemove={composer.removeAttachment}
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
                        <MessageAvatarHeader
                          name="User"
                          time={getTimeForIndex(index)}
                          avatar={
                            <Avatar className="flex items-center justify-center text-[var(--text-secondary)]">
                            </Avatar>
                          }
                        />
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
                      <MessageAvatarHeader
                        name="AI"
                        time={getTimeForIndex(index)}
                        avatar={
                          <Avatar className="flex items-center justify-center text-[var(--text-secondary)]">
                          </Avatar>
                        }
                      />
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
            <WenxueSender
              value={value}
              onChange={setValue}
              onAttach={() => composer.openFileDialog()}
              onSend={handleSend}
              isLoading={isLoading}
              attachments={composer.attachments}
              onAttachmentRemove={composer.removeAttachment}
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


