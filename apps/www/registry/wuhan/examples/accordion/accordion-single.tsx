"use client";

import {
  Accordion,
  AccordionItem,
} from "@/registry/wuhan/composed/block-accordion/block-accordion";

export default function AccordionSingleDemo() {
  return (
    <div className="w-full max-w-[650px]">
      <Accordion type="single" collapsible>
        <AccordionItem
          value="item-1"
          trigger="项目一"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              这是项目一的内容
            </div>
          }
        />
        <AccordionItem
          value="item-2"
          trigger="项目二"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              这是项目二的内容
            </div>
          }
        />
        <AccordionItem
          value="item-3"
          trigger="项目三"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              这是项目三的内容
            </div>
          }
        />
      </Accordion>
    </div>
  );
}
