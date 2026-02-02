"use client";

import { QuoteContentComposed } from "@/registry/wuhan/composed/quote-content/quote-content";

export default function QuoteContentDefault() {
  return (
    <div className="w-full max-w-2xl">
      <QuoteContentComposed content="这是一条引用内容" />
    </div>
  );
}
