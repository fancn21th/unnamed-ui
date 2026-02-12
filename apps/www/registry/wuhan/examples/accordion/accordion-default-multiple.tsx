"use client";

import {
  Accordion,
  AccordionItem,
} from "@/registry/wuhan/composed/block-accordion/block-accordion";

export default function AccordionDefaultMultipleDemo() {
  return (
    <div className="w-full max-w-[650px] space-y-8">
      {/* 默认展开多个 */}
      <div>
        <h3 className="text-sm font-medium mb-3 text-[var(--text-primary)]">
          默认展开多个项（使用数组）
        </h3>
        <Accordion type="multiple" defaultValue={["item-1", "item-3"]}>
          <AccordionItem
            value="item-1"
            trigger="项目一（默认展开）"
            content={
              <div className="p-4 text-sm text-[var(--text-secondary)]">
                这个项目默认是展开的
              </div>
            }
          />
          <AccordionItem
            value="item-2"
            trigger="项目二"
            content={
              <div className="p-4 text-sm text-[var(--text-secondary)]">
                这个项目默认是收起的
              </div>
            }
          />
          <AccordionItem
            value="item-3"
            trigger="项目三（默认展开）"
            content={
              <div className="p-4 text-sm text-[var(--text-secondary)]">
                这个项目默认是展开的
              </div>
            }
          />
        </Accordion>
      </div>

      {/* 默认展开单个（使用字符串） */}
      <div>
        <h3 className="text-sm font-medium mb-3 text-[var(--text-primary)]">
          默认展开单个项（使用字符串）
        </h3>
        <Accordion type="multiple" defaultValue="item-2">
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
    </div>
  );
}
