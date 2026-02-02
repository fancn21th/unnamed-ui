"use client";

import { AvatarHeader } from "@/registry/wuhan/composed/avatar-header/avatar-header";

export default function AvatarHeaderSizes() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">
          小号 (small):
        </span>
        <AvatarHeader
          size="small"
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=small"
          name="小头像"
          time="刚刚"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">
          默认 (default):
        </span>
        <AvatarHeader
          size="default"
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=default"
          name="默认头像"
          time="1分钟前"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">
          大号 (large):
        </span>
        <AvatarHeader
          size="large"
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=large"
          name="大头像"
          time="5分钟前"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">
          自定义 (32px):
        </span>
        <AvatarHeader
          size={32}
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=custom"
          name="自定义尺寸"
          time="10分钟前"
        />
      </div>
    </div>
  );
}
