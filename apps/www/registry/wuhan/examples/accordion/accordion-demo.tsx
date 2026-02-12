"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
} from "@/registry/wuhan/composed/block-accordion/block-accordion";

// ==================== 演示组件 ====================

export default function AccordionDemo() {
  // 状态管理
  const [singleValue, setSingleValue] = React.useState<string>("");

  return (
    <div className="w-full max-w-[650px] mx-auto p-4 space-y-8">
      {/* 单选模式（默认） */}
      <div className="">
        <h3 className="text-xl mb-3">单选模式（一次只能展开一个）</h3>
        <Accordion type="single" collapsible>
          <AccordionItem
            value="item-1"
            trigger={
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                工作目标：5
              </div>
            }
            content={
              <div className="text-sm text-[var(--text-secondary)]">
                工作内容
              </div>
            }
          />
          <AccordionItem
            value="item-2"
            trigger={
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                工作目标：5
              </div>
            }
            content={
              <div className="text-sm text-[var(--text-secondary)]">
                工作内容
              </div>
            }
          />
          <AccordionItem
            value="item-3"
            trigger={
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                工作目标：5
              </div>
            }
            content={
              <div className="text-sm text-[var(--text-secondary)]">
                工作内容
              </div>
            }
          />
        </Accordion>
      </div>

      {/* 多选模式 */}
      <div>
        <h3 className="text-xl mb-3">多选模式（可以同时展开多个）</h3>
        <Accordion type="multiple">
          <AccordionItem
            value="feature-1"
            trigger={
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                工作目标：5
              </div>
            }
            content={
              <div className="text-sm text-[var(--text-secondary)]">
                工作内容
              </div>
            }
          />
          <AccordionItem
            value="feature-2"
            trigger={
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                工作目标：5
              </div>
            }
            content={
              <div className="text-sm text-[var(--text-secondary)]">
                工作内容
              </div>
            }
          />
          <AccordionItem
            value="feature-3"
            trigger={
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                工作目标：5
              </div>
            }
            content={
              <div className="text-sm text-[var(--text-secondary)]">
                工作内容
              </div>
            }
          />
        </Accordion>
      </div>

      {/* 受控模式 */}
      <div>
        <h3 className="text-xl mb-3">
          受控模式（当前值: {singleValue || "无"})
        </h3>
        <Accordion
          type="single"
          value={singleValue}
          onValueChange={(value) => setSingleValue(value as string)}
        >
          <AccordionItem
            value="controlled-1"
            trigger={
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                受控项目一
              </div>
            }
            content={
              <div className="p-4">这是受控模式下的第一个项目内容。</div>
            }
          />
          <AccordionItem
            value="controlled-2"
            trigger={
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                受控项目二
              </div>
            }
            content={
              <div className="p-4">这是受控模式下的第二个项目内容。</div>
            }
          />
          <AccordionItem
            value="controlled-3"
            trigger={
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                受控项目三
              </div>
            }
            content={
              <div className="p-4">这是受控模式下的第三个项目内容。</div>
            }
          />
        </Accordion>
        <button
          className="mt-3 px-3 py-1.5 text-sm bg-[var(--bg-brand)] text-white rounded-[var(--radius-md)]"
          onClick={() => setSingleValue("")}
        >
          收起全部
        </button>
      </div>
    </div>
  );
}
