"use client";

import * as React from "react";
import {
  Avatar,
  AvatarHeader,
  AvatarName,
  AvatarTime,
  MessageAvatarHeader,
} from "@/registry/wuhan/blocks/avatar-header/avatar-header-01";

export default function AvatarHeaderDemo() {
  return (
    <div className="flex flex-col gap-[var(--gap-md)]">
      {/* 推荐用法：组合组件 */}
      <MessageAvatarHeader name="User" time="12:25" />

      {/* 原语用法：完全自定义结构/内容 */}
      <AvatarHeader>
        <Avatar />
        <AvatarName>AI</AvatarName>
        <AvatarTime>09:10</AvatarTime>
      </AvatarHeader>
    </div>
  );
}
