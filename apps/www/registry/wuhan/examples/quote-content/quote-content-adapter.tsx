"use client";

import { useState } from "react";
import { QuoteContentComposed } from "@/registry/wuhan/composed/quote-content/quote-content";

type QuoteData = {
  id: string;
  text: string;
};

export default function QuoteContentAdapter() {
  const [quote, setQuote] = useState<QuoteData | null>({
    id: "q-1",
    text: "来自业务数据的引用内容",
  });

  return (
    <div className="w-full max-w-2xl">
      {quote ? (
        <QuoteContentComposed
          quote={quote}
          quoteAdapter={(item) => ({ content: item.text })}
          onCloseQuote={() => setQuote(null)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setQuote({ id: "q-2", text: "重新添加的引用内容" })}
          className="appearance-none border-0 bg-transparent p-0 text-sm text-muted-foreground hover:text-[var(--text-primary)]"
        >
          重新添加引用
        </button>
      )}
    </div>
  );
}
