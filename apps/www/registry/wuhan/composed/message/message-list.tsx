"use client";

import * as React from "react";
import {
  AIMessage,
  UserMessage,
  MessageFeedbackActions,
  type AIMessageStatus,
} from "@/registry/wuhan/composed/message/message";
import { AvatarHeader } from "@/registry/wuhan/composed/avatar-header/avatar-header";
import { cn } from "@/lib/utils";

/**
 * 消息角色类型
 * @public
 */
export type MessageRole = "user" | "ai";

/**
 * 头像配置
 * @public
 */
export interface MessageAvatar {
  /** 头像图片 URL 或 ReactNode */
  src?: string | React.ReactNode;
  /** 头像图标 */
  icon?: React.ReactNode;
  /** 头像大小 */
  size?: "small" | "default" | "large";
  /** 名称 */
  name?: React.ReactNode;
  /** 时间 */
  time?: React.ReactNode;
}

/**
 * 消息项数据结构
 * @public
 */
export interface MessageItem {
  /** 唯一消息 ID */
  id: string;
  /** 消息角色 */
  role: MessageRole;
  /** 消息内容 */
  content: React.ReactNode;
  /** 时间戳 */
  timestamp?: number;
  /** 反馈内容（消息下方的反馈按钮等），不传且 showDefaultFeedback 为 true 时使用预设 */
  feedback?: React.ReactNode;
  /** 用于复制的原始文本（预设反馈的复制功能需要） */
  contentForCopy?: string;
  /** 头像配置（显示在消息上方） */
  avatar?: MessageAvatar;
}

/**
 * AI 消息额外属性
 * @public
 */
export interface AIMessageItem extends Omit<MessageItem, "role"> {
  role: "ai";
  /** AI 消息状态 */
  status?: AIMessageStatus;
  /** 生成中且无内容时的自定义内容 */
  generatingContent?: React.ReactNode;
  /** 生成中且有流式内容时的后缀（默认无） */
  generatingSuffix?: React.ReactNode;
  /** 生成中默认文案，用于 i18n */
  generatingText?: string;
  /** 失败自定义内容 */
  errorContent?: React.ReactNode;
}

/**
 * 用户消息额外属性
 * @public
 */
export interface UserMessageItem extends Omit<MessageItem, "role"> {
  role: "user";
}

/**
 * 内容渲染器类型
 * @public
 */
export type MessageContentRenderer = (
  content: React.ReactNode,
  message: MessageItem | AIMessageItem | UserMessageItem,
) => React.ReactNode;

/**
 * 消息渲染器类型（完全自定义）
 * @public
 */
export type MessageRenderer = (
  message: MessageItem | AIMessageItem | UserMessageItem,
  defaultRender: () => React.ReactNode,
) => React.ReactNode;

/**
 * 消息列表组件属性
 * @public
 */
export interface MessageListProps {
  /** 消息列表数据 */
  messages: (MessageItem | AIMessageItem | UserMessageItem)[];
  /** 消息点击事件 */
  onMessageClick?: (message: MessageItem) => void;
  /** 自定义类名 */
  className?: string;
  /** 是否自动滚动到底部 */
  autoScroll?: boolean;
  /** 当消息未提供 feedback 时，是否使用预设的复制/点赞/点踩/反馈（需提供 contentForCopy 以支持复制） */
  showDefaultFeedback?: boolean;
  /** 自定义内容渲染器（用于自定义渲染消息内容，如 Markdown） */
  renderContent?: MessageContentRenderer;
  /** 自定义消息渲染器（完全自定义消息项渲染） */
  renderMessage?: MessageRenderer;
}

/** 自动滚动时认为用户「在底部」的阈值（px） */
const SCROLL_THRESHOLD = 80;

/**
 * 默认的内容渲染器
 * @internal
 */
function defaultContentRenderer(content: React.ReactNode): React.ReactNode {
  return content;
}

/**
 * 获取默认名称
 * @internal
 */
function getDefaultName(role: MessageRole): string {
  return role === "user" ? "User" : "AI";
}

/**
 * 类型守卫：是否为 AI 消息
 * @internal
 */
function isAIMessageItem(
  msg: MessageItem | AIMessageItem | UserMessageItem,
): msg is AIMessageItem {
  return msg.role === "ai";
}

/** MessageListItem 内部 props，用于 memo 比较 */
interface MessageListItemProps {
  message: MessageItem | AIMessageItem | UserMessageItem;
  index: number;
  isLastAIMessage: boolean;
  onMessageClick?: (message: MessageItem) => void;
  renderContent: MessageContentRenderer;
  renderMessage?: MessageRenderer;
  showDefaultFeedback: boolean;
}

/**
 * 渲染头像（纯函数，提取到组件外避免闭包）
 * @internal
 */
function renderAvatarNode(
  avatar: MessageAvatar | undefined,
  role: MessageRole,
): React.ReactNode {
  if (!avatar) return null;
  return (
    <AvatarHeader
      src={avatar.src}
      icon={avatar.icon}
      size={avatar.size}
      name={avatar.name ?? getDefaultName(role)}
      time={avatar.time}
    />
  );
}

/**
 * 单条消息项 - 使用 React.memo 避免无关消息的重复渲染
 * @internal
 */
