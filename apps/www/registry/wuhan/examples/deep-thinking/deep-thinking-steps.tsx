"use client";

import { DeepThinking } from "@/registry/wuhan/composed/deep-thinking/deep-thinking";
import { CheckCircle2, Circle } from "lucide-react";

export default function DeepThinkingSteps() {
  return (
    <div className="space-y-4 w-full h-full max-w-2xl">
      {/* 步骤式思考展示 */}
      <DeepThinking
        status="completed"
        title="推理过程(用时5秒)"
        defaultOpen
        content={
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <div className="font-semibold text-sm">步骤1: 问题理解</div>
                <div className="text-sm text-muted-foreground">
                  识别用户问题的核心意图和关键信息点
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <div className="font-semibold text-sm">步骤2: 知识检索</div>
                <div className="text-sm text-muted-foreground">
                  从知识库中检索相关背景信息和参考资料
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <div className="font-semibold text-sm">步骤3: 逻辑推理</div>
                <div className="text-sm text-muted-foreground">
                  综合分析信息，进行逻辑推理和结论推导
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <div className="font-semibold text-sm">步骤4: 答案生成</div>
                <div className="text-sm text-muted-foreground">
                  基于推理结果生成准确、完整的答案
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* 进行中的步骤展示 */}
      <DeepThinking
        status="thinking"
        defaultOpen
        content={
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <div className="font-semibold text-sm">✓ 理解问题</div>
                <div className="text-sm text-muted-foreground">已完成</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <div className="font-semibold text-sm">✓ 检索知识</div>
                <div className="text-sm text-muted-foreground">已完成</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-sm">○ 逻辑推理</div>
                <div className="text-sm text-muted-foreground">进行中...</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Circle className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <div className="font-semibold text-sm text-gray-400">
                  ○ 生成答案
                </div>
                <div className="text-sm text-muted-foreground">等待中</div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
