"use client";

import { useState } from "react";
import { AvatarHeader } from "@/registry/wuhan/composed/avatar-header/avatar-header";
import { ImageOff } from "lucide-react";

export default function AvatarHeaderError() {
  const [errorCount, setErrorCount] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">正常加载:</span>
        <AvatarHeader
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=valid"
          alt="正常头像"
          name="正常用户"
          time="在线"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">加载失败:</span>
        <AvatarHeader
          src="https://invalid-url.example.com/avatar.jpg"
          alt="失败头像"
          name="加载失败"
          time="显示默认图标"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">
          自定义错误处理:
        </span>
        <AvatarHeader
          src="https://invalid-url-2.example.com/avatar.jpg"
          alt="自定义错误"
          icon={<ImageOff className="w-3 h-3 text-gray-400" />}
          name="自定义 fallback"
          time={`错误次数: ${errorCount}`}
          onError={() => {
            setErrorCount((prev) => prev + 1);
            return true; // 使用默认 fallback
          }}
        />
      </div>
    </div>
  );
}
