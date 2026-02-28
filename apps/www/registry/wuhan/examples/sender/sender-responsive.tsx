"use client";

import { useState } from "react";
import { ResponsiveSender } from "@/registry/wuhan/composed/sender/responsive-sender";
import {
  SenderResponsiveButtonGroup,
  SenderResponsiveSendButton,
} from "@/registry/wuhan/blocks/sender/sender-responsive-01";

export default function SenderResponsiveDemo() {
  const [value, setValue] = useState("");
  const [overflowStatus, setOverflowStatus] = useState(false);

  const canSend = value.trim().length > 0;

  return (
    <ResponsiveSender
      value={value}
      onChange={setValue}
      placeholder="输入内容..."
      getCanSend={({ value: v }) => v.trim().length > 0}
      sendDisabled={!canSend}
      submitOnEnter
      onOverflowChange={setOverflowStatus}
      onSend={() => setValue("")}
      buttonGroupChildren={
        <SenderResponsiveButtonGroup isOverflow={overflowStatus}>
          <div className="pr-[var(--gap-sm)] pl-[var(--gap-sm)] gap-[var(--gap-sm)] rounded-[var(--radius-sm)] bg-[var(--bg-neutral-light)]">
            <span className="font-size-1 text-[var(--text-primary)]">
              0个数据源
            </span>
          </div>
          <SenderResponsiveSendButton type="submit" disabled={!canSend} />
        </SenderResponsiveButtonGroup>
      }
    />
  );
}
