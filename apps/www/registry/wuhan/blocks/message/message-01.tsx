"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

/**
 * AI 消息状态类型
 * @public
 */
export type AIMessageStatus = "idle" | "generating" | "failed";

/**
 * 消息原语基础属性
 * @public
 */
export interface MessagePrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 消息内容
   */
  children?: React.ReactNode;
  /**
   * 反馈区域内容（消息下方的反馈按钮等）
   */
  feedback?: React.ReactNode;
}

/**
 * AI 消息原语属性
 * @public
 */
export type AIMessagePrimitiveProps = MessagePrimitiveProps;

/**
 * 用户消息原语属性
 * @public
 */
export type UserMessagePrimitiveProps = MessagePrimitiveProps;

/**
 * AI 消息组件属性
 * @public
 */
export interface AIMessageProps extends AIMessagePrimitiveProps {
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

// ==================== 样式原语层（Primitives）====================

/**
 * AI 消息样式原语
 * @public
 */
export const MessageAIPrimitive = React.forwardRef<
  HTMLDivElement,
  AIMessagePrimitiveProps
>(({ children, feedback, className, ...props }, ref) => {
  return (
    <div
      className="[&_*]:!box-border w-fit max-w-full"
      ref={ref}
      role="article"
      aria-label="AI message"
    >
      <div
        className={cn(
          "pt-[var(--gap-md)]",
          "pr-[var(--gap-lg)]",
          "pb-[var(--gap-md)]",
          "pl-[var(--gap-lg)]",
          "rounded-[var(--radius-xl)]",
          "font-[var(--font-family-cn)]",
          "font-normal",
          "leading-[var(--line-height-2)]",
          "tracking-[0px]",
          "text-[var(--text-icon-text-primary,#403F4D)]",
          className,
        )}
        style={{
          fontSize: "var(--font-size-2)",
          ...props.style,
        }}
        {...props}
      >
        {children}
      </div>
      {feedback && (
        <div
          className="[&_*]:!box-border"
          role="group"
          aria-label="Message feedback"
        >
          {feedback}
        </div>
      )}
    </div>
  );
});
MessageAIPrimitive.displayName = "MessageAIPrimitive";

/**
 * 用户消息样式原语
 * @public
 */
export const MessageUserPrimitive = React.forwardRef<
  HTMLDivElement,
  UserMessagePrimitiveProps
>(({ children, feedback, className, ...props }, ref) => {
  return (
    <div
      className="[&_*]:!box-border w-fit max-w-full"
      ref={ref}
      role="article"
      aria-label="User message"
    >
      <div
        className={cn(
          "pt-[var(--gap-md)]",
          "pr-[var(--gap-lg)]",
          "pb-[var(--gap-md)]",
          "pl-[var(--gap-lg)]",
          "rounded-[var(--radius-xl)]",
          "bg-[var(--bg-neutral-light)]",
          "font-[var(--font-family-cn)]",
          "font-normal",
          "leading-[var(--line-height-2)]",
          "tracking-[0px]",
          "text-[var(--text-icon-text-primary,#403F4D)]",
          className,
        )}
        style={{
          fontSize: "var(--font-size-2)",
          ...props.style,
        }}
        {...props}
      >
        {children}
      </div>
      {feedback && (
        <div
          className="mt-[var(--gap-md)] [&_*]:!box-border"
          role="group"
          aria-label="Message feedback"
        >
          {feedback}
        </div>
      )}
    </div>
  );
});
MessageUserPrimitive.displayName = "MessageUserPrimitive";

// ==================== 业务组件层 ====================

/**
 * AI 消息组件
 * @public
 */
export const AIMessage = React.forwardRef<HTMLDivElement, AIMessageProps>(
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
        return generatingContent !== undefined ? generatingContent : children;
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
export const UserMessage = React.forwardRef<
  HTMLDivElement,
  UserMessagePrimitiveProps
>((props, ref) => {
  return <MessageUserPrimitive ref={ref} {...props} />;
});
UserMessage.displayName = "UserMessage";
