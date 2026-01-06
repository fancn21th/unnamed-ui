"use client";

import {
  BlockTooltip,
  BlockTooltipTrigger,
  BlockTooltipContent,
} from "@/registry/wuhan/blocks/tooltip/tooltip-01";
import { Button } from "@/registry/wuhan/ui/button";
import { Info, HelpCircle, AlertCircle } from "lucide-react";

export default function TooltipDemo() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="text-center">
        <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
          Block Tooltip 01
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
          带自定义样式的 Block Tooltip 组件
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* 基础用法 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-medium text-[var(--text-primary)]">
            基础用法
          </h4>
          <div className="flex items-center gap-4">
            <BlockTooltip>
              <BlockTooltipTrigger asChild>
                <Button variant="outline">悬停查看提示</Button>
              </BlockTooltipTrigger>
              <BlockTooltipContent>
                这是一个 Block Tooltip 提示信息
              </BlockTooltipContent>
            </BlockTooltip>

            <BlockTooltip>
              <BlockTooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="size-4" />
                </Button>
              </BlockTooltipTrigger>
              <BlockTooltipContent>点击图标了解更多信息</BlockTooltipContent>
            </BlockTooltip>
          </div>
        </div>

        {/* 不同位置 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-medium text-[var(--text-primary)]">
            不同位置
          </h4>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <BlockTooltip>
              <BlockTooltipTrigger asChild>
                <Button variant="outline">顶部</Button>
              </BlockTooltipTrigger>
              <BlockTooltipContent side="top">顶部提示信息</BlockTooltipContent>
            </BlockTooltip>

            <BlockTooltip>
              <BlockTooltipTrigger asChild>
                <Button variant="outline">右侧</Button>
              </BlockTooltipTrigger>
              <BlockTooltipContent side="right">
                右侧提示信息
              </BlockTooltipContent>
            </BlockTooltip>

            <BlockTooltip>
              <BlockTooltipTrigger asChild>
                <Button variant="outline">底部</Button>
              </BlockTooltipTrigger>
              <BlockTooltipContent side="bottom">
                底部提示信息
              </BlockTooltipContent>
            </BlockTooltip>

            <BlockTooltip>
              <BlockTooltipTrigger asChild>
                <Button variant="outline">左侧</Button>
              </BlockTooltipTrigger>
              <BlockTooltipContent side="left">
                左侧提示信息
              </BlockTooltipContent>
            </BlockTooltip>
          </div>
        </div>

        {/* 长文本 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-medium text-[var(--text-primary)]">
            长文本（最大宽度 480px）
          </h4>
          <div className="flex items-center gap-4">
            <BlockTooltip>
              <BlockTooltipTrigger asChild>
                <Button variant="outline">
                  <HelpCircle className="size-4 mr-2" />
                  帮助
                </Button>
              </BlockTooltipTrigger>
              <BlockTooltipContent>
                这是一个较长的提示信息，用于展示 Block Tooltip
                的最大宽度限制。当文本内容超过最大宽度时，会自动换行显示。
              </BlockTooltipContent>
            </BlockTooltip>
          </div>
        </div>

        {/* 带图标 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-medium text-[var(--text-primary)]">
            带图标的触发器
          </h4>
          <div className="flex items-center gap-4">
            <BlockTooltip>
              <BlockTooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <AlertCircle className="size-4" />
                </Button>
              </BlockTooltipTrigger>
              <BlockTooltipContent>
                警告：请注意此操作的影响
              </BlockTooltipContent>
            </BlockTooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
