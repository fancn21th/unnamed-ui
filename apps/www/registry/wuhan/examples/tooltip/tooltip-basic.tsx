"use client";

import { Tooltip } from "@/registry/wuhan/composed/tooltip/tooltip";
import { Button } from "@/registry/wuhan/ui/button";

/**
 * 基础 Tooltip 示例
 */
export default function TooltipBasic() {
  return (
    <div className="flex items-center gap-4">
      <Tooltip content="这是一个提示信息">
        <Button variant="outline">悬停查看提示</Button>
      </Tooltip>

      <Tooltip content="点击按钮执行操作" side="bottom">
        <Button>操作按钮</Button>
      </Tooltip>
    </div>
  );
}
