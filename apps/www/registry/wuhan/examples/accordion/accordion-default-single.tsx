"use client";

import {
  Accordion,
  AccordionItem,
} from "@/registry/wuhan/composed/block-accordion/block-accordion";

export default function AccordionDefaultSingleDemo() {
  return (
    <div className="w-full max-w-[650px]">
      <Accordion type="single" defaultValue="item-2">
        <AccordionItem
          value="item-1"
          trigger="项目一"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              这个项目默认是收起的
            </div>
          }
        />
        <AccordionItem
          value="item-2"
          trigger="项目二（默认展开）"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              这个项目默认是展开的
            </div>
          }
        />
        <AccordionItem
          value="item-3"
          trigger="项目三"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              这个项目默认是收起的
            </div>
          }
        />
      </Accordion>
    </div>
  );
}
