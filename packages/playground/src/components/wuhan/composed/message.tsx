"use client";

import * as React from "react";
import {
  MessageAIPrimitive,
  MessageUserPrimitive,
  type AIMessagePrimitiveProps,
  type UserMessagePrimitiveProps,
} from "@/components/wuhan/blocks/message-01";

/**
 * AI 消息状态类型
 * @public
 */
type AIMessageStatus = "idle" | "generating" | "failed";

/**
 * AI 消息组件属性
 * @public
 */
interface AIMessageProps extends AIMessagePrimitiveProps {
  /**
   * 消息状态
   * - idle: 正常状态（默认）
   * - generating: 生成中
   * - failed: 生成失败
   */
  status?: AIMessageStatus;
  /**
   * 错误消息（当 status 为 "failed" 时显示）
   */
  errorMessage?: React.ReactNode;
  /**
   * 生成中时的自定义内容
   */
  generatingContent?: React.ReactNode;
  /**
   * 生成失败时的自定义内容
   */
  errorContent?: React.ReactNode;
}

/**
 * AI 消息组件
 * @public
 */
const AIMessage = React.forwardRef<HTMLDivElement, AIMessageProps>(
  (
    {
      children,
      status = "idle",
      errorMessage,
      generatingContent,
      errorContent,
      className,
      ...props
    },
    ref,
  ) => {
    const content = React.useMemo(() => {
      if (status === "generating") {
        return generatingContent !== undefined ? generatingContent : null;
      }
      if (status === "failed") {
        return errorContent !== undefined ? errorContent : errorMessage;
      }
      return children;
    }, [status, generatingContent, errorContent, errorMessage, children]);

    const ariaLive = status === "generating" ? "polite" : undefined;
    const ariaLabel =
      status === "generating"
        ? "AI message generating"
        : status === "failed"
          ? "AI message failed"
          : "AI message";

    return (
      <MessageAIPrimitive
        ref={ref}
        className={className}
        aria-live={ariaLive}
        aria-label={ariaLabel}
        {...props}
      >
        {content}
      </MessageAIPrimitive>
    );
  },
);
AIMessage.displayName = "AIMessage";

/**
 * 用户消息组件
 * @public
 */
const UserMessage = React.forwardRef<HTMLDivElement, UserMessagePrimitiveProps>(
  (props, ref) => {
    return <MessageUserPrimitive ref={ref} {...props} />;
  },
);
UserMessage.displayName = "UserMessage";

export type { AIMessageStatus, AIMessageProps, UserMessagePrimitiveProps };
export { AIMessage, UserMessage };
