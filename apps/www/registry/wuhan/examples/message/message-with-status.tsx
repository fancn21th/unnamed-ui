"use client";

import { useState } from "react";
import {
  AIMessage,
  UserMessage,
} from "@/registry/wuhan/blocks/message/message-01";
import { Button } from "@/registry/wuhan/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

// 三个圆点的加载动画组件
function LoadingDots() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes loading-dot-bounce {
            0%, 80%, 100% {
              transform: scale(1);
              opacity: 0.5;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `,
        }}
      />
      <div className="flex items-center gap-1">
        <div
          className="w-1 h-1 rounded-full bg-[var(--bg-brand)]"
          style={{
            animation: "loading-dot-bounce 1.4s ease-in-out infinite",
            animationDelay: "-0.32s",
          }}
        />
        <div
          className="w-1 h-1 rounded-full bg-[var(--bg-brand)]"
          style={{
            animation: "loading-dot-bounce 1.4s ease-in-out infinite",
            animationDelay: "-0.16s",
          }}
        />
        <div
          className="w-1 h-1 rounded-full bg-[var(--bg-brand)]"
          style={{
            animation: "loading-dot-bounce 1.4s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
}

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
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          正常状态
        </h3>
        <div className="flex justify-start w-full">
          <AIMessage status="idle">
            这是一条正常的 AI 消息，显示完整的内容。
          </AIMessage>
        </div>
      </div>

      {/* 示例 2: 生成中状态 - 使用默认内容 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          生成中状态（默认）
        </h3>
        <div className="flex justify-start w-full">
          <AIMessage status="generating">正在生成中</AIMessage>
        </div>
      </div>

      {/* 示例 3: 生成中状态 - 自定义内容 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          生成中状态（自定义）
        </h3>
        <div className="flex justify-start w-full">
          <AIMessage
            status="generating"
            generatingContent={
              <div className="flex items-center gap-2">
                <LoadingDots />
                <span className="text-[var(--text-secondary)]">
                  正在思考中...
                </span>
              </div>
            }
          >
            原始内容（不会显示）
          </AIMessage>
        </div>
      </div>

      {/* 示例 4: 生成失败状态 - 使用默认错误消息 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          生成失败状态（默认）
        </h3>
        <div className="flex justify-start w-full">
          <AIMessage status="failed" errorMessage="生成失败，请稍后重试">
            原始内容（不会显示）
          </AIMessage>
        </div>
      </div>

      {/* 示例 5: 生成失败状态 - 自定义错误内容 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          生成失败状态（自定义）
        </h3>
        <div className="flex justify-start w-full">
          <AIMessage
            status="failed"
            errorMessage="生成失败，请稍后重试"
            errorContent={
              <div className="flex items-center gap-2">
                <AlertCircle className="size-4 text-destructive" />
                <span className="text-destructive">生成失败，请稍后重试</span>
              </div>
            }
          >
            原始内容（不会显示）
          </AIMessage>
        </div>
      </div>

      {/* 示例 6: 生成失败状态 - 带重试按钮 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
          生成失败状态（带重试）
        </h3>
        <div className="flex justify-start w-full">
          <AIMessage
            status="failed"
            errorContent={
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-4 text-[var(--text-error)]" />
                  <span className="text-[var(--text-error)]">
                    生成失败，请稍后重试
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetry}
                  className="w-fit"
                >
                  <RefreshCw className="size-3 mr-1" />
                  重试
                </Button>
              </div>
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
              <div className="flex items-center gap-2">
                <LoadingDots />
                <span className="text-[var(--text-secondary)]">
                  正在生成回复...
                </span>
              </div>
            }
            errorMessage="生成失败，请稍后重试"
            errorContent={
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-4 text-[var(--text-error)]" />
                  <span className="text-[var(--text-error)]">生成失败</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetry}
                  className="w-fit"
                >
                  <RefreshCw className="size-3 mr-1" />
                  重试
                </Button>
              </div>
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
