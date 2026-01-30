"use client";

import * as React from "react";
import { GripVertical, Trash2 } from "lucide-react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  TaskListEditableContainerPrimitive,
  TaskListEditableListItemPrimitive,
} from "@/registry/wuhan/blocks/task-list/task-list-01";
import { SidebarHistorySearchInput } from "@/registry/wuhan/blocks/sidebar/sidebar-01";
import { FeedbackInputPrimitive } from "@/registry/wuhan/blocks/feedback/feedback-01";

import type { EditableTaskListItemProps } from "./types";

/**
 * 可编辑待办事项列表组件
 * 支持拖拽排序功能
 */
/**
 * @public
 */
const TaskListComposedEditableList = React.forwardRef<
  HTMLDivElement,
  EditableTaskListItemProps
>((props, ref) => {
  const { dataSource, onItemsChange } = props;

  // 配置拖拽传感器，要求至少移动1px才触发拖拽
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || !over) {
      return;
    }
    if (active.id !== over.id) {
      const activeIndex = dataSource.findIndex((i) => i.id === active.id);
      const overIndex = dataSource.findIndex((i) => i.id === over.id);
      const newDataSource = arrayMove(dataSource, activeIndex, overIndex);
      onItemsChange(newDataSource);
    }
  };

  const onDeleteItem = (id: string) => {
    const newDataSource = dataSource.filter((item) => item.id !== id);
    onItemsChange(newDataSource);
  };

  const onContentChange = (id: string, newContent: string) => {
    const newDataSource = dataSource.map((item) =>
      item.id === id ? { ...item, content: newContent } : item,
    );
    onItemsChange(newDataSource);
  };

  return (
    <div ref={ref}>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={onDragEnd}
        id="TodoListEditableList"
      >
        <SortableContext
          items={dataSource.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <TaskListEditableContainerPrimitive>
            {dataSource.map((item) => (
              <EditableListItem
                key={item.id}
                id={item.id}
                content={item.content}
                onDeleteItem={() => onDeleteItem(item.id)}
                onContentChange={(newContent) =>
                  onContentChange(item.id, newContent)
                }
              />
            ))}
          </TaskListEditableContainerPrimitive>
        </SortableContext>
      </DndContext>
    </div>
  );
});
TaskListComposedEditableList.displayName = "TaskListComposedEditableList";

export default TaskListComposedEditableList;

function EditableListItem(props: {
  id: string;
  content: string;
  onDeleteItem: () => void;
  onContentChange?: (newContent: string) => void;
}) {
  const { id, content, onDeleteItem } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TaskListEditableListItemPrimitive
      ref={setNodeRef}
      style={style}
      className={isDragging ? "opacity-50" : ""}
    >
      <div className="flex items-center gap-[var(--gap-xs)] flex-1">
        <button
          type="button"
          className="cursor-grab text-[var(--text-tertiary)]"
          aria-label="Reorder item"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4" />
        </button>
        <FeedbackInputPrimitive
          value={content}
          onChange={(e) => props.onContentChange?.(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="text-[var(--text-tertiary)]"
        aria-label="Delete item"
        onClick={onDeleteItem}
      >
        <Trash2 className="size-4" />
      </button>
    </TaskListEditableListItemPrimitive>
  );
}
