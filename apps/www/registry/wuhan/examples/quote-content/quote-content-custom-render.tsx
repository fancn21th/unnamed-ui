"use client";

import { QuoteContentComposed } from "@/registry/wuhan/composed/quote-content/quote-content";
import { MessageSquareText } from "lucide-react";

export default function QuoteContentCustomRender() {
  return (
    <div className="w-full max-w-2xl">
      <QuoteContentComposed
        content="自定义渲染结构"
        renderLeading={({ icon }) => (
          <div className="flex items-center text-slate-500">
            {icon ?? <MessageSquareText className="w-4 h-4" />}
          </div>
        )}
        renderContent={({ content }) => (
          <div className="flex-1 text-sm text-slate-700">{content}</div>
        )}
        renderClose={({ onClose }) => (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose?.();
            }}
            className="appearance-none border-0 bg-transparent p-0 text-xs text-slate-500 hover:text-slate-900"
          >
            关闭
          </button>
        )}
        onClose={() => undefined}
      />
    </div>
  );
}
