"use client";

import { Tooltip } from "@/registry/wuhan/composed/tooltip/tooltip";
import { Button } from "@/registry/wuhan/ui/button";
import { Info, HelpCircle, AlertCircle, Settings } from "lucide-react";

/**
 * 带图标的 Tooltip 示例
 */
export default function TooltipWithIcons() {
  return (
    <div className="flex items-center gap-4">
      <Tooltip content="了解更多信息">
        <Button variant="ghost" size="icon">
          <Info className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip content="获取帮助" side="bottom">
        <Button variant="ghost" size="icon">
          <HelpCircle className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip content="重要提示" side="right">
        <Button variant="ghost" size="icon">
          <AlertCircle className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip content="打开设置" side="left">
        <Button variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </Tooltip>
    </div>
  );
}
