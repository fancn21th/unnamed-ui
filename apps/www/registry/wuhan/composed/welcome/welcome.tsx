"use client";

import * as React from "react";
import {
  WelcomeContainer,
  WelcomeIcon,
  WelcomeText,
} from "@/registry/wuhan/blocks/welcome/welcome-01";

/**
 * 欢迎消息组件属性
 *
 * @public
 */
export interface WelcomeProps {
  /** 可选的图标元素，显示在文本左侧 */
  icon?: React.ReactNode;
  /** 欢迎文本内容 */
  text: React.ReactNode;
  /** 额外的样式类名 */
  className?: string;
}

/**
 * 欢迎消息组件
 *
 * 用于展示聊天界面的空状态欢迎信息，支持图标和自定义文本。
 * 适用于新对话开始、功能介绍等场景。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <WelcomeMessage
 *   icon={<Sparkles />}
 *   text="你好！我是 AI 助手，有什么可以帮你的吗？"
 * />
 *
 * // 多行文本
 * <WelcomeMessage
 *   icon={<Bot />}
 *   text={
 *     <div>
 *       <p>欢迎使用 AI 助手</p>
 *       <p className="text-sm text-muted-foreground">
 *         我可以帮助你解答问题、生成代码等
 *       </p>
 *     </div>
 *   }
 * />
 * ```
 *
 * @public
 */
export const WelcomeMessage = React.forwardRef<HTMLDivElement, WelcomeProps>(
  ({ icon, text, className }, ref) => {
    return (
      <WelcomeContainer ref={ref} className={className}>
        {/* 图标容器 - 仅在提供了 icon 时渲染 */}
        {icon && <WelcomeIcon>{icon}</WelcomeIcon>}
        {/* 文本内容容器 */}
        <WelcomeText>{text}</WelcomeText>
      </WelcomeContainer>
    );
  },
);
WelcomeMessage.displayName = "WelcomeMessage";
