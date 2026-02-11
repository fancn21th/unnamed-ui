"use client";

import { Avatar } from "@/registry/wuhan/composed/avatar/avatar";

export default function AvatarDefault() {
  return (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        alt="User"
      />
      <Avatar>A</Avatar>
      <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
    </div>
  );
}
