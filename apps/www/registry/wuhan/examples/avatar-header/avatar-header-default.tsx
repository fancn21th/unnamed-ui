"use client";

import { AvatarHeader } from "@/registry/wuhan/composed/avatar-header/avatar-header";
import { User, Bot, Settings, Crown } from "lucide-react";

export default function AvatarHeaderDefault() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">默认:</span>
        <AvatarHeader name="用户" time="刚刚" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">自定义图标:</span>
        <AvatarHeader
          icon={<Bot className="w-3 h-3 text-blue-600" />}
          name="AI 助手"
          time="2分钟前"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">图片头像:</span>
        <AvatarHeader
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
          name="John Doe"
          time="5分钟前"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">仅名称:</span>
        <AvatarHeader
          icon={<Crown className="w-3 h-3 text-amber-600" />}
          name="管理员"
        />
      </div>
    </div>
  );
}
