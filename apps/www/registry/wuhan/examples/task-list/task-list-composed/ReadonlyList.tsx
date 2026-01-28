"use client";
import {
  TaskListUlPrimitive,
  TaskListLiPrimitive,
  TaskListLiContentPrimitive,
} from "@/registry/wuhan/blocks/task-list/task-list-01";
import { ReadonlyTaskListItemProps } from "./types";

/**
 * 只读列表组件
 * 用于展示不可编辑的待办事项
 */
export default function TaskListComposedReadonlyList(
  props: ReadonlyTaskListItemProps,
) {
  const { dataSource } = props;
  return (
    <TaskListUlPrimitive>
      {dataSource.map((item) => (
        <TaskListLiPrimitive key={item.id}>
          <TaskListLiContentPrimitive>
            {item.content}
          </TaskListLiContentPrimitive>
        </TaskListLiPrimitive>
      ))}
    </TaskListUlPrimitive>
  );
}
