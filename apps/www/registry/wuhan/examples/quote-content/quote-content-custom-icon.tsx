"use client";

import { useState } from "react";
import { QuoteContentComposed } from "@/registry/wuhan/composed/quote-content/quote-content";
import { Reply, XCircle } from "lucide-react";

export default function QuoteContentCustomIcon() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="w-full max-w-2xl">
      {visible ? (
        <QuoteContentComposed
          content="自定义图标与关闭按钮"
          icon={<Reply className="w-4 h-4 text-slate-500" />}
          closeIcon={<XCircle className="w-4 h-4 text-slate-500" />}
          onClose={() => setVisible(false)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setVisible(true)}
          className="appearance-none border-0 bg-transparent p-0 text-sm text-muted-foreground hover:text-[var(--text-primary)]"
        >
          重新显示引用
        </button>
      )}
    </div>
  );
}
