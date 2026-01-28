"use client";
import { useState } from "react";
import { Button } from "@/registry/wuhan/ui/button";
import {
  TaskListContainerPrimitive,
  TaskListHeaderPrimitive,
  TaskListTitlePrimitive,
  TaskListUlPrimitive,
  TaskListLiPrimitive,
  TaskListLiContentPrimitive,
  TaskListFooterPrimitive,
} from "@/registry/wuhan/blocks/task-list/task-list-01";

export default function TaskListDemo() {
  const [dataSource] = useState([
    { id: "todo_001", content: "整理本周工作总结并提交", order: 1 },
    { id: "todo_002", content: "给客户发送项目进度确认邮件", order: 2 },
    { id: "todo_003", content: "补充VSCode插件使用文档", order: 3 },
  ]);
  return (
    <TaskListContainerPrimitive>
      <TaskListHeaderPrimitive>
        <TaskListTitlePrimitive>待办清单</TaskListTitlePrimitive>
        <button className="text-sm text-blue-600 hover:underline h-[30px]">
          添加任务
        </button>
      </TaskListHeaderPrimitive>
      {/* 在此处添加待办事项列表的内容 */}
      <TaskListUlPrimitive>
        {dataSource.map((item) => (
          <TaskListLiPrimitive key={item.id}>
            <TaskListLiContentPrimitive>
              {item.content}
            </TaskListLiContentPrimitive>
          </TaskListLiPrimitive>
        ))}
      </TaskListUlPrimitive>
      <TaskListFooterPrimitive>
        <Button variant="outline" className="font-normal">
          修改方案
        </Button>
        <Button className="font-normal">确认并执行</Button>
      </TaskListFooterPrimitive>
    </TaskListContainerPrimitive>
  );
}
