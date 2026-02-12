"use client";

import {
  Accordion,
  AccordionItem,
} from "@/registry/wuhan/composed/block-accordion/block-accordion";

export default function AccordionMultipleDemo() {
  return (
    <div className="w-full max-w-[650px]">
      <Accordion type="multiple">
        <AccordionItem
          value="feature-1"
          trigger="特性一"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              特性一的详细内容说明
            </div>
          }
        />
        <AccordionItem
          value="feature-2"
          trigger="特性二"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              特性二的详细内容说明
            </div>
          }
        />
        <AccordionItem
          value="feature-3"
          trigger="特性三"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              特性三的详细内容说明
            </div>
          }
        />
      </Accordion>
    </div>
  );
}
