"use client";

import { Avatar } from "@/registry/wuhan/composed/avatar/avatar";
import { User, Mail, Heart, Star } from "lucide-react";

export default function AvatarDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">图片头像</h3>
        <div className="flex items-center gap-4">
          <Avatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="User 1"
          />
          <Avatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
            alt="User 2"
          />
          <Avatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            alt="User 3"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">文本头像</h3>
        <div className="flex items-center gap-4">
          <Avatar style={{ backgroundColor: "#fde3cf" }}>A</Avatar>
          <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
          <Avatar style={{ backgroundColor: "#87d068" }}>张</Avatar>
          <Avatar style={{ backgroundColor: "#1677ff" }}>李</Avatar>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">图标头像</h3>
        <div className="flex items-center gap-4">
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<User className="h-4 w-4" />}
          />
          <Avatar
            style={{ backgroundColor: "#1677ff" }}
            icon={<Mail className="h-4 w-4" />}
          />
          <Avatar
            style={{ backgroundColor: "#f56a00" }}
            icon={<Heart className="h-4 w-4" />}
          />
          <Avatar
            style={{ backgroundColor: "#fde3cf" }}
            icon={<Star className="h-4 w-4" />}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">不同尺寸</h3>
        <div className="flex items-center gap-4">
          <Avatar size="sm" style={{ backgroundColor: "#1677ff" }}>
            S
          </Avatar>
          <Avatar size="md" style={{ backgroundColor: "#1677ff" }}>
            M
          </Avatar>
          <Avatar size="lg" style={{ backgroundColor: "#1677ff" }}>
            L
          </Avatar>
        </div>
      </div>
    </div>
  );
}
