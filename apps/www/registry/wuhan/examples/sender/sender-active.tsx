"use client";

import {
  SenderContainer,
  SenderTextarea,
  SenderActionBar,
  SenderButton,
} from "@/registry/wuhan/blocks/sender/sender-01";
import { Search, Brain, Send } from "lucide-react";

export default function SenderComposedActive() {
  return (
    <SenderContainer className="max-w-2xl border-primary">
      <SenderTextarea placeholder="Type your message..." />
      <SenderActionBar className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SenderButton variant="default" size="sm">
            <Search className="size-4" />
            联网搜索
          </SenderButton>
          <SenderButton variant="outline" size="sm">
            <Brain className="size-4" />
            深度思考
          </SenderButton>
        </div>
        <SenderButton variant="default" size="icon" aria-label="Send">
          <Send className="size-4" />
        </SenderButton>
      </SenderActionBar>
    </SenderContainer>
  );
}
