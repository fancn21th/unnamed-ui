"use client";

import { Tooltip } from "@/registry/wuhan/composed/tooltip/tooltip";
import { Button } from "@/registry/wuhan/ui/button";

/**
 * 长文本 Tooltip 示例
 */
export default function TooltipLongText() {
  return (
    <div className="flex items-center gap-4">
      <Tooltip
        content="这是一段比较长的提示文本，用于展示 Tooltip 组件如何处理较长的内容。组件会自动换行并保持适当的宽度。"
        side="top"
      >
        <Button variant="outline">查看长文本提示</Button>
      </Tooltip>

      <Tooltip
        content="Tooltip 最大宽度为 480px，超过这个宽度的内容会自动换行显示，确保内容的可读性和美观性。"
        side="bottom"
      >
        <Button variant="outline">底部长文本</Button>
      </Tooltip>
    </div>
  );
}
