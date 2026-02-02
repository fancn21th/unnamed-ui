"use client";

import { useState } from "react";
import {
  TaskList,
  type TodoItem,
} from "@/registry/wuhan/composed/task-list/task-list";

const initialTasks: TodoItem[] = [
  { id: "1", content: "学习 React 基础", order: 1 },
  { id: "2", content: "掌握 TypeScript", order: 2 },
  { id: "3", content: "构建第一个项目", order: 3 },
];

export default function TaskListDemo() {
  const [tasks, setTasks] = useState<TodoItem[]>(initialTasks);

  return (
    <TaskList
      dataSource={tasks}
      title="学习计划"
      status="pending"
      onItemsChange={setTasks}
      onConfirmExecute={() => {
        console.log("确认执行", tasks);
      }}
    />
  );
}
