"use client";

import {
  AIMessage,
  UserMessage,
} from "@/registry/wuhan/composed/message/message";
import { AvatarHeader } from "@/registry/wuhan/composed/avatar-header/avatar-header";
import { BotIcon, UserIcon } from "lucide-react";

export default function MessageWithAvatarHeader() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-end w-full">
        <div className="flex flex-col items-end gap-2 max-w-full">
          <AvatarHeader
            name="User"
            time="12:25"
            icon={
              <div className="flex items-center justify-center text-[var(--text-secondary)] size-6 rounded-full bg-[#D9D9D9]">
                <UserIcon className="size-4" />
              </div>
            }
          />
          <UserMessage>你好，我想了解一下你们的产品</UserMessage>
        </div>
      </div>

      <div className="flex justify-start w-full">
        <div className="flex flex-col items-start gap-2 max-w-full">
          <AvatarHeader
            name="AI"
            time="12:26"
            icon={
              <div className="flex items-center justify-center text-[var(--text-secondary)] size-6 rounded-full bg-[#D9D9D9]">
                <BotIcon className="size-4" />
              </div>
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
