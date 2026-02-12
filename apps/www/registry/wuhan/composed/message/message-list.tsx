"use client";

import * as React from "react";
import {
  AIMessage,
  UserMessage,
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
  /** 反馈内容（消息下方的反馈按钮等） */
  feedback?: React.ReactNode;
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
  /** 生成中自定义内容 */
  generatingContent?: React.ReactNode;
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
  /** 自定义内容渲染器（用于自定义渲染消息内容，如 Markdown） */
  renderContent?: MessageContentRenderer;
  /** 自定义消息渲染器（完全自定义消息项渲染） */
  renderMessage?: MessageRenderer;
}

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
      renderContent = defaultContentRenderer,
      renderMessage,
      ...props
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    // 自动滚动到底部
    React.useEffect(() => {
      if (autoScroll && containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, [messages, autoScroll]);

    // 渲染头像
    const renderAvatar = (
      avatar: MessageAvatar | undefined,
      role: MessageRole,
    ): React.ReactNode => {
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
    };

    // 渲染单条消息的默认实现
    const renderDefaultMessage = (
      message: MessageItem | AIMessageItem | UserMessageItem,
      isLastAIMessage: boolean,
    ): React.ReactNode => {
      const isUser = message.role === "user";
      const align = isUser ? "right" : "left";
      const avatar = message.avatar;

      // 渲染头像（根据对齐方向）
      const avatarNode = renderAvatar(avatar, message.role);

      // 消息容器类名
      const messageContainerClass = cn(
        align === "right" && "flex flex-col items-end",
      );

      // 处理用户消息
      if (isUser) {
        return (
          <div
            key={message.id}
            className={cn(
              align === "right" &&
                "flex flex-col gap-[var(--gap-lg)] items-end",
              "group/message",
            )}
          >
            {avatarNode}
            <div className={messageContainerClass}>
              <UserMessage onClick={() => onMessageClick?.(message)}>
                {renderContent(message.content, message)}
              </UserMessage>
              {/* 反馈区域 - hover 时显示 */}
              {message.feedback && (
                <div className="flex justify-end opacity-0 group-hover/message:opacity-100 transition-opacity min-h-[32px]">
                  {message.feedback}
                </div>
              )}
            </div>
          </div>
        );
      }

      // 处理 AI 消息
      const aiMsg = message as AIMessageItem;
      return (
        <div key={message.id} className="group/message">
          {avatarNode}
          <div className={messageContainerClass}>
            <AIMessage
              status={aiMsg.status}
              generatingContent={aiMsg.generatingContent}
              errorContent={aiMsg.errorContent}
              onClick={() => onMessageClick?.(message)}
            >
              {renderContent(message.content, message)}
            </AIMessage>
            {/* 反馈区域 - 最后一条 AI 消息始终显示，其他 hover 时显示 */}
            {message.feedback && (
              <div
                className={cn(
                  "flex justify-start min-h-[32px]",
                  !isLastAIMessage &&
                    "opacity-0 group-hover/message:opacity-100 transition-opacity",
                )}
              >
                {message.feedback}
              </div>
            )}
          </div>
        </div>
      );
    };

    // 渲染单条消息（支持自定义渲染器）
    const renderMessageItem = (
      message: MessageItem | AIMessageItem | UserMessageItem,
      index: number,
    ): React.ReactNode => {
      // 判断是否是最后一条 AI 消息
      const isLastAIMessage =
        message.role === "ai" && index === messages.length - 1;

      if (renderMessage) {
        // 使用自定义渲染器
        return renderMessage(message, () =>
          renderDefaultMessage(message, isLastAIMessage),
        );
      }
      // 使用默认渲染
      return renderDefaultMessage(message, isLastAIMessage);
    };

    return (
      <div ref={ref} className={cn("w-full h-full", className)} {...props}>
        <div
          ref={containerRef}
          className="w-full h-full overflow-y-auto flex flex-col gap-[var(--gap-2xl)]"
          role="log"
          aria-label="消息列表"
          aria-live="polite"
        >
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-[var(--text-tertiary)] text-sm">
              暂无消息
            </div>
          ) : (
            messages.map((message, index) => renderMessageItem(message, index))
          )}
        </div>
      </div>
    );
  },
);

MessageList.displayName = "MessageList";
