"use client";

import { Button } from "@/registry/wuhan/composed/block-button/block-button";
import { ArrowRight, Download, Send } from "lucide-react";

export default function ButtonWithIconDemo() {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="solid"
        color="primary"
        icon={<Send className="size-4" />}
      >
        发送
      </Button>
      <Button
        variant="outline"
        color="primary"
        icon={<Download className="size-4" />}
      >
        下载
      </Button>
      <Button
        variant="text"
        color="primary"
        iconRight={<ArrowRight className="size-4" />}
      >
        下一步
      </Button>
    </div>
  );
}
