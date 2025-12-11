"use client";

import {
  PromptInput,
  PromptWebSearchButton,
  PromptSendButton,
} from "@/registry/wuhan/blocks/prompt-01";

export default function PromptComposedDisabled() {
  return (
    <div className="flex w-full max-w-2xl flex-col rounded-md border p-3 transition-colors has-[:focus-visible]:border-primary">
      <PromptInput />
      <div className="flex items-center justify-between gap-2 pt-2">
        <PromptWebSearchButton />
        <PromptSendButton disabled={true} />
      </div>
    </div>
  );
}
