"use client";

import {
  SenderContainer,
  SenderTextarea,
  SenderActionBar,
  SenderButton,
} from "@/registry/wuhan/blocks/sender/sender-01";
import { Search, Send } from "lucide-react";

export default function SenderComposedDisabled() {
  return (
    <SenderContainer className="max-w-2xl opacity-50">
      <SenderTextarea placeholder="Type your message..." disabled />
      <SenderActionBar className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SenderButton variant="outline" size="sm" disabled>
            <Search className="size-4" />
            联网搜索
          </SenderButton>
        </div>
        <SenderButton variant="default" size="icon" disabled aria-label="Send">
          <Send className="size-4" />
        </SenderButton>
      </SenderActionBar>
    </SenderContainer>
  );
}
