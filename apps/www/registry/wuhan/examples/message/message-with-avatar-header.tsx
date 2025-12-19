"use client";

import {
  AIMessage,
  UserMessage,
} from "@/registry/wuhan/blocks/message/message-01";
import {
  Avatar,
  MessageAvatarHeader,
} from "@/registry/wuhan/blocks/avatar-header/avatar-header-01";
import { BotIcon, UserIcon } from "lucide-react";

export default function MessageWithAvatarHeader() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-end w-full">
        <div className="flex flex-col items-end gap-2 max-w-full">
          <MessageAvatarHeader
            name="User"
            time="12:25"
            avatar={
              <Avatar className="flex items-center justify-center text-[var(--text-secondary)]">
                <UserIcon className="size-4" />
              </Avatar>
            }
          />
          <UserMessage>你好，我想了解一下你们的产品</UserMessage>
        </div>
      </div>

      <div className="flex justify-start w-full">
        <div className="flex flex-col items-start gap-2 max-w-full">
          <MessageAvatarHeader
            name="AI"
            time="12:26"
            avatar={
              <Avatar className="flex items-center justify-center text-[var(--text-secondary)]">
                <BotIcon className="size-4" />
              </Avatar>
            }
          />
          <AIMessage>
            你好！很高兴为您介绍我们的产品。请问您对哪个方面比较感兴趣？
          </AIMessage>
        </div>
      </div>
    </div>
  );
}
