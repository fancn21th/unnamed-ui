"use client";

import {
  WelcomeContainer,
  WelcomeIcon,
  WelcomeText,
} from "@/registry/wuhan/blocks/welcome/welcome-01";
import { Wand2, Sparkles } from "lucide-react";

export default function WelcomeDemo() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="text-center">
        <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
          Welcome 01
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
          空状态欢迎语（默认 + 自定义）
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <WelcomeContainer>
          <WelcomeIcon>
            <Wand2 />
          </WelcomeIcon>
          <WelcomeText>你好，我今天能帮你什么？</WelcomeText>
        </WelcomeContainer>
        <WelcomeContainer>
          <WelcomeIcon>
            <Sparkles />
          </WelcomeIcon>
          <WelcomeText>欢迎回来，想从哪里开始？</WelcomeText>
        </WelcomeContainer>
      </div>
    </div>
  );
}
