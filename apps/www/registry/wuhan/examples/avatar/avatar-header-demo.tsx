"use client";

import { AvatarHeader } from "@/registry/wuhan/composed/avatar/avatar";
import { User } from "lucide-react";

export default function AvatarHeaderDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">基础用法</h3>
        <AvatarHeader
          avatar={{
            src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
          }}
          name="张三"
          time="2小时前"
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">使用文本头像</h3>
        <AvatarHeader
          avatar={{
            children: "李",
            style: { backgroundColor: "#1677ff", color: "white" },
          }}
          name="李四"
          time="刚刚"
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">使用图标头像</h3>
        <AvatarHeader
          avatar={{
            icon: <User className="h-4 w-4" />,
            style: { backgroundColor: "#87d068" },
          }}
          name="王五"
          time="5分钟前"
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">自定义样式</h3>
        <AvatarHeader
          avatar={{
            children: "赵",
            style: { backgroundColor: "#eb2f96", color: "white" },
          }}
          name="赵六"
          time="昨天"
          nameStyle={{ color: "#eb2f96", fontWeight: "bold" }}
          timeStyle={{ color: "#999" }}
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">不同尺寸</h3>
        <div className="space-y-3">
          <AvatarHeader
            avatar={{
              src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
              size: "sm",
            }}
            name="小头像"
            time="1小时前"
          />
          <AvatarHeader
            avatar={{
              src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
              size: "md",
            }}
            name="中等头像"
            time="2小时前"
          />
          <AvatarHeader
            avatar={{
              src: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
              size: "lg",
            }}
            name="大头像"
            time="3小时前"
          />
        </div>
      </div>
    </div>
  );
}
