"use client";

import * as React from "react";
import {
  TaskListUlPrimitive,
  TaskListLiPrimitive,
  TaskListLiContentPrimitive,
} from "@/registry/wuhan/blocks/task-list/task-list-01";
import type { ReadonlyTaskListItemProps } from "./types";

/**
 * 只读列表组件
 * 用于展示不可编辑的待办事项
 */
/**
 * @public
 */
const TaskListComposedReadonlyList = React.forwardRef<
  HTMLUListElement,
  ReadonlyTaskListItemProps
>((props, ref) => {
  const { dataSource } = props;
  return (
    <TaskListUlPrimitive ref={ref} role="list" aria-label="Task list">
      {dataSource.map((item) => (
        <TaskListLiPrimitive key={item.id}>
          <TaskListLiContentPrimitive>
            {item.content}
          </TaskListLiContentPrimitive>
        </TaskListLiPrimitive>
      ))}
    </TaskListUlPrimitive>
  );
});
TaskListComposedReadonlyList.displayName = "TaskListComposedReadonlyList";

export default TaskListComposedReadonlyList;
