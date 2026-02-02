"use client";

import { useState } from "react";
import {
  TaskList,
  type TodoItem,
} from "@/registry/wuhan/composed/task-list/task-list";

const initialTasks: TodoItem[] = [
  { id: "1", content: "设计系统架构", order: 1 },
  { id: "2", content: "编写技术文档", order: 2 },
  { id: "3", content: "实现核心功能", order: 3 },
];

export default function TaskListEditable() {
  const [tasks, setTasks] = useState<TodoItem[]>(initialTasks);

  return (
    <div className="space-y-2 w-full">
      <p className="text-sm text-muted-foreground">
        可编辑模式：点击"修改方案"按钮可以添加、编辑、删除和排序任务
      </p>
      <TaskList
        dataSource={tasks}
        title="开发任务"
        status="pending"
        editable={true}
        modifyButtonText="修改方案"
        cancelEditButtonText="取消"
        onItemsChange={(newTasks) => {
          setTasks(newTasks);
          console.log("任务列表更新:", newTasks);
        }}
        onConfirmExecute={() => {
          console.log("确认并执行任务:", tasks);
        }}
      />
    </div>
  );
}
