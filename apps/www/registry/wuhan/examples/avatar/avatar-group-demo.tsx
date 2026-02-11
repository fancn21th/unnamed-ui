"use client";

import { Avatar, AvatarGroup } from "@/registry/wuhan/composed/avatar/avatar";
import { User, Mail } from "lucide-react";

export default function AvatarGroupDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">基础头像组</h3>
        <AvatarGroup>
          <Avatar style={{ backgroundColor: "#fde3cf" }}>A</Avatar>
          <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<User className="h-4 w-4" />}
          />
          <Avatar
            style={{ backgroundColor: "#1677ff" }}
            icon={<Mail className="h-4 w-4" />}
          />
        </AvatarGroup>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">限制显示数量</h3>
        <AvatarGroup maxCount={3}>
          <Avatar style={{ backgroundColor: "#fde3cf" }}>A</Avatar>
          <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
          <Avatar style={{ backgroundColor: "#87d068" }}>Z</Avatar>
          <Avatar style={{ backgroundColor: "#1677ff" }}>L</Avatar>
          <Avatar style={{ backgroundColor: "#eb2f96" }}>W</Avatar>
        </AvatarGroup>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">自定义间距</h3>
        <AvatarGroup spacing={-12}>
          <Avatar style={{ backgroundColor: "#fde3cf" }}>A</Avatar>
          <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
          <Avatar style={{ backgroundColor: "#87d068" }}>Z</Avatar>
          <Avatar style={{ backgroundColor: "#1677ff" }}>L</Avatar>
        </AvatarGroup>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">图片头像组</h3>
        <AvatarGroup>
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" />
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
        </AvatarGroup>
      </div>
    </div>
  );
}
