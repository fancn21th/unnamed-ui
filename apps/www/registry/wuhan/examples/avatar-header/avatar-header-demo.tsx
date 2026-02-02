"use client";

import { AvatarHeader } from "@/registry/wuhan/composed/avatar-header/avatar-header";
import { User, Bot } from "lucide-react";

export default function AvatarHeaderDemo() {
  return (
    <div className="flex flex-col gap-4">
      <AvatarHeader
        icon={<User className="w-3 h-3" />}
        name="User"
        time="12:25"
      />
      <AvatarHeader
        icon={<Bot className="w-3 h-3 text-blue-600" />}
        name="AI Assistant"
        time="09:10"
      />
    </div>
  );
}
