"use client";
import { useState } from "react";
import TaskListComposed from "./task-list-composed";

export default function TaskListComposedDemo() {
  const [dataSource, setDataSource] = useState([
    { id: "todo_001", content: "整理本周工作总结并提交", order: 1 },
    { id: "todo_002", content: "给客户发送项目进度确认邮件", order: 2 },
    { id: "todo_003", content: "补充VSCode插件使用文档", order: 3 },
  ]);

  const handleItemsChange = (newItems: any[]) => {
    setDataSource(newItems);
  };

  return (
    <TaskListComposed
      dataSource={dataSource}
      title="我的待办"
      status="pending"
      editable={true}
      onItemsChange={handleItemsChange}
      onConfirmExecute={() => {}}
    />
  );
}
