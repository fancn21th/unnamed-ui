"use client";

import { Tooltip } from "@/registry/wuhan/composed/tooltip/tooltip";
import { Button } from "@/registry/wuhan/ui/button";
import { Info } from "lucide-react";

/**
 * 表单中的 Tooltip 示例
 */
export default function TooltipForm() {
  return (
    <div className="max-w-md space-y-4">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          用户名
          <Tooltip content="用户名必须为 3-20 个字符，只能包含字母、数字和下划线">
            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </label>
        <input
          type="text"
          placeholder="请输入用户名"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          邮箱地址
          <Tooltip content="我们会向此邮箱发送验证码" side="right">
            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </label>
        <input
          type="email"
          placeholder="example@email.com"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          密码
          <Tooltip
            content="密码至少 8 位，必须包含大小写字母、数字和特殊字符"
            side="bottom"
          >
            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </label>
        <input
          type="password"
          placeholder="请输入密码"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <Button className="w-full">提交</Button>
    </div>
  );
}
