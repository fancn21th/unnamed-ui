"use client";

import { DeepThinking } from "@/registry/wuhan/composed/deep-thinking/deep-thinking";
import { Button } from "@/registry/wuhan/ui/button";
import { useState } from "react";

export default function DeepThinkingControlled() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"thinking" | "completed" | "failed">(
    "thinking",
  );

  return (
    <div className="space-y-4 w-full h-full max-w-2xl">
      {/* 控制按钮 */}
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "折叠" : "展开"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setStatus("thinking")}
        >
          思考中
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setStatus("completed")}
        >
          已完成
        </Button>
        <Button size="sm" variant="outline" onClick={() => setStatus("failed")}>
          失败
        </Button>
      </div>

      {/* 受控组件 */}
      <DeepThinking
        status={status}
        title={
          status === "thinking"
            ? "AI 正在思考"
            : status === "completed"
              ? "分析完成(用时3秒)"
              : "思考中断"
        }
        content={
          status === "thinking"
            ? "正在分析您的问题，识别关键信息和上下文..."
            : status === "completed"
              ? "已完成深度分析，识别出问题的核心要点，准备生成回答。分析过程包括：语义理解、知识检索、逻辑推理等多个步骤。"
              : "抱歉，思考过程遇到问题。可能的原因：网络连接中断、服务器繁忙或问题过于复杂。建议简化问题后重试。"
        }
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  );
}
