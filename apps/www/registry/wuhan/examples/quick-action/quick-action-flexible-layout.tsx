"use client";

import {
  QuickActionButton,
  QuickActionGroup,
  QuickActionIcon,
} from "@/registry/wuhan/blocks/quick-action/quick-action-01";
import { Sparkles, ChevronRight, Zap, ArrowRight } from "lucide-react";

export default function QuickActionFlexibleLayout() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-3">
          图标在前面（默认）
        </h4>
        <QuickActionGroup>
          <QuickActionButton>
            <QuickActionIcon>
              <Sparkles className="size-4" />
            </QuickActionIcon>
            <span>帮我总结内容</span>
          </QuickActionButton>
        </QuickActionGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-3">
          图标在后面
        </h4>
        <QuickActionGroup>
          <QuickActionButton>
            <span>查看更多</span>
            <QuickActionIcon>
              <ChevronRight className="size-4" />
            </QuickActionIcon>
          </QuickActionButton>
        </QuickActionGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-3">
          两侧都有图标
        </h4>
        <QuickActionGroup>
          <QuickActionButton>
            <QuickActionIcon>
              <Zap className="size-4" />
            </QuickActionIcon>
            <span>快速开始</span>
            <QuickActionIcon>
              <ArrowRight className="size-4" />
            </QuickActionIcon>
          </QuickActionButton>
        </QuickActionGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-3">
          纯图标按钮
        </h4>
        <QuickActionGroup>
          <QuickActionButton aria-label="Sparkles">
            <QuickActionIcon>
              <Sparkles className="size-5" />
            </QuickActionIcon>
          </QuickActionButton>
          <QuickActionButton aria-label="Zap">
            <QuickActionIcon>
              <Zap className="size-5" />
            </QuickActionIcon>
          </QuickActionButton>
        </QuickActionGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-3">
          无图标按钮
        </h4>
        <QuickActionGroup>
          <QuickActionButton>简单文本</QuickActionButton>
          <QuickActionButton>另一个操作</QuickActionButton>
        </QuickActionGroup>
      </div>
    </div>
  );
}
