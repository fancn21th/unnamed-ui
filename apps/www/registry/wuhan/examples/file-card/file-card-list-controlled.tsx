"use client";

import { useState } from "react";
import { FileCardList } from "@/registry/wuhan/composed/file-card/file-card";
import { FileText, Image as ImageIcon, FileCode } from "lucide-react";

export default function FileCardListControlled() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const files = [
    {
      id: "1",
      title: "项目文档.pdf",
      date: "2024-01-15",
      fileIcon: <FileText className="w-6 h-6 text-blue-500" />,
    },
    {
      id: "2",
      title: "设计稿.png",
      date: "2024-01-14",
      fileIcon: <ImageIcon className="w-6 h-6 text-green-500" />,
    },
    {
      id: "3",
      title: "源代码.tsx",
      date: "2024-01-13",
      fileIcon: <FileCode className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div className="space-y-4">
      <FileCardList
        title="我的文件"
        files={files}
        value={selectedIds}
        onChange={setSelectedIds}
      />

      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          已选中:{" "}
          {selectedIds.size > 0 ? Array.from(selectedIds).join(", ") : "无"}
        </p>
      </div>
    </div>
  );
}
