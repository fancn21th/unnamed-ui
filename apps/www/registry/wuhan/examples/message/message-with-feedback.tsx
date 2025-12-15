"use client";

import {
  AIMessage,
  UserMessage,
} from "@/registry/wuhan/blocks/message/message-01";
import { Button } from "@/registry/wuhan/ui/button";
import { ThumbsUp, ThumbsDown, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MessageWithFeedback() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-end w-full">
        <UserMessage>请帮我解释一下 React Hooks</UserMessage>
      </div>
      <div className="flex justify-start w-full">
        <AIMessage
          feedback={
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8">
                <ThumbsUp
                  className={cn("size-4", "text-[var(--text-secondary)]")}
                />
              </Button>
              <Button variant="ghost" size="sm" className="h-8">
                <ThumbsDown
                  className={cn("size-4", "text-[var(--text-secondary)]")}
                />
              </Button>
              <Button variant="ghost" size="sm" className="h-8">
                <Copy
                  className={cn("size-4", "text-[var(--text-secondary)]")}
                />
              </Button>
            </div>
          }
        >
          React Hooks 是 React 16.8
          引入的新特性，允许你在函数组件中使用状态和其他 React 特性。常用的
          Hooks 包括 useState、useEffect、useContext 等。
        </AIMessage>
      </div>
    </div>
  );
}
