"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

/**
 * AI 消息状态类型
 * @public
 */
type AIMessageStatus = "idle" | "generating" | "failed";

/**
 * 消息原语基础属性
 * @public
 */
interface MessagePrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
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
type AIMessagePrimitiveProps = MessagePrimitiveProps;

/**
 * 用户消息原语属性
 * @public
 */
type UserMessagePrimitiveProps = MessagePrimitiveProps;

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

// ==================== 状态原语组件 ====================

/**
 * 三个圆点的加载动画原语组件
 * @public
 */
const LoadingDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes loading-dot-bounce {
              0%, 80%, 100% {
                transform: scale(1);
                opacity: 0.5;
              }
              40% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `,
        }}
      />
      <div
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        <div
          className="w-1 h-1 rounded-full bg-[var(--bg-brand)]"
          style={{
            animation: "loading-dot-bounce 1.4s ease-in-out infinite",
            animationDelay: "-0.32s",
          }}
        />
        <div
          className="w-1 h-1 rounded-full bg-[var(--bg-brand)]"
          style={{
            animation: "loading-dot-bounce 1.4s ease-in-out infinite",
            animationDelay: "-0.16s",
          }}
        />
        <div
          className="w-1 h-1 rounded-full bg-[var(--bg-brand)]"
          style={{
            animation: "loading-dot-bounce 1.4s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
});
LoadingDots.displayName = "LoadingDots";

/**
 * 消息生成中原语组件
 * 用于构建生成中状态的UI
 * @public
 */
interface MessageGeneratingPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 加载指示器（如 LoadingDots）
   */
  indicator?: React.ReactNode;
  /**
   * 提示文本
   */
  text?: React.ReactNode;
}

const MessageGeneratingPrimitive = React.forwardRef<
  HTMLDivElement,
  MessageGeneratingPrimitiveProps
>(({ indicator, text, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {indicator}
      {text && <span className="text-[var(--text-secondary)]">{text}</span>}
    </div>
  );
});
MessageGeneratingPrimitive.displayName = "MessageGeneratingPrimitive";

/**
 * 消息失败原语组件
 * 用于构建失败状态的UI
 * @public
 */
interface MessageFailedPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 错误图标
   */
  icon?: React.ReactNode;
  /**
   * 错误消息
   */
  message?: React.ReactNode;
  /**
   * 操作按钮（如重试按钮）
   */
  actions?: React.ReactNode;
}

const MessageFailedPrimitive = React.forwardRef<
  HTMLDivElement,
  MessageFailedPrimitiveProps
>(({ icon, message, actions, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
      {icon && message && (
        <div className="flex items-center gap-2">
          {icon}
          {typeof message === "string" ? (
            <span className="text-[var(--text-error)]">{message}</span>
          ) : (
            message
          )}
        </div>
      )}
      {actions}
    </div>
  );
});
MessageFailedPrimitive.displayName = "MessageFailedPrimitive";

// ==================== 样式原语层（Primitives）====================

/**
 * AI 消息样式原语
 * @public
 */
const MessageAIPrimitive = React.forwardRef<
  HTMLDivElement,
  AIMessagePrimitiveProps
>(
  (
    {
      children,
      feedback,
      className,
      style,
      role = "article",
      "aria-label": ariaLabel = "AI message",
      "aria-live": ariaLive,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className="[&_*]:!box-border w-fit max-w-full"
        ref={ref}
        role={role}
        aria-label={ariaLabel}
        aria-live={ariaLive}
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
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
        {feedback && (
          <div
            className={cn("[&_*]:!box-border")}
            role="group"
            aria-label="Message feedback"
          >
            {feedback}
          </div>
        )}
      </div>
    );
  },
);
MessageAIPrimitive.displayName = "MessageAIPrimitive";

/**
 * 用户消息样式原语
 * @public
 */
const MessageUserPrimitive = React.forwardRef<
  HTMLDivElement,
  UserMessagePrimitiveProps
>(
  (
    {
      children,
      feedback,
      className,
      style,
      role = "article",
      "aria-label": ariaLabel = "User message",
      "aria-live": ariaLive,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className="[&_*]:!box-border w-fit max-w-full"
        ref={ref}
        role={role}
        aria-label={ariaLabel}
        aria-live={ariaLive}
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
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
        {feedback && (
          <div
            className={cn("mt-[var(--gap-md)]", "[&_*]:!box-border")}
            role="group"
            aria-label="Message feedback"
          >
            {feedback}
          </div>
        )}
      </div>
    );
  },
);
MessageUserPrimitive.displayName = "MessageUserPrimitive";

// ==================== 业务组件层 ====================

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

// ==================== 统一导出 ====================

export type {
  AIMessageStatus,
  MessagePrimitiveProps,
  AIMessagePrimitiveProps,
  UserMessagePrimitiveProps,
  AIMessageProps,
  MessageGeneratingPrimitiveProps,
  MessageFailedPrimitiveProps,
};

export {
  MessageAIPrimitive,
  MessageUserPrimitive,
  AIMessage,
  UserMessage,
  LoadingDots,
  MessageGeneratingPrimitive,
  MessageFailedPrimitive,
};
