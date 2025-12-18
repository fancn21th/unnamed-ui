"use client";

import * as React from "react";

/**
 * 三个圆点的加载动画组件
 * 用于消息生成中的状态显示
 */
export function LoadingDots() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes loading-dot-bounce {
            0%, 80%, 100% {
              transform: scale(1);
              opacity: 0.5;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `,
        }}
      />
      <div className="flex items-center gap-1">
        <div
          className="w-1 h-1 rounded-full bg-[var(--primary)]"
          style={{
            animation: "loading-dot-bounce 1.4s ease-in-out infinite",
            animationDelay: "-0.32s",
          }}
        />
        <div
          className="w-1 h-1 rounded-full bg-[var(--primary)]"
          style={{
            animation: "loading-dot-bounce 1.4s ease-in-out infinite",
            animationDelay: "-0.16s",
          }}
        />
        <div
          className="w-1 h-1 rounded-full bg-[var(--primary)]"
          style={{
            animation: "loading-dot-bounce 1.4s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
}


