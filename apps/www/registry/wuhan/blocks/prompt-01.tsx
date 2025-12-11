"use client";

import { Textarea } from "@/registry/wuhan/ui/textarea";
import { Button } from "@/registry/wuhan/ui/button";
import { Search, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export function PromptInput(props: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      {...props}
      className={cn(
        "resize-none border-none p-0 shadow-none focus-visible:ring-0",
        props.className,
      )}
    />
  );
}

export function PromptWebSearchButton(
  props: React.ComponentProps<typeof Button>,
) {
  return (
    <Button variant="default" size="default" aria-label="Search" {...props}>
      <Search />
      <span className="">web search</span>
    </Button>
  );
}

export function PromptSendButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="default" size="icon" aria-label="Send" {...props}>
      <Send />
    </Button>
  );
}

// block / prompt-01
export function Prompt(props?: React.ComponentProps<typeof PromptInput>) {
  return (
    <div className="flex w-full max-w-2xl flex-col rounded-md border p-3 transition-colors has-[:focus-visible]:border-primary">
      <PromptInput {...props} />
      <div className="flex items-center justify-between gap-2 pt-2">
        <PromptWebSearchButton />
        <PromptSendButton />
      </div>
    </div>
  );
}
