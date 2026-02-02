"use client";

import { AvatarHeader } from "@/registry/wuhan/composed/avatar-header/avatar-header";
import { MessageSquare, Mail, Phone, Video } from "lucide-react";

export default function AvatarHeaderIcons() {
  return (
    <div className="flex flex-col gap-4">
      <AvatarHeader
        icon={<MessageSquare className="w-3 h-3 text-blue-600" />}
        name="消息助手"
        time="在线"
      />
      <AvatarHeader
        icon={<Mail className="w-3 h-3 text-green-600" />}
        name="邮件通知"
        time="2分钟前"
      />
      <AvatarHeader
        icon={<Phone className="w-3 h-3 text-purple-600" />}
        name="电话客服"
        time="离线"
      />
      <AvatarHeader
        icon={<Video className="w-3 h-3 text-red-600" />}
        name="视频会议"
        time="进行中"
      />
    </div>
  );
}
