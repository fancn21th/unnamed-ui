"use client";

import {
  ExecutionResult,
  type ExecutionResultItem,
} from "@/registry/wuhan/composed/execution-result/execution-result";
import { Button } from "@/registry/wuhan/ui/button";
import { useState } from "react";

export default function ExecutionResultControlled() {
  const [isOpen, setIsOpen] = useState(true);
  const [items, setItems] = useState<ExecutionResultItem[]>([
    {
      status: "success",
      title: "调用成功 search_api",
      sections: [
        {
          title: "请求",
          content: JSON.stringify({ query: "搜索内容" }, null, 2),
          copyText: JSON.stringify({ query: "搜索内容" }, null, 2),
        },
      ],
    },
  ]);

  const addLoadingItem = () => {
    setItems([
      ...items,
      {
        status: "loading",
        title: "正在调用 data_api",
        sections: [
          {
            title: "请求中...",
            content: "等待服务器响应",
            showCopyIcon: false,
          },
        ],
      },
    ]);

    // 模拟3秒后完成
    setTimeout(() => {
      setItems((prev) =>
        prev.map((item, idx) =>
          idx === prev.length - 1
            ? {
                ...item,
                status: "success" as const,
                title: "调用成功 data_api",
                sections: [
                  {
                    title: "请求",
                    content: JSON.stringify({ action: "fetch" }, null, 2),
                    copyText: JSON.stringify({ action: "fetch" }, null, 2),
                  },
                  {
                    title: "响应",
                    content: JSON.stringify({ data: [1, 2, 3] }, null, 2),
                    copyText: JSON.stringify({ data: [1, 2, 3] }, null, 2),
                  },
                ],
              }
            : item,
        ),
      );
    }, 3000);
  };

  return (
    <div className="space-y-4 w-full h-full max-w-2xl">
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "折叠全部" : "展开全部"}
        </Button>
        <Button size="sm" variant="outline" onClick={addLoadingItem}>
          添加新执行项
        </Button>
      </div>

      <ExecutionResult
        title={`已执行完成，调用${items.length}个组件`}
        items={items}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  );
}
