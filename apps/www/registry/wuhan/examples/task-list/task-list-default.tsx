"use client";

import { useState } from "react";
import {
  TaskList,
  type TodoItem,
} from "@/registry/wuhan/composed/task-list/task-list";

const initialTasks: TodoItem[] = [
  { id: "1", content: "完成项目文档", order: 1 },
  { id: "2", content: "代码审查", order: 2 },
  { id: "3", content: "修复 Bug #123", order: 3 },
  { id: "4", content: "更新依赖包", order: 4 },
];

export default function TaskListDefault() {
  const [tasks, setTasks] = useState<TodoItem[]>(initialTasks);

  return (
    <TaskList
      dataSource={tasks}
      title="项目任务"
      status="confirmed"
      editable={false}
      onItemsChange={setTasks}
      onConfirmExecute={() => {}}
    />
  );
}
