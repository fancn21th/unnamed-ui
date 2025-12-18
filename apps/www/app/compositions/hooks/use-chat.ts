"use client";

import * as React from "react";
import type { ChatAttachmentMeta } from "../components/attachments";

// =========================
// Unified Message Type (车架子)
// =========================

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
  status?: "idle" | "generating" | "failed"; // 消息状态
  attachments?: ChatAttachmentMeta[];
};

export type ChatOptions = {
  variant: "wenxue" | "zijin" | "medical";
  deepThink?: boolean;
  webSearch?: boolean;
};

// =========================
// Mock AI Response Generator
// =========================

function generateMockResponse(userMessage: string, options: ChatOptions): string {
  const { variant, deepThink, webSearch } = options;

  // 根据不同的 variant 生成不同的回复风格
  if (variant === "wenxue") {
    if (userMessage.includes("总结")) {
      return "好的，我来帮你总结一下这段内容。首先，我们需要理解核心观点...";
    }
    if (userMessage.includes("学习计划")) {
      return "根据你的需求，我为你制定了一个学习计划：\n1. 第一阶段：基础知识学习\n2. 第二阶段：实践应用\n3. 第三阶段：深入理解";
    }
    return "收到。这里是问学的占位回复，后续接入真实对话数据。";
  }

  if (variant === "zijin") {
    if (userMessage.includes("结论概要")) {
      return "根据分析，主要结论如下：\n1. 市场趋势向好\n2. 需要关注风险点\n3. 建议采取相应措施";
    }
    if (userMessage.includes("要点清单")) {
      return "整理后的要点清单：\n• 关键指标一\n• 关键指标二\n• 关键指标三";
    }
    if (userMessage.includes("查找资料")) {
      return "正在为你查找相关资料...";
    }
    if (userMessage.includes("分析思路")) {
      return "分析思路如下：首先需要明确问题，然后收集数据，最后得出结论。";
    }
    if (userMessage.includes("下一步建议")) {
      return "基于当前情况，建议采取以下步骤：\n1. 评估现状\n2. 制定方案\n3. 执行计划";
    }
    let response = "收到。这里是紫金矿业的占位回复，后续接入真实对话数据与功能。";
    if (deepThink) {
      response += "（已启用深度思考模式）";
    }
    if (webSearch) {
      response += "（已启用联网搜索）";
    }
    return response;
  }

  if (variant === "medical") {
    if (userMessage.includes("用药建议")) {
      return "基于你的描述，建议的用药方向如下：\n1. 首先需要明确诊断\n2. 根据症状选择合适的药物\n3. 注意用药剂量和频次\n\n⚠️ 请注意：以上建议仅供参考，具体用药请咨询专业医生。";
    }
    if (userMessage.includes("不良反应")) {
      return "常见不良反应包括：\n• 胃肠道反应：恶心、呕吐等\n• 过敏反应：皮疹、瘙痒等\n• 其他：头晕、乏力等\n\n注意事项：如出现严重不良反应，请立即停药并就医。";
    }
    if (userMessage.includes("检查结果")) {
      return "根据你提供的检查结果，初步解读如下：\n1. 各项指标基本正常\n2. 需要注意某些指标的变化\n3. 建议定期复查\n\n⚠️ 重要提示：检查结果解读仅供参考，最终诊断需要结合临床情况。";
    }
    let response = "收到。这里是小铂的占位回复，后续接入真实对话数据。";
    if (deepThink) {
      response += "（已启用深度思考模式）";
    }
    if (webSearch) {
      response += "（已启用联网搜索）";
    }
    return response;
  }

  return "收到。这里是占位回复，后续接入真实对话数据。";
}

// =========================
// Chat Hook (车架子)
// =========================

