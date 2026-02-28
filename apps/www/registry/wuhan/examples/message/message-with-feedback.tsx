"use client";

import {
  AIMessage,
  UserMessage,
} from "@/registry/wuhan/composed/message/message";
import { Button } from "@/registry/wuhan/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/wuhan/ui/tooltip";
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
            <div className="flex items-center gap-[var(--Gap-gap-xs)]">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 !px-1 cursor-pointer"
                  >
                    <ThumbsUp
                      className={cn(
                        "size-4",
                        "text-[var(--Text-text-secondary)]",
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>点赞</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 !px-1 cursor-pointer"
                  >
                    <ThumbsDown
                      className={cn(
                        "size-4",
                        "text-[var(--Text-text-secondary)]",
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>踩</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 !px-1 cursor-pointer"
                  >
                    <Copy
                      className={cn(
                        "size-4",
                        "text-[var(--Text-text-secondary)]",
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>复制</p>
                </TooltipContent>
              </Tooltip>
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
