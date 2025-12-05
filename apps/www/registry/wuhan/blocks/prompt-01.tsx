"use client";

import { useState } from "react";
import { Textarea } from "@/registry/wuhan/ui/textarea";
import { Button } from "@/registry/wuhan/ui/button";
import { Search, Send } from "lucide-react";


export function PromptInput(props: { value?: string; onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <Textarea
      placeholder="Type your message here."
      className="resize-none border-none p-0 shadow-none focus-visible:ring-0"
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export function PromptWebSearchButton() {
  return (
    <Button variant="default" size="default" aria-label="Search">
      <Search />
      <span className="">web search</span>
    </Button>
  );
}

export function PromptSendButton(props: { disabled: boolean }) {
  return (
    <Button variant="default"  size="icon" aria-label="Send" disabled={props.disabled}>
      <Send />
    </Button>
  );
}

// block / prompt-01
export function Prompt() {
  const [value, setValue] = useState("");
  const isEmpty = !value.trim();

  return (
    <div className="flex w-full max-w-2xl flex-col rounded-md border p-3 transition-colors has-[:focus-visible]:border-primary">
      <Textarea 
        placeholder="Type your message here." 
        className="resize-none border-none p-0 shadow-none focus-visible:ring-0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex items-center justify-between gap-2 pt-2">
        <Button variant="default" size="default" aria-label="Search">
          <Search />
          <span className="">web search</span>
        </Button>
        <Button variant="default"  size="icon" aria-label="Send" disabled={isEmpty}>
          <Send />
        </Button>
      </div>
    </div>
  );
}
