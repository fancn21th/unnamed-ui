"use client";

import { Tooltip } from "@/registry/wuhan/composed/tooltip/tooltip";
import { Button } from "@/registry/wuhan/ui/button";
import { Copy, Download, Share2, Trash2 } from "lucide-react";

/**
 * 工具栏 Tooltip 示例
 */
export default function TooltipToolbar() {
  return (
    <div className="inline-flex items-center gap-1 p-2 border rounded-lg bg-background">
      <Tooltip content="复制">
        <Button variant="ghost" size="icon">
          <Copy className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip content="下载">
        <Button variant="ghost" size="icon">
          <Download className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip content="分享">
        <Button variant="ghost" size="icon">
          <Share2 className="w-4 h-4" />
        </Button>
      </Tooltip>

      <div className="w-px h-6 bg-border mx-1" />

      <Tooltip content="删除" side="bottom">
        <Button variant="ghost" size="icon">
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </Tooltip>
    </div>
  );
}
