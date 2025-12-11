"use client";

import { useState } from "react";
import {
  PromptInput,
  PromptWebSearchButton,
  PromptSendButton,
} from "@/registry/wuhan/blocks/prompt-01";
import { ThemeEditor } from "@/components/theme-editor";
export default function PromptDemo() {
  const [value, setValue] = useState("");
  const isEmpty = !value.trim();

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <div className="flex w-full max-w-2xl flex-col rounded-md border p-3 transition-colors has-[:focus-visible]:border-primary">
        <PromptInput value={value} onChange={(e) => setValue(e.target.value)} />
        <div className="flex items-center justify-between gap-2 pt-2">
          <PromptWebSearchButton />
          <PromptSendButton disabled={isEmpty} />
        </div>
      </div>
      <div className="w-full max-w-2xl">
        <ThemeEditor />
      </div>
    </div>
  );
}
