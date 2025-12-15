"use client";

import { useState } from "react";
import {
  ComposedMessageList,
  MessageItem,
} from "@/registry/wuhan/examples/message/message-composed-demo";

export default function MessageDemo() {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "1",
      role: "user",
      content: "你好，我想了解一下你们的产品",
      feedback: {
        onCopy: () => {},
      },
    },
    {
      id: "2",
      role: "assistant",
      content: "你好！很高兴为您介绍我们的产品。请问您对哪个方面比较感兴趣？",
      feedback: {
        onCopy: () => {},
      },
    },
    {
      id: "3",
      role: "user",
      content: "能详细介绍一下核心功能吗？",
      feedback: {
        onCopy: () => {},
      },
    },
    {
      id: "4",
      role: "assistant",
      content: (
        <div className="space-y-2">
          我们的产品主要有以下核心功能：
          <ul className="list-disc list-inside space-y-1 ml-2 mb-0">
            <li>智能对话系统</li>
            <li>多模态内容支持</li>
            <li>实时协作功能</li>
          </ul>
        </div>
      ),
      feedback: {
        onCopy: () => {},
      },
    },
  ]);

  const handleFeedbackChange = (
    id: string,
    feedback: Partial<MessageItem["feedback"]>,
  ) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              feedback: {
                ...msg.feedback,
                ...feedback,
              },
            }
          : msg,
      ),
    );
  };

  return (
    <ComposedMessageList
      messages={messages}
      onFeedbackChange={handleFeedbackChange}
      className="max-w-full"
    />
  );
}
