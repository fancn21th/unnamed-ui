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
export default function TaskListComposedEditableList(
  props: EditableTaskListItemProps,
) {
  const { dataSource, onItemsChange } = props;

  // 配置拖拽传感器，要求至少移动1px才触发拖拽
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // 防止误触，需要至少移动1px
        distance: 1,
      },
    }),
  );

  /**
   * 拖拽结束时的处理函数
   * 计算新的排序并触发数据更新
   */
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

  /**
   * 删除指定待办事项
   */
  const onDeleteItem = (id: string) => {
    const newDataSource = dataSource.filter((item) => item.id !== id);
    onItemsChange(newDataSource);
  };

  /**
   * 更新指定待办事项内容
   */
  const onContentChange = (id: string, newContent: string) => {
    const newDataSource = dataSource.map((item) =>
      item.id === id ? { ...item, content: newContent } : item,
    );
    onItemsChange(newDataSource);
  };

  return (
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
  );
}

/**
 * 可拖拽的待办事项列表项组件
 * 通过拖拽图标进行排序
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
  } = useSortable({
    id,
  });

  // 拖拽时的样式
  const listStyle: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    // 拖拽时提升层级，防止被其他元素遮挡
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  /**
   * 输入内容变化时的处理函数
   */
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    props.onContentChange?.(newValue);
  };

  return (
    <TaskListEditableListItemPrimitive
      ref={setNodeRef}
      style={listStyle}
      {...attributes}
    >
      {/* 拖拽手柄图标，只有点击此图标才能拖拽 */}
      <div className="h-6 w-6 flex items-center justify-center" {...listeners}>
        <GripVertical
          {...listeners}
          className="cursor-move"
          size={16}
          color="#666473"
        />
      </div>
      <FeedbackInputPrimitive value={content} onChange={onInputChange} />
      <div className="h-6 w-6 flex items-center justify-center">
        <Trash2
          className="cursor-pointer"
          onClick={onDeleteItem}
          size={16}
          color="#666473"
        />
      </div>
    </TaskListEditableListItemPrimitive>
  );
}
