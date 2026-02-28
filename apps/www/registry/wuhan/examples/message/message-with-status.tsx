"use client";

import { useState } from "react";
import {
  AIMessage,
  UserMessage,
} from "@/registry/wuhan/composed/message/message";
import {
  LoadingDots,
  MessageGeneratingPrimitive,
  MessageFailedPrimitive,
} from "@/registry/wuhan/blocks/message/message-01";
import { Button } from "@/registry/wuhan/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function MessageWithStatus() {
  const [status, setStatus] = useState<"idle" | "generating" | "failed">(
    "idle",
  );

  const handleGenerate = () => {
    setStatus("generating");
    // 模拟生成过程
    setTimeout(() => {
      setStatus("idle");
    }, 2000);
  };

  const handleFail = () => {
    setStatus("failed");
  };

  const handleRetry = () => {
    setStatus("generating");
    setTimeout(() => {
      setStatus("idle");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full max-w-2xl">
      {/* 示例 1: 正常状态 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--Text-text-secondary)]">
          正常状态
        </h3>
        <div className="flex justify-start w-full">
          <AIMessage status="idle">
            这是一条正常的 AI 消息，显示完整的内容。
          </AIMessage>
        </div>
      </div>

      {/* 示例 2: 生成中状态 - 使用原语组件 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--Text-text-secondary)]">
          生成中状态（使用原语组件）
        </h3>
        <div className="flex justify-start w-full">
          <AIMessage
            status="generating"
            generatingContent={
              <MessageGeneratingPrimitive
                indicator={<LoadingDots />}
                text="正在思考中..."
              />
            }
          />
        </div>
      </div>

      {/* 示例 3: 生成中状态 - 自定义内容 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--Text-text-secondary)]">
          生成中状态（自定义）
        </h3>
        <div className="flex justify-start w-full">
          <AIMessage
            status="generating"
            generatingContent={
              <span className="text-[var(--Text-text-secondary)]">
                正在生成回复，请稍候...
              </span>
            }
          >
            原始内容（不会显示）
          </AIMessage>
        </div>
      </div>

      {/* 示例 4: 生成失败状态 - 使用默认错误消息 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--Text-text-secondary)]">
          生成失败状态（默认）
        </h3>
        <div className="flex justify-start w-full">
          <AIMessage status="failed" errorMessage="生成失败，请稍后重试">
            原始内容（不会显示）
          </AIMessage>
        </div>
      </div>

      {/* 示例 5: 生成失败状态 - 使用原语组件 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--Text-text-secondary)]">
          生成失败状态（使用原语组件）
        </h3>
        <div className="flex justify-start w-full">
          <AIMessage
            status="failed"
            errorContent={
              <MessageFailedPrimitive
                icon={
                  <AlertCircle className="size-4 text-[var(--Text-text-error)]" />
                }
                message="生成失败，请稍后重试"
              />
            }
          >
            原始内容（不会显示）
          </AIMessage>
        </div>
      </div>

      {/* 示例 6: 生成失败状态 - 带重试按钮（使用原语组件） */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--Text-text-secondary)]">
          生成失败状态（带重试，使用原语组件）
        </h3>
        <div className="flex justify-start w-full">
          <AIMessage
            status="failed"
            errorContent={
              <MessageFailedPrimitive
                icon={
                  <AlertCircle className="size-4 text-[var(--Text-text-error)]" />
                }
                message="生成失败，请稍后重试"
                actions={
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    className="w-fit"
                  >
                    <RefreshCw className="size-3 mr-1" />
                    重试
                  </Button>
                }
              />
            }
          >
            原始内容（不会显示）
          </AIMessage>
        </div>
      </div>

      {/* 示例 7: 交互式演示 */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-sm font-medium">交互式演示</h3>
        <div className="flex justify-start w-full">
          <AIMessage
            status={status}
            generatingContent={
              <MessageGeneratingPrimitive
                indicator={<LoadingDots />}
                text="正在生成回复..."
              />
            }
            errorMessage="生成失败，请稍后重试"
            errorContent={
              <MessageFailedPrimitive
                icon={
                  <AlertCircle className="size-4 text-[var(--Text-text-error)]" />
                }
                message="生成失败"
                actions={
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    className="w-fit"
                  >
                    <RefreshCw className="size-3 mr-1" />
                    重试
                  </Button>
                }
              />
            }
          >
            {status === "idle" && "这是一条正常的 AI 消息回复。"}
          </AIMessage>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleGenerate} disabled={status === "generating"}>
            模拟生成
          </Button>
          <Button
            onClick={handleFail}
            variant="destructive"
            disabled={status === "generating"}
          >
            模拟失败
          </Button>
        </div>
      </div>
    </div>
  );
}
