"use client";

import { Star, Heart, Zap } from "lucide-react";
import { Tag } from "@/registry/wuhan/composed/tag/tag";

export default function TagWithIcon() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag
        variant="filled"
        theme="brand"
        prefixIcon={<Star className="h-3.5 w-3.5" />}
      >
        收藏
      </Tag>
      <Tag
        variant="outline"
        theme="error"
        prefixIcon={<Heart className="h-3.5 w-3.5" />}
      >
        喜欢
      </Tag>
      <Tag
        variant="solid"
        theme="warning"
        prefixIcon={<Zap className="h-3.5 w-3.5" />}
      >
        热门
      </Tag>
    </div>
  );
}