export function useChat(
  options: ChatOptions,
  conversationId?: string | null,
  initialMessages?: ChatMessage[],
  onMessagesChange?: (messages: ChatMessage[]) => void,
) {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages || []);
  const [isLoading, setIsLoading] = React.useState(false);
  const isSendingRef = React.useRef(false);

  // 当 conversationId 变化时，更新消息
  // 使用 useRef 来跟踪上一次的 conversationId，避免不必要的更新
  const prevConversationIdRef = React.useRef<string | null | undefined>(conversationId);

  React.useEffect(() => {
    // 只有当 conversationId 真正变化时才更新消息
    if (prevConversationIdRef.current !== conversationId) {
      if (conversationId && initialMessages) {
        setMessages(initialMessages);
      } else if (!conversationId) {
        // 如果没有对话ID，清空消息
        setMessages([]);
      }
      prevConversationIdRef.current = conversationId;
    }
  }, [conversationId]);

  // 当 initialMessages 变化且 conversationId 匹配时，更新消息
  // 使用 useRef 来跟踪上一次的 initialMessages，避免不必要的更新
  const prevInitialMessagesRef = React.useRef<ChatMessage[] | undefined>(initialMessages);

  React.useEffect(() => {
    if (conversationId && initialMessages) {
      // 如果正在发送消息，不要用空数组覆盖当前消息
      if (isSendingRef.current && initialMessages.length === 0) {
        return;
      }
      // 使用深度比较，避免不必要的更新
      const prevMessagesStr = JSON.stringify(prevInitialMessagesRef.current);
      const newMessagesStr = JSON.stringify(initialMessages);
      if (prevMessagesStr !== newMessagesStr) {
        setMessages(initialMessages);
        prevInitialMessagesRef.current = initialMessages;
      }
    }
  }, [initialMessages, conversationId]);

  // 添加用户消息并触发 AI 回复
  const sendMessage = React.useCallback(
    async (content: string, attachments?: ChatAttachmentMeta[]) => {
      const trimmedContent = content.trim();
      // allow sending with attachments only
      if (!trimmedContent && (!attachments || attachments.length === 0)) return;

      isSendingRef.current = true;
      setIsLoading(true);

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmedContent,
        timestamp: Date.now(),
        attachments,
      };

      // 立即添加用户消息
      setMessages((prev) => [...prev, userMessage]);

      // 创建 AI 消息占位符（生成中状态）
      const aiMessageId = `assistant-${Date.now()}`;
      const aiMessage: ChatMessage = {
        id: aiMessageId,
        role: "assistant",
        content: "",
        timestamp: Date.now(),
        status: "generating",
      };

      setMessages((prev) => [...prev, aiMessage]);

      // 模拟延迟（模拟网络请求）
      const delay = options.deepThink ? 2000 : 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));

      // 生成回复内容
      const responseContent = generateMockResponse(trimmedContent, options);

      // 模拟打字效果
      const words = responseContent.split("");
      let currentContent = "";

      for (let i = 0; i < words.length; i++) {
        currentContent += words[i];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, content: currentContent, status: "generating" }
              : msg,
          ),
        );
        // 控制打字速度
        await new Promise((resolve) => setTimeout(resolve, 30));
      }

      // 完成流式输出，设置为 idle 状态
      setMessages((prev) => {
        const updated = prev.map((msg) =>
          msg.id === aiMessageId ? { ...msg, status: "idle" as const } : msg,
        );
        // 只在最终完成时通知外部消息已更新
        // 使用 setTimeout 确保状态更新完成后再通知
        setTimeout(() => {
          if (onMessagesChange) {
            onMessagesChange(updated);
          }
        }, 0);
        return updated;
      });

      setIsLoading(false);
      isSendingRef.current = false;
    },
    [options, onMessagesChange],
  );

  const removeAttachmentFromMessage = React.useCallback(
    (messageId: string, attachmentId: string) => {
      setMessages((prev) => {
        const updated = prev.map((m) => {
          if (m.id !== messageId) return m;
          const nextAttachments = (m.attachments || []).filter(
            (a) => a.id !== attachmentId,
          );
          return {
            ...m,
            attachments: nextAttachments.length ? nextAttachments : undefined,
          };
        });

        setTimeout(() => {
          onMessagesChange?.(updated);
        }, 0);

        return updated;
      });
    },
    [onMessagesChange],
  );

  // 清空对话
  const clearMessages = React.useCallback(() => {
    setMessages([]);
  }, []);

  // 重置对话（清空并可选添加欢迎消息）
  const resetChat = React.useCallback(() => {
    setMessages([]);
    setIsLoading(false);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    removeAttachmentFromMessage,
    clearMessages,
    resetChat,
  };
}


