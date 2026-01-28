import { useState } from "react";
import { Button } from "@/registry/wuhan/ui/button";

import {
  TaskListContainerPrimitive,
  TaskListHeaderPrimitive,
  TaskListTitlePrimitive,
  TaskListFooterPrimitive,
} from "@/registry/wuhan/blocks/task-list/task-list-01";

import TaskListComposedReadonlyList from "./ReadonlyList";
import TaskListComposedEditableList from "./EditableList";

import type { TaskListComposedProps } from "./types";

/** 组合式待办清单组件 */
export default function TaskListComposed(props: TaskListComposedProps) {
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
  // 是否处于编辑状态
  const [isEditing, setIsEditing] = useState(false);

  // 根据编辑状态显示不同的按钮文案
  const currentModifyButtonText = isEditing
    ? cancelEditButtonText
    : modifyButtonText;

  /** 切换编辑状态 */
  const onTriggerEdit = () => {
    setIsEditing(!isEditing);
  };

  /** 关闭编辑状态 */
  const onCloseEdit = () => {
    setIsEditing(false);
  };

  /** 确认执行待办事项 */
  const onStartExecute = () => {
    onConfirmExecute?.();
    onCloseEdit();
  };

  /**
   * 根据编辑状态选择渲染的内容
   */
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

  /**
   * 渲染底部操作按钮
   * 只在待办状态且允许编辑时显示
   */
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
          确认执行
        </Button>
      </TaskListFooterPrimitive>
    );
  };

  return (
    <TaskListContainerPrimitive>
      <TaskListHeaderPrimitive>
        <TaskListTitlePrimitive>{title}</TaskListTitlePrimitive>
        <div>状态: {status}</div>
      </TaskListHeaderPrimitive>
      {/* 在此处添加待办事项列表的内容 */}
      {renderContent()}
      {renderFooter()}
    </TaskListContainerPrimitive>
  );
}
