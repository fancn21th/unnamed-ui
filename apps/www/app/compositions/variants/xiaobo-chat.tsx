"use client";

import * as React from "react";
import {
  Avatar,
  MessageAvatarHeader,
} from "@/registry/wuhan/blocks/avatar-header/avatar-header-01";
import { AIMessage, UserMessage } from "@/registry/wuhan/composed/message/message";
import {
  SenderActionBar,
  SenderContainer,
  SenderSendButton,
  SenderTextarea,
} from "@/registry/wuhan/blocks/sender/sender-01";
import {
  ToggleButtonPrimitive,
} from "@/registry/wuhan/blocks/toggle-button/toggle-button-01";
import { Button } from "@/registry/wuhan/ui/button";
import { Brain, Globe, Search, Sparkles } from "lucide-react";
import { getTimeForIndex } from "../shared";
import { useChat } from "../hooks/use-chat";
import type { UseChatHistoryReturn } from "../hooks/use-chat-history";
import { LoadingDots } from "../components/loading-dots";
import { cn } from "@/lib/utils";

const XIAOBO_ICON_DATA_URI =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><rect width='80' height='80' rx='16' fill='%233B88B8'/></svg>";

function XiaoboPromptCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className="w-[224px] h-auto p-[var(--padding-com-lg)] gap-[var(--gap-sm)] rounded-[var(--radius-xl)] bg-[var(--bg-container)] border border-[var(--border-neutral)] hover:bg-[var(--bg-neutral-light-hover)] transition-colors flex flex-col items-start text-left"
    >
      <span className="inline-flex items-center justify-center w-6 h-6 p-[var(--gap-xs)] rounded-[var(--radius-sm)] bg-[var(--bg-brand-light)]">
        <span className="text-[var(--text-brand)]">{icon}</span>
      </span>
      <span className="text-[var(--text-secondary)] font-[var(--font-family-cn)] font-[var(--font-weight-400)] font-size-1 leading-[var(--line-height-1)] tracking-[0px]">
        {description}
      </span>
    </Button>
  );
}

function XiaoboSender({
  value,
  onChange,
  deepThink,
  webSearch,
  onToggleDeepThink,
  onToggleWebSearch,
  onSend,
  isLoading,
}: {
  value: string;
  onChange: (v: string) => void;
  deepThink: boolean;
  webSearch: boolean;
  onToggleDeepThink: () => void;
  onToggleWebSearch: () => void;
  onSend: () => void;
  isLoading?: boolean;
}) {
  return (
    <SenderContainer
      className="bg-[var(--bg-container)]"
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
    >
      <SenderTextarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="输入你的问题..."
      />

      <SenderActionBar className="flex items-center justify-between">
        {/* 深度思考和联网搜索：未选中时使用 bg-[var(--bg-neutral-light)] */}
        <div className="flex items-center gap-2">
          <ToggleButtonPrimitive
            type="button"
            variant="compact"
            selected={deepThink}
            onClick={onToggleDeepThink}
            className={cn(
              "h-8 gap-[var(--gap-xs)] rounded-[var(--radius-circle)] px-[var(--padding-com-md)] border-0 transition-colors font-[var(--font-family-cn)] font-size-2 leading-[var(--line-height-2)] tracking-[0px]",
              "hover:bg-[var(--bg-neutral-light-hover)]",
              !deepThink && "bg-[var(--bg-neutral-light)] text-[var(--text-secondary)]"
            )}
          >
            <Brain className="size-4" />
            深度思考
          </ToggleButtonPrimitive>
          <ToggleButtonPrimitive
            type="button"
            variant="compact"
            selected={webSearch}
            onClick={onToggleWebSearch}
            className={cn(
              "h-8 gap-[var(--gap-xs)] rounded-[var(--radius-circle)] px-[var(--padding-com-md)] border-0 transition-colors font-[var(--font-family-cn)] font-size-2 leading-[var(--line-height-2)] tracking-[0px]",
              "hover:bg-[var(--bg-neutral-light-hover)]",
              !webSearch && "bg-[var(--bg-neutral-light)] text-[var(--text-secondary)]"
            )}
          >
            <Globe className="size-4" />
            联网搜索
          </ToggleButtonPrimitive>
        </div>

        <div className="flex items-center gap-2">
          <SenderSendButton type="submit" disabled={!value.trim() || isLoading} />
        </div>
      </SenderActionBar>
    </SenderContainer>
  );
}

export function XiaoboChat({ history }: { history: UseChatHistoryReturn }) {
  const [value, setValue] = React.useState("");
  const [deepThink, setDeepThink] = React.useState(false);
  const [webSearch, setWebSearch] = React.useState(false);

  // 使用 useMemo 确保 initialMessages 正确响应 currentConversation 的变化
  // 使用 currentConversationId 和 currentConversation 作为依赖，确保切换时能正确更新
  const initialMessages = React.useMemo(() => {
    if (!history.currentConversationId) return [];
    return history.currentConversation?.messages || [];
  }, [history.currentConversationId, history.currentConversation]);

  const { messages, isLoading, sendMessage } = useChat(
    { variant: "medical", deepThink, webSearch },
    history.currentConversationId,
    initialMessages,
    (updatedMessages) => {
      if (history.currentConversationId) {
        history.updateConversationMessages(history.currentConversationId, updatedMessages);
      }
    },
  );

  const isEmpty = messages.length === 0;

  const handleSend = async () => {
    if (!value.trim() || isLoading) return;

    const text = value.trim();
    setValue("");

    if (!history.currentConversationId) {
      history.createConversation();
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    await sendMessage(text);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {isEmpty ? (
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <div className="w-full max-w-[800px] flex flex-col items-center gap-6">
            <div className="flex items-center justify-center gap-4">
              <img src={XIAOBO_ICON_DATA_URI} alt="" className="w-[80px] h-[80px]" />
              <div className="text-[var(--text-primary)] font-[var(--font-family-cn)] font-semibold font-size-6 leading-[var(--line-height-6)] tracking-[0px]">
                你好，我今天能帮你什么？
              </div>
            </div>

            <div className="w-full">
              <XiaoboSender
                value={value}
                onChange={setValue}
                deepThink={deepThink}
                webSearch={webSearch}
                onToggleDeepThink={() => setDeepThink((v) => !v)}
                onToggleWebSearch={() => setWebSearch((v) => !v)}
                onSend={handleSend}
                isLoading={isLoading}
              />
            </div>

            <div className="flex flex-wrap items-start justify-center gap-3">
              <XiaoboPromptCard
                icon={<Sparkles className="size-4" />}
                title="用药建议"
                description="基于描述给出用药方向"
                onClick={() => sendMessage("请给出用药建议")}
              />
              <XiaoboPromptCard
                icon={<Search className="size-4" />}
                title="不良反应"
                description="常见不良反应与注意事项"
                onClick={() => sendMessage("请说明不良反应")}
              />
              <XiaoboPromptCard
                icon={<Brain className="size-4" />}
                title="检查解读"
                description="帮助解读检查/检验结果"
                onClick={() => sendMessage("帮我解读检查结果")}
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
            <XiaoboSender
              value={value}
              onChange={setValue}
              deepThink={deepThink}
              webSearch={webSearch}
              onToggleDeepThink={() => setDeepThink((v) => !v)}
              onToggleWebSearch={() => setWebSearch((v) => !v)}
              onSend={handleSend}
              isLoading={isLoading}
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


