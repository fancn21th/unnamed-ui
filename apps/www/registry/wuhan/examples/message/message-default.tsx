"use client";

import {
  AIMessage,
  UserMessage,
} from "@/registry/wuhan/blocks/message/message-01";

export default function MessageDefault() {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <UserMessage>这是一条用户消息</UserMessage>
      <AIMessage>这是一条 AI 消息</AIMessage>
    </div>
  );
}
