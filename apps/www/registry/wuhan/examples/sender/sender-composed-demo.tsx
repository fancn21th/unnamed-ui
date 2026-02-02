"use client";

import { useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { ComposedSender } from "@/registry/wuhan/composed/sender/sender";
import { SenderTextarea } from "@/registry/wuhan/blocks/sender/sender-01";
import { QuoteContentComposed } from "@/registry/wuhan/composed/quote-content/quote-content";
import { Brain, Search, Sparkles } from "lucide-react";

export default function SenderComposedDemo() {
  const [value, setValue] = useState("");
  const [selectedModes, setSelectedModes] = useState<string[]>(["deep"]);

  const modes = [
    { key: "deep", name: "深度思考", icon: Brain },
    { key: "web", name: "联网搜索", icon: Search },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="w-full max-w-2xl text-sm text-muted-foreground">
        高级示例：自定义输入区域与操作栏（renderInput / renderActionBar）
      </div>
      <ComposedSender
        value={value}
        onChange={setValue}
        quoteContent={
          <QuoteContentComposed content="提示：你可以覆盖输入和操作栏。" />
        }
        modes={modes}
        selectedModes={selectedModes}
        modeAdapter={(mode) => ({
          id: mode.key,
          label: mode.name,
          icon: mode.icon as ComponentType<SVGProps<SVGSVGElement>>,
        })}
        modeSelection="exclusive"
        allowEmptySelection={false}
        onModeChange={(next) => setSelectedModes(next)}
        renderInput={({ placeholder, disabled, onChange, onKeyDown }) => (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
            <SenderTextarea
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder={placeholder ?? "写下你的需求..."}
              disabled={disabled}
              onKeyDown={onKeyDown}
              className="bg-transparent"
            />
          </div>
        )}
        renderActionBar={({ onAttachRequest, canSend }) => (
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onAttachRequest}
              className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-100"
            >
              <Sparkles className="size-3" />
              插入灵感
            </button>
            <button
              type="submit"
              disabled={!canSend}
              className="rounded-md bg-slate-900 px-3 py-1 text-xs text-white disabled:opacity-60"
            >
              发送
            </button>
          </div>
        )}
        submitOnEnter
        getCanSend={({ value: currentValue }) => currentValue.trim().length > 0}
        onSend={() => setValue("")}
      />
    </div>
  );
}
