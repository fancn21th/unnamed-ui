"use client";

import {
  SenderResponsiveContainer,
  SenderResponsiveTextarea,
  SenderResponsiveInputRow,
  SenderResponsiveButtonGroup,
  SenderResponsiveAttachmentButton,
  SenderResponsiveSendButton,
} from "@/registry/wuhan/blocks/sender/sender-responsive-01";
import { Send, Paperclip } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function SenderResponsiveDefault() {
  const [value, setValue] = useState("");
  const [isOverflow, setIsOverflow] = useState(false);
  const containerRef = useRef<HTMLFormElement>(null);

  // 检测溢出的简单示例
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { scrollWidth, clientWidth } = entry.target as HTMLElement;
        setIsOverflow(scrollWidth > clientWidth);
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <SenderResponsiveContainer
      ref={containerRef}
      className="max-w-2xl"
      onOverflowChange={setIsOverflow}
    >
      <SenderResponsiveInputRow isOverflow={isOverflow}>
        <SenderResponsiveTextarea
          placeholder={isOverflow ? "输入内容..." : "输入消息..."}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isOverflow={isOverflow}
        />
        <SenderResponsiveButtonGroup isOverflow={isOverflow}>
          <SenderResponsiveAttachmentButton
            type="button"
            onClick={() => alert("点击附件")}
            aria-label="Attach file"
          >
            <Paperclip className="size-4" />
          </SenderResponsiveAttachmentButton>
          <SenderResponsiveSendButton
            type="submit"
            onClick={() => {
              if (value.trim()) {
                alert(`发送: ${value}`);
                setValue("");
              }
            }}
            disabled={!value.trim()}
          />
        </SenderResponsiveButtonGroup>
      </SenderResponsiveInputRow>
    </SenderResponsiveContainer>
  );
}
