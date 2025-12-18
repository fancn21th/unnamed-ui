"use client";

import * as React from "react";
import type { ChatMessage } from "./use-chat";

// =========================
// Conversation History Types
// =========================

export type Conversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
};

export type UseChatHistoryOptions = {
  variant: "wenxue" | "zijin" | "medical";
};

// =========================
// Chat History Hook
// =========================

export function useChatHistory(options: UseChatHistoryOptions) {
  const { variant } = options;
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = React.useState<
    string | null
  >(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  // 从 sessionStorage 加载对话历史（按 variant 区分）
  React.useEffect(() => {
    const storageKey = `chat-history-${variant}`;
    try {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as Conversation[];
        setConversations(parsed);
        // 如果有对话，默认选中最新的
        if (parsed.length > 0) {
          setCurrentConversationId(parsed[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  }, [variant]);

  // 保存对话历史到 sessionStorage
  const saveToStorage = React.useCallback(
    (convs: Conversation[]) => {
      const storageKey = `chat-history-${variant}`;
      try {
        // Do not persist runtime-only fields (e.g. objectURL thumbnails)
        const safe = convs.map((conv) => ({
          ...conv,
          messages: conv.messages.map((m) => ({
            ...m,
            attachments: m.attachments?.map(({ thumbnail, ...rest }) => rest),
          })),
        }));
        sessionStorage.setItem(storageKey, JSON.stringify(safe));
      } catch (error) {
        console.error("Failed to save chat history:", error);
      }
    },
    [variant],
  );

  // 创建新对话
  const createConversation = React.useCallback(() => {
    const newId = `conv-${Date.now()}`;
    const newConversation: Conversation = {
      id: newId,
      title: "新对话",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setConversations((prev) => {
      const updated = [newConversation, ...prev];
      saveToStorage(updated);
      return updated;
    });
    setCurrentConversationId(newId);
    return newId;
  }, [saveToStorage]);

  // 更新对话消息
  const updateConversationMessages = React.useCallback(
    (conversationId: string, messages: ChatMessage[]) => {
      setConversations((prev) => {
        const updated = prev.map((conv) => {
          if (conv.id === conversationId) {
            // 自动生成标题（使用第一条用户消息）
            let title = conv.title;
            if (messages.length > 0 && conv.title === "新对话") {
              const firstUserMessage = messages.find((m) => m.role === "user");
              if (firstUserMessage) {
                title =
                  firstUserMessage.content.length > 20
                    ? firstUserMessage.content.slice(0, 20) + "..."
                    : firstUserMessage.content;
              }
            }

            return {
              ...conv,
              messages,
              title,
              updatedAt: Date.now(),
            };
          }
          return conv;
        });

        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage],
  );

  // 切换对话
  const switchConversation = React.useCallback((conversationId: string) => {
    setCurrentConversationId(conversationId);
  }, []);

  // 删除对话
  const deleteConversation = React.useCallback(
    (conversationId: string) => {
      setConversations((prev) => {
        const filtered = prev.filter((conv) => conv.id !== conversationId);
        saveToStorage(filtered);

        // 如果删除的是当前对话，切换到最新的对话
        if (conversationId === currentConversationId) {
          if (filtered.length > 0) {
            setCurrentConversationId(filtered[0].id);
          } else {
            setCurrentConversationId(null);
          }
        }

        return filtered;
      });
    },
    [currentConversationId, saveToStorage],
  );

  // 获取当前对话
  const currentConversation = React.useMemo(() => {
    return conversations.find((conv) => conv.id === currentConversationId);
  }, [conversations, currentConversationId]);

  // 过滤对话（用于搜索）
  const filteredConversations = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return conversations;
    }
    const query = searchQuery.toLowerCase();
    return conversations.filter(
      (conv) =>
        conv.title.toLowerCase().includes(query) ||
        conv.messages.some((msg) => msg.content.toLowerCase().includes(query)),
    );
  }, [conversations, searchQuery]);

  return {
    conversations: filteredConversations,
    currentConversation,
    currentConversationId,
    searchQuery,
    setSearchQuery,
    createConversation,
    updateConversationMessages,
    switchConversation,
    deleteConversation,
  };
}


