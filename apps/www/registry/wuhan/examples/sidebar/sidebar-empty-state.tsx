"use client";

import * as React from "react";
import { SidebarComposed } from "@/registry/wuhan/composed/sidebar/sidebar";

export default function SidebarEmptyState() {
  return (
    <div className="w-[240px] h-[500px]">
      <SidebarComposed conversations={[]} emptyText="暂无对话历史" />
    </div>
  );
}
