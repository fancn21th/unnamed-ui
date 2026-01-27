"use client";

import React, { useState } from "react";
import TodoList from "../../../recruitment/TodoList/TodoList";

export default function TodoListDemo() {
  const [dataSource] = useState([
    { id: "todo_001", content: "整理本周工作总结并提交", order: 1 },
    { id: "todo_002", content: "给客户发送项目进度确认邮件", order: 2 },
    { id: "todo_003", content: "补充VSCode插件使用文档", order: 3 },
  ]);

  return (
    <TodoList
      dataSource={dataSource}
      title="我的待办"
      status="pending"
      editable={false}
      onItemsChange={() => {}}
      onConfirmExecute={() => {}}
    />
  );
}
