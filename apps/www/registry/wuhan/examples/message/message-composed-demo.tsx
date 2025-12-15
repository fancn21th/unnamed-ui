"use client";

/**
 * 示例：基于原语组件构建便捷的组合组件
 *
 * 这个示例展示了如何：
 * 1. 基于原语组件构建业务特定的组合组件
 * 2. 保持完全的可定制性
 * 3. 提供合理的默认值，但不强制使用
 *
 * 注意：
 * - 可以使用 AIMessage/UserMessage（业务组件，包含状态逻辑）
 * - 也可以使用 MessageAIPrimitive/MessageUserPrimitive（原语组件，纯样式）
 * - 原语组件适合需要完全自定义的场景
 */

import {
  AIMessage,
  UserMessage,
  MessageAIPrimitive,
  MessageUserPrimitive,
} from "@/registry/wuhan/blocks/message/message-01";
import { Button } from "@/registry/wuhan/ui/button";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";

// ==================== 业务特定的类型定义 ====================
// 用户可以根据自己的业务需求定义类型

export interface MessageItem {
  id: string;
  role: "user" | "assistant";
  content: React.ReactNode;
  timestamp?: Date | string;
  feedback?: MessageFeedback;
}

export interface MessageFeedback {
  onCopy?: () => void;
}

// ==================== 业务特定的组合组件 ====================
// 这些组件基于原语构建，提供业务特定的便捷封装
// 但用户仍然可以完全自定义或直接使用原语

interface FeedbackButtonsProps {
  feedback?: MessageFeedback;
  className?: string;
}

function FeedbackButtons({ feedback, className }: FeedbackButtonsProps) {
  if (!feedback) return null;

  return (
    <div className={cn("flex items-center", className)}>
      {feedback.onCopy && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6"
          onClick={feedback.onCopy}
        >
          <Copy className={cn("size-4", "text-[var(--text-secondary)]")} />
        </Button>
      )}
    </div>
  );
}

interface MessageItemRendererProps {
  message: MessageItem;
  onFeedbackChange?: (id: string, feedback: Partial<MessageFeedback>) => void;
}

function MessageItemRenderer({
  message,
  onFeedbackChange,
}: MessageItemRendererProps) {
  const handleCopy = () => {
    if (typeof message.content === "string") {
      navigator.clipboard.writeText(message.content);
    }
    message.feedback?.onCopy?.();
  };

  const feedbackProps: MessageFeedback = {
    ...message.feedback,
    onCopy: handleCopy,
  };

  if (message.role === "user") {
    // 用户消息：hover 时显示反馈区域，只有复制按钮，反馈区域始终右对齐
    const userFeedbackProps: MessageFeedback = {
      ...feedbackProps,
    };

    return (
      <div className="flex justify-end w-full">
        <div className="w-fit max-w-full group/message">
          <UserMessage>{message.content}</UserMessage>
          {/* 预留反馈区域位置，hover 到消息时显示，始终右对齐 */}
          <div className="flex justify-end opacity-0 group-hover/message:opacity-100 transition-opacity min-h-[32px]">
            {message.feedback?.onCopy && (
              <FeedbackButtons feedback={userFeedbackProps} />
            )}
          </div>
        </div>
      </div>
    );
  }

  // AI 消息：hover 时显示反馈区域
  return (
    <div className="flex justify-start w-full">
      <div className="w-fit max-w-full group/message">
        <AIMessage>{message.content}</AIMessage>
        {/* hover 到消息时显示反馈区域 */}
        <div className="flex justify-end opacity-0 group-hover/message:opacity-100 transition-opacity min-h-[32px]">
          {message.feedback && <FeedbackButtons feedback={feedbackProps} />}
        </div>
      </div>
    </div>
  );
}

// ==================== 高级组合组件 ====================
// 基于原语和业务组件构建的完整 MessageList 组件
// 用户可以完全自定义或直接使用原语

interface ComposedMessageListProps {
  messages: MessageItem[];
  onFeedbackChange?: (id: string, feedback: Partial<MessageFeedback>) => void;
  className?: string;
}

export function ComposedMessageList({
  messages,
  onFeedbackChange,
  className,
}: ComposedMessageListProps) {
  return (
    <div className={cn("flex flex-col w-full h-full", className)}>
      {messages.map((message) => (
        <MessageItemRenderer
          key={message.id}
          message={message}
          onFeedbackChange={onFeedbackChange}
        />
      ))}
    </div>
  );
}
