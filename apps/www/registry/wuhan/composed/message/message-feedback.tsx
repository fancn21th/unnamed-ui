"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import { IconButton } from "@/registry/wuhan/composed/icon-button/icon-button";
import { FeedbackComposed } from "@/registry/wuhan/composed/feedback/feedback";
import type { FeedbackOption } from "@/registry/wuhan/composed/feedback/feedback";
import { cn } from "@/lib/utils";

/**
 * 消息反馈操作按钮属性
 * @public
 */
export interface MessageFeedbackActionsProps {
  /** 消息角色，AI 消息显示点赞点踩 */
  role: "user" | "ai";
  /** 用于复制的文本，为空时复制按钮禁用 */
  textToCopy?: string;
  /** 按钮对齐方式 */
  align?: "left" | "right";
  /** 点踩反馈选项，不传则使用默认 */
  feedbackOptions?: FeedbackOption[];
  /** 复制成功回调 */
  onCopy?: () => void;
  /** 点赞状态变化回调 */
  onLikeChange?: (liked: boolean) => void;
  /** 点踩反馈提交回调 */
  onFeedbackSubmit?: (payload: {
    selectedId: string;
    selectedIds: string[];
    inputValue: string;
  }) => void;
}

const DEFAULT_FEEDBACK_OPTIONS: FeedbackOption[] = [
  { id: "harmful", label: "有害/不安全" },
  { id: "false", label: "信息虚假" },
  { id: "other", label: "其他" },
];

/**
 * 消息反馈操作按钮
 *
 * 预设复制、点赞、点踩及反馈表单，逻辑参考业务实现：
 * - 复制：点击后 icon 变为 Check，2s 后恢复
 * - 点赞：点击切换，icon 变化；再次点击取消
 * - 点踩：点击切换，icon 变化，出现反馈表单；再次点击取消
 * - 点赞与点踩互斥
 *
 * @example
 * ```tsx
 * <MessageFeedbackActions
 *   role="ai"
 *   textToCopy={extractTextFromContent(message.content)}
 *   align="left"
 * />
 * ```
 *
 * @public
 */
export function MessageFeedbackActions({
  role,
  textToCopy = "",
  align = "left",
  feedbackOptions = DEFAULT_FEEDBACK_OPTIONS,
  onCopy,
  onLikeChange,
  onFeedbackSubmit,
}: MessageFeedbackActionsProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showFeedbackForm && feedbackRef.current) {
      requestAnimationFrame(() => {
        feedbackRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
    }
  }, [showFeedbackForm]);

  const handleCopy = useCallback(async () => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    }
  }, [textToCopy, onCopy]);

  const handleLike = useCallback(() => {
    if (liked) {
      setLiked(false);
      onLikeChange?.(false);
    } else {
      setLiked(true);
      setDisliked(false);
      setShowFeedbackForm(false);
      onLikeChange?.(true);
    }
  }, [liked, onLikeChange]);

  const handleDislike = useCallback(() => {
    if (disliked) {
      setDisliked(false);
      setShowFeedbackForm(false);
    } else {
      setDisliked(true);
      setLiked(false);
      setShowFeedbackForm(true);
    }
  }, [disliked]);

  const handleFeedbackSubmit = useCallback(
    (payload: {
      selectedId: string;
      selectedIds: string[];
      inputValue: string;
    }) => {
      setShowFeedbackForm(false);
      onFeedbackSubmit?.(payload);
    },
    [onFeedbackSubmit],
  );

  const handleFeedbackClose = useCallback(() => {
    setShowFeedbackForm(false);
  }, []);

  const handleInputShown = useCallback(() => {
    feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  const buttonsAlignClass = align === "right" ? "justify-end" : "justify-start";

  return (
    <div className="w-full flex flex-col gap-2">
      <div className={cn("flex items-center gap-1", buttonsAlignClass)}>
        <IconButton
          variant="ghost"
          color="secondary"
          size="sm"
          tooltip={copied ? "已复制" : "复制"}
          onClick={handleCopy}
          disabled={!textToCopy}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </IconButton>
        {role === "ai" && (
          <>
            <IconButton
              variant="ghost"
              color={liked ? "primary" : "secondary"}
              size="sm"
              tooltip={liked ? "取消点赞" : "有帮助"}
              onClick={handleLike}
            >
              <ThumbsUp
                className={cn(
                  "size-4",
                  liked && "fill-current text-[var(--Text-text-brand)]",
                )}
              />
            </IconButton>
            <IconButton
              variant="ghost"
              color={disliked ? "primary" : "secondary"}
              size="sm"
              tooltip={disliked ? "取消点踩" : "没帮助"}
              onClick={handleDislike}
            >
              <ThumbsDown
                className={cn(
                  "size-4",
                  disliked && "fill-current text-[var(--Text-text-brand)]",
                )}
              />
            </IconButton>
          </>
        )}
      </div>
      {showFeedbackForm && role === "ai" && (
        <div ref={feedbackRef} className="w-full">
          <FeedbackComposed
            title="有什么问题?"
            options={feedbackOptions}
            multiple={true}
            submitLabel="确认"
            showInputWhenSelected={["other"]}
            onInputShown={handleInputShown}
            onSubmit={handleFeedbackSubmit}
            onClose={handleFeedbackClose}
          />
        </div>
      )}
    </div>
  );
}
