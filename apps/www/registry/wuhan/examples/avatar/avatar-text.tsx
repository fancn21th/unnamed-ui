"use client";

import { Avatar } from "@/registry/wuhan/composed/avatar/avatar";

export default function AvatarText() {
  return (
    <div className="flex items-center gap-4">
      <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
        A
      </Avatar>
      <Avatar style={{ backgroundColor: "#f56a00", color: "#fff" }}>K</Avatar>
      <Avatar style={{ backgroundColor: "#87d068", color: "#fff" }}>
        张三
      </Avatar>
      <Avatar style={{ backgroundColor: "#1677ff", color: "#fff" }}>
        李四
      </Avatar>
      <Avatar style={{ backgroundColor: "#eb2f96", color: "#fff" }}>王</Avatar>
    </div>
  );
}
