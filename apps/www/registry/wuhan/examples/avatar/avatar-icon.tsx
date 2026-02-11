"use client";

import { Avatar } from "@/registry/wuhan/composed/avatar/avatar";
import { User, Mail, Heart, Star, Camera, Music } from "lucide-react";

export default function AvatarIcon() {
  return (
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
        style={{ backgroundColor: "#eb2f96" }}
        icon={<Star className="h-4 w-4" />}
      />
      <Avatar
        style={{ backgroundColor: "#52c41a" }}
        icon={<Camera className="h-4 w-4" />}
      />
      <Avatar
        style={{ backgroundColor: "#faad14" }}
        icon={<Music className="h-4 w-4" />}
      />
    </div>
  );
}
