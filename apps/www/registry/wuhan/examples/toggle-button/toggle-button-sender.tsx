"use client";

import { useState } from "react";
import { ToggleButton } from "@/registry/wuhan/composed/toggle-button/toggle-button";
import { Search, Brain } from "lucide-react";

/**
 * Sender 模式切换示例
 */
export default function ToggleButtonSender() {
  const [modes, setModes] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const modeOptions = [
    { id: "web-search", label: "联网搜索" },
    { id: "deep-think", label: "深度思考" },
  ];

  const handleSend = () => {
    console.log("发送消息:", input);
    console.log("已启用模式:", modes);
    setInput("");
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg max-w-2xl">
      <div className="space-y-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入你的问题..."
          className="w-full min-h-[100px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex items-center justify-between">
        <ToggleButton
          options={modeOptions}
          values={modes}
          onValuesChange={setModes}
          multiple
          variant="compact"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          发送
        </button>
      </div>
      {modes.length > 0 && (
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          {modes.includes("web-search") && (
            <span className="flex items-center gap-1">
              <Search className="w-3 h-3" />
              联网搜索已启用
            </span>
          )}
          {modes.includes("deep-think") && (
            <span className="flex items-center gap-1">
              <Brain className="w-3 h-3" />
              深度思考已启用
            </span>
          )}
        </div>
      )}
    </div>
  );
}