const MessageListItem = React.memo(function MessageListItem({
  message,
  isLastAIMessage,
  onMessageClick,
  renderContent,
  renderMessage,
  showDefaultFeedback,
}: MessageListItemProps) {
  const handleClick = React.useCallback(() => {
    onMessageClick?.(message);
  }, [onMessageClick, message]);

  const defaultRender = React.useCallback(() => {
    const isUser = message.role === "user";
    const align = isUser ? "right" : "left";
    const avatarNode = renderAvatarNode(message.avatar, message.role);
    const messageContainerClass = cn(
      align === "right" && "flex flex-col items-end",
    );

    if (isUser) {
      return (
        <div
          className={cn(
            align === "right" &&
              "flex flex-col gap-[var(--Gap-gap-lg)] items-end",
            "group/message",
          )}
        >
          {avatarNode}
          <div className={messageContainerClass}>
            <UserMessage onClick={handleClick}>
              {renderContent(message.content, message)}
            </UserMessage>
            {(message.feedback !== undefined || showDefaultFeedback) && (
              <div className="flex justify-end opacity-0 group-hover/message:opacity-100 transition-opacity min-h-[32px] mt-[var(--Gap-gap-xs)]">
                {message.feedback ?? (
                  <MessageFeedbackActions
                    role="user"
                    textToCopy={message.contentForCopy}
                    align="right"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (isAIMessageItem(message)) {
      return (
        <div className="group/message">
          {avatarNode}
          <div className={messageContainerClass}>
            <AIMessage
              status={message.status}
              generatingContent={message.generatingContent}
              generatingSuffix={message.generatingSuffix}
              generatingText={message.generatingText}
              errorContent={message.errorContent}
              onClick={handleClick}
            >
              {renderContent(message.content, message)}
            </AIMessage>
            {(message.feedback !== undefined || showDefaultFeedback) &&
              message.status !== "generating" && (
                <div
                  className={cn(
                    "flex justify-start min-h-[32px] mt-[var(--Gap-gap-xs)]",
                    !isLastAIMessage &&
                      "opacity-0 group-hover/message:opacity-100 transition-opacity",
                  )}
                >
                  {message.feedback ?? (
                    <MessageFeedbackActions
                      role="ai"
                      textToCopy={message.contentForCopy}
                      align="left"
                    />
                  )}
                </div>
              )}
          </div>
        </div>
      );
    }

    return null;
  }, [
    message,
    isLastAIMessage,
    handleClick,
    renderContent,
    showDefaultFeedback,
  ]);

  if (renderMessage) {
    return <>{renderMessage(message, defaultRender)}</>;
  }
  return <>{defaultRender()}</>;
});

/**
 * 消息列表组件
 *
 * 用于渲染聊天消息列表，支持用户消息和 AI 消息的展示，
 * AI 消息支持三种状态（正常、生成中、失败）。
 *
 * @example
 * ```tsx
 * // 基本使用
 * <MessageList
 *   messages={[
 *     { id: "1", role: "user", content: "你好" },
 *     { id: "2", role: "ai", content: "你好！有什么可以帮助你的吗？" },
 *   ]}
 * />
 *
 * // 自定义内容渲染（如 Markdown）
 * <MessageList
 *   messages={messages}
 *   renderContent={(content, msg) => (
 *     msg.role === "ai" ? <Markdown>{content}</Markdown> : content
 *   )}
 * />
 * ```
 *
 * @public
 */
export const MessageList = React.forwardRef<HTMLDivElement, MessageListProps>(
  (
    {
      messages,
      onMessageClick,
      className,
      autoScroll = true,
      showDefaultFeedback = false,
      renderContent = defaultContentRenderer,
      renderMessage,
      ...props
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isUserNearBottomRef = React.useRef(true);

    const messagesLength = messages.length;
    const lastMessage =
      messagesLength > 0 ? (messages[messagesLength - 1] ?? null) : null;

    // 智能自动滚动：仅当用户靠近底部且消息有变化时滚动（含流式更新）
    React.useEffect(() => {
      if (!autoScroll || !containerRef.current || messagesLength === 0) return;

      if (!isUserNearBottomRef.current) return;

      const container = containerRef.current;
      requestAnimationFrame(() => {
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }, [autoScroll, messagesLength, lastMessage]);

    // 追踪用户滚动位置，用于智能自动滚动
    const handleScroll = React.useCallback(() => {
      const container = containerRef.current;
      if (!container) return;

      const { scrollHeight, scrollTop, clientHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      isUserNearBottomRef.current = distanceFromBottom <= SCROLL_THRESHOLD;
    }, []);

    const emptyContent = React.useMemo(
      () => (
        <div className="flex items-center justify-center h-full text-[var(--Text-text-tertiary)] text-sm">
          暂无消息
        </div>
      ),
      [],
    );

    const messageItems = React.useMemo(() => {
      if (messagesLength === 0) return null;

      const items: React.ReactNode[] = [];
      for (let i = 0; i < messagesLength; i++) {
        const message = messages[i];
        const isLastAIMessage =
          message.role === "ai" && i === messagesLength - 1;
        items.push(
          <MessageListItem
            key={message.id}
            message={message}
            index={i}
            isLastAIMessage={isLastAIMessage}
            onMessageClick={onMessageClick}
            renderContent={renderContent}
            renderMessage={renderMessage}
            showDefaultFeedback={showDefaultFeedback}
          />,
        );
      }
      return items;
    }, [
      messages,
      messagesLength,
      onMessageClick,
      renderContent,
      renderMessage,
      showDefaultFeedback,
    ]);

    return (
      <div ref={ref} className={cn("w-full h-full", className)} {...props}>
        <div
          ref={containerRef}
          className="w-full h-full overflow-y-auto flex flex-col gap-[var(--Gap-gap-2xl)]"
          role="log"
          aria-label="消息列表"
          aria-live="polite"
          onScroll={handleScroll}
        >
          {messagesLength === 0 ? emptyContent : messageItems}
        </div>
      </div>
    );
  },
);

MessageList.displayName = "MessageList";
