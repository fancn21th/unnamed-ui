"use client";

import {
  MessageList,
  type MessageItem,
  type AIMessageItem,
} from "@/registry/wuhan/composed/message/message-list";
import { ThinkingStep } from "@/registry/wuhan/composed/thinking-process";
import { User, Bot } from "lucide-react";
import * as React from "react";

const messages = [
  {
    id: "1",
    role: "user" as const,
    content: "请分析一下这个问题",
    contentForCopy: "请分析一下这个问题",
    avatar: { icon: <User className="w-5 h-5" />, name: "用户", time: "10:30" },
  },
  {
    id: "2",
    role: "ai" as const,
    content: {
      type: "thinking",
      title: "分析完成",
      status: "completed" as const,
      duration: 12,
      content: "已从多维度分析问题，并生成详细方案与建议。",
      defaultOpen: true,
    },
    contentForCopy: "已从多维度分析问题，并生成详细方案与建议。",
    avatar: {
      icon: <Bot className="w-5 h-5" />,
      name: "AI 助手",
      time: "10:31",
    },
  },
] as (MessageItem | AIMessageItem)[];

function AIContent({ content }: { content: React.ReactNode }) {
  const c = content as {
    type?: string;
    title?: string;
    status?: string;
    duration?: number;
    content?: string;
    defaultOpen?: boolean;
  };
  if (c && typeof c === "object" && c.type === "thinking" && c.title) {
    const { type: _, ...props } = c;
    return (
      <ThinkingStep
        title={props.title}
        content={props.content}
        status={props.status as "completed"}
        duration={props.duration}
        defaultOpen={props.defaultOpen}
      />
    );
  }
  return <>{content}</>;
}

export default function MessageListDemo() {
  return (
    <div className="h-[400px] w-full overflow-hidden">
      <MessageList
        messages={messages}
        showDefaultFeedback
        renderContent={(content, msg) =>
          msg.role === "ai" ? <AIContent content={content} /> : content
        }
      />
    </div>
  );
}
