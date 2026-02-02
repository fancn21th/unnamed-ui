"use client";

import { Tooltip } from "@/registry/wuhan/composed/tooltip/tooltip";

/**
 * 表格中的 Tooltip 示例
 */
export default function TooltipTable() {
  const data = [
    { id: 1, name: "张三", email: "zhangsan@example.com", status: "active" },
    { id: 2, name: "李四", email: "lisi@example.com", status: "inactive" },
    { id: 3, name: "王五", email: "wangwu@example.com", status: "active" },
  ];

  return (
    <div className="rounded-md border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium">姓名</th>
            <th className="px-4 py-3 text-left font-medium">邮箱</th>
            <th className="px-4 py-3 text-left font-medium">状态</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b last:border-0">
              <td className="px-4 py-3">
                <Tooltip content={`用户 ID: ${row.id}`} side="right">
                  <span className="cursor-help">{row.name}</span>
                </Tooltip>
              </td>
              <td className="px-4 py-3">
                <Tooltip content="点击复制邮箱地址" side="top">
                  <span className="cursor-help text-muted-foreground">
                    {row.email}
                  </span>
                </Tooltip>
              </td>
              <td className="px-4 py-3">
                <Tooltip
                  content={
                    row.status === "active" ? "用户已激活" : "用户未激活"
                  }
                  side="left"
                >
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium cursor-help ${
                      row.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {row.status === "active" ? "激活" : "未激活"}
                  </span>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
