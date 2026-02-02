"use client";

import * as React from "react";
import { useState } from "react";
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
import { Button } from "@/registry/wuhan/ui/button";
import {
  TaskListContainerPrimitive,
  TaskListHeaderPrimitive,
  TaskListTitlePrimitive,
  TaskListFooterPrimitive,
  TaskListUlPrimitive,
  TaskListLiPrimitive,
  TaskListLiContentPrimitive,
  TaskListEditableContainerPrimitive,
  TaskListEditableListItemPrimitive,
} from "@/registry/wuhan/blocks/task-list/task-list-01";
import { FeedbackInputPrimitive } from "@/registry/wuhan/blocks/feedback/feedback-01";

// ==================== 类型定义 ====================

/**
 * 待办事项项的类型定义
 * @public
 */
export interface TodoItem {
  /** 唯一标识符 */
  id: string;
  /** 待办事项内容 */
  content: string;
  /** 排序顺序 */
  order: number;
}

/**
 * 待办事项列表组件的属性类型定义
 * @public
 */
export interface TaskListComposedProps {
  /** 数据源 */
  dataSource: TodoItem[];
  /** 标题 */
  title?: string;
  /** 状态 */
  status: "pending" | "confirmed";
  /** 是否启用编辑 */
  editable?: boolean;
  /** 修改按钮文字 */
  modifyButtonText?: string;
  /** 取消编辑按钮文字 */
  cancelEditButtonText?: string;
  /** 当待办事项列表发生变化时的回调函数 */
  onItemsChange: (items: TodoItem[]) => void;
  /** 确认执行操作的回调函数 */
  onConfirmExecute: () => void;
}

/**
 * 只读列表组件的属性类型定义
 * @public
 */
export type ReadonlyTaskListItemProps = Pick<
  TaskListComposedProps,
  "dataSource"
>;

/**
 * 可编辑列表组件的属性类型定义
 * @public
 */
export type EditableTaskListItemProps = Pick<
  TaskListComposedProps,
  "dataSource" | "onItemsChange"
>;

// ==================== 主组件：TaskListComposed ====================

/**
 * 组合式待办清单组件
 * 支持只读和可编辑两种模式，可编辑模式下支持拖拽排序
 *
 * @example
 * ```tsx
 * const [tasks, setTasks] = useState([
 *   { id: "1", content: "完成需求文档", order: 1 },
 *   { id: "2", content: "代码评审", order: 2 }
 * ]);
 *
 * <TaskListComposed
 *   dataSource={tasks}
 *   title="待办清单"
 *   status="pending"
 *   editable={true}
 *   onItemsChange={setTasks}
 *   onConfirmExecute={() => console.log("确认执行")}
 * />
 * ```
 *
 * @public
 */
export const TaskList = React.forwardRef<HTMLDivElement, TaskListComposedProps>(
  (props, ref) => {
    const {
      dataSource,
      title = "待办清单",
      cancelEditButtonText = "取消",
      modifyButtonText = "修改方案",
      editable = false,
      status = "pending",
      onItemsChange,
      onConfirmExecute,
    } = props;
    const [isEditing, setIsEditing] = useState(false);

    const currentModifyButtonText = isEditing
      ? cancelEditButtonText
      : modifyButtonText;

    const onTriggerEdit = () => {
      setIsEditing(!isEditing);
    };

    const onCloseEdit = () => {
      setIsEditing(false);
    };

    const onStartExecute = () => {
      onConfirmExecute?.();
      onCloseEdit();
    };

    const renderContent = () => {
      if (!isEditing) {
        return <TaskListComposedReadonlyList dataSource={dataSource} />;
      }
      return (
        <TaskListComposedEditableList
          dataSource={dataSource}
          onItemsChange={onItemsChange}
        />
      );
    };

    const renderFooter = () => {
      if (!(status === "pending" && editable)) return null;
      return (
        <TaskListFooterPrimitive>
          <Button
            onClick={onTriggerEdit}
            variant="outline"
            className="font-normal"
          >
            {currentModifyButtonText}
          </Button>
          <Button onClick={onStartExecute} className="font-normal">
            确认并执行
          </Button>
        </TaskListFooterPrimitive>
      );
    };

    return (
      <TaskListContainerPrimitive ref={ref}>
        <TaskListHeaderPrimitive>
          <TaskListTitlePrimitive>{title}</TaskListTitlePrimitive>
        </TaskListHeaderPrimitive>
        {renderContent()}
        {renderFooter()}
      </TaskListContainerPrimitive>
    );
  },
);
TaskList.displayName = "TaskList";

// ==================== 子组件：ReadonlyList ====================

/**
 * 只读列表组件
 * 用于展示不可编辑的待办事项
 *
 * @internal
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

// ==================== 子组件：EditableList ====================

/**
 * 可编辑待办事项列表组件
 * 支持拖拽排序功能
 *
 * @internal
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

/**
 * 可编辑列表项组件
 * 支持拖拽和删除操作
 *
 * @internal
 */
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
