"use client";

import * as React from "react";
import {
  MessageAIPrimitive,
  MessageUserPrimitive,
  type AIMessagePrimitiveProps,
  type UserMessagePrimitiveProps,
} from "@/registry/wuhan/blocks/message/message-01";

/**
 * AI 消息状态类型
 * 定义 AI 消息的三种状态
 * @public
 */
type AIMessageStatus = "idle" | "generating" | "failed";

/**
 * AI 消息组件属性接口
 * 扩展自原语组件属性，添加状态管理功能
 * @public
 */
interface AIMessageProps extends AIMessagePrimitiveProps {
  /**
   * 消息状态
   * - idle: 正常状态（默认），显示完整消息内容
   * - generating: 生成中，可显示加载动画或自定义内容
   * - failed: 生成失败，显示错误提示
   */
  status?: AIMessageStatus;
  /**
   * 错误消息文本
   * 当 status 为 "failed" 且未提供 errorContent 时显示
   */
  errorMessage?: React.ReactNode;
  /**
   * 生成中时的自定义内容
   * 可用于显示骨架屏、加载动画等
   */
  generatingContent?: React.ReactNode;
  /**
   * 生成失败时的自定义内容
   * 可用于显示自定义错误界面
   */
  errorContent?: React.ReactNode;
}

/**
 * AI 消息组件
 *
 * 用于显示 AI 生成的消息内容，支持：
 * - 三种状态：正常、生成中、失败
 * - 自定义生成中和错误状态的显示内容
 * - 完整的无障碍支持（ARIA live regions）
 *
 * @example
 * ```tsx
 * // 正常状态
 * <AIMessage>这是 AI 的回复内容</AIMessage>
 *
 * // 生成中状态
 * <AIMessage
 *   status="generating"
 *   generatingContent={<LoadingDots />}
 * />
 *
 * // 失败状态
 * <AIMessage
 *   status="failed"
 *   errorMessage="生成失败，请重试"
 * />
 * ```
 *
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
    // 根据状态计算要显示的内容
    const content = React.useMemo(() => {
      if (status === "generating") {
        return generatingContent !== undefined ? generatingContent : null;
      }
      if (status === "failed") {
        return errorContent !== undefined ? errorContent : errorMessage;
      }
      return children;
    }, [status, generatingContent, errorContent, errorMessage, children]);

    // 生成中时使用 polite 让屏幕阅读器播报更新
    const ariaLive = status === "generating" ? "polite" : undefined;

    // 设置语义化的 ARIA 标签
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
 *
 * 用于显示用户发送的消息内容，简单封装原语组件。
 *
 * @example
 * ```tsx
 * <UserMessage>用户的问题或输入</UserMessage>
 * ```
 *
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
