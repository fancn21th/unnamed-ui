"use client";

import { Tooltip } from "@/registry/wuhan/composed/tooltip/tooltip";
import { Button } from "@/registry/wuhan/ui/button";

/**
 * 不同位置的 Tooltip 示例
 */
export default function TooltipPositions() {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <Tooltip content="顶部提示信息" side="top">
        <Button variant="outline">顶部</Button>
      </Tooltip>

      <Tooltip content="右侧提示信息" side="right">
        <Button variant="outline">右侧</Button>
      </Tooltip>

      <Tooltip content="底部提示信息" side="bottom">
        <Button variant="outline">底部</Button>
      </Tooltip>

      <Tooltip content="左侧提示信息" side="left">
        <Button variant="outline">左侧</Button>
      </Tooltip>
    </div>
  );
}
