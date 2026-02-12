"use client";

import {
  Accordion,
  AccordionItem,
} from "@/registry/wuhan/composed/block-accordion/block-accordion";

export default function AccordionExpandAllDemo() {
  return (
    <div className="w-full max-w-[650px]">
      <Accordion type="multiple" expandAll>
        <AccordionItem
          value="item-1"
          trigger="项目一（默认展开）"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              所有项目都默认展开
            </div>
          }
        />
        <AccordionItem
          value="item-2"
          trigger="项目二（默认展开）"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              所有项目都默认展开
            </div>
          }
        />
        <AccordionItem
          value="item-3"
          trigger="项目三（默认展开）"
          content={
            <div className="p-4 text-sm text-[var(--text-secondary)]">
              所有项目都默认展开
            </div>
          }
        />
      </Accordion>
    </div>
  );
}
