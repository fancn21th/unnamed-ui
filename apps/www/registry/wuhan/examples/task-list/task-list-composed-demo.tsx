"use client";

import { useState } from "react";
import {
  TaskList,
  type TodoItem,
} from "@/registry/wuhan/composed/task-list/task-list";
import { Button } from "@/registry/wuhan/ui/button";

const initialTasks: TodoItem[] = [
  { id: "1", content: "研究用户需求", order: 1 },
  { id: "2", content: "制定开发计划", order: 2 },
  { id: "3", content: "设计 UI/UX", order: 3 },
  { id: "4", content: "前端开发", order: 4 },
  { id: "5", content: "后端开发", order: 5 },
  { id: "6", content: "测试和调试", order: 6 },
];

export default function TaskListDemo() {
  const [tasks, setTasks] = useState<TodoItem[]>(initialTasks);
  const [status, setStatus] = useState<"pending" | "confirmed">("pending");

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold">项目任务列表</h3>
          <p className="text-sm text-muted-foreground">
            当前状态:{" "}
            <span
              className={
                status === "pending" ? "text-orange-600" : "text-green-600"
              }
            >
              {status === "pending" ? "待确认" : "已确认"}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newStatus = status === "pending" ? "confirmed" : "pending";
              setStatus(newStatus);
            }}
          >
            切换状态
          </Button>
        </div>
      </div>

      <TaskList
        dataSource={tasks}
        title="项目开发计划"
        status={status}
        editable={true}
        modifyButtonText="修改方案"
        cancelEditButtonText="取消编辑"
        onItemsChange={(newTasks) => {
          setTasks(newTasks);
        }}
        onConfirmExecute={() => {
          setStatus("confirmed");
        }}
      />
    </div>
  );
}
