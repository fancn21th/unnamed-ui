"use client";

import { WelcomeMessage } from "@/registry/wuhan/composed/welcome/welcome";
import { Wand2, Sparkles } from "lucide-react";

export default function WelcomeDemo() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="text-center">
        <h3 className="text-lg font-medium text-[var(--Text-text-primary)] mb-2">
          Welcome 01
        </h3>
        <p className="text-sm text-[var(--Text-text-secondary)]">
          空状态欢迎语（默认 + 自定义）
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <WelcomeMessage icon={<Wand2 />} text="你好，我今天能帮你什么？" />
        <WelcomeMessage icon={<Sparkles />} text="欢迎回来，想从哪里开始？" />
      </div>
    </div>
  );
}
