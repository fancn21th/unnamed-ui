"use client";

import { useState } from "react";
import {
  TaskList,
  type TodoItem,
} from "@/registry/wuhan/composed/task-list/task-list";

const initialTasks: TodoItem[] = [
  { id: "1", content: "实现用户认证", order: 1 },
  { id: "2", content: "添加数据验证", order: 2 },
  { id: "3", content: "优化性能", order: 3 },
  { id: "4", content: "编写单元测试", order: 4 },
];

export default function TaskListPending() {
  const [tasks, setTasks] = useState<TodoItem[]>(initialTasks);
  const [executed, setExecuted] = useState(false);

  return (
    <div className="space-y-4 w-full">
      <p className="text-sm text-muted-foreground">
        Pending 状态：显示"修改方案"和"确认并执行"按钮
      </p>
      <TaskList
        dataSource={tasks}
        title="待执行任务"
        status="pending"
        editable={true}
        onItemsChange={setTasks}
        onConfirmExecute={() => {
          setExecuted(true);
          console.log("确认执行任务:", tasks);
        }}
      />

      {executed && (
        <div className="rounded-md border bg-green-50 p-3">
          <p className="text-sm font-semibold text-green-800">
            ✓ 任务已确认执行
          </p>
        </div>
      )}
    </div>
  );
}
