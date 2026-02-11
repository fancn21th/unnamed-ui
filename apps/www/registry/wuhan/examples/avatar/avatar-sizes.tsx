"use client";

import { Avatar } from "@/registry/wuhan/composed/avatar/avatar";

export default function AvatarSizes() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">小尺寸 (sm)</h3>
        <div className="flex items-center gap-4">
          <Avatar
            size="sm"
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          />
          <Avatar size="sm" style={{ backgroundColor: "#1677ff" }}>
            A
          </Avatar>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">中尺寸 (md) - 默认</h3>
        <div className="flex items-center gap-4">
          <Avatar
            size="md"
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          />
          <Avatar size="md" style={{ backgroundColor: "#1677ff" }}>
            A
          </Avatar>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">大尺寸 (lg)</h3>
        <div className="flex items-center gap-4">
          <Avatar
            size="lg"
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          />
          <Avatar size="lg" style={{ backgroundColor: "#1677ff" }}>
            A
          </Avatar>
        </div>
      </div>
    </div>
  );
}
