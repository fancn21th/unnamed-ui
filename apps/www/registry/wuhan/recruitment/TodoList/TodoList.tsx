"use client";
import { Button } from "antd";
import { useState } from "react";
import {
  StyledTodoListContainer,
  StyledTodoListHeader,
  StyledTodoListTitle,
  StyledTodoListReadonlyList,
  StyledTodoListReadonlyListItem,
  StyledTodoListReadonlyListItemContent,
  StyledTodoListFooter,
} from "./styles";
import type { TodoListProps, TodoItem } from "./types";
import { EditableList } from "./EditableList";

/**
 * 待办事项列表组件
 * 支持只读展示和可编辑两种模式
 */
export default function TodoList(props: TodoListProps) {
  const {
    dataSource,
    title = "待办清单",
    editable = false,
    onItemsChange,
    onConfirmExecute,
  } = props;
  const [isEditing, setIsEditing] = useState(false);

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
   * 渲染只读列表
   * 用于展示不可编辑的待办事项
   */
  const renderReadonlyList = () => {
    return (
      <StyledTodoListReadonlyList>
        {dataSource.map((item: TodoItem) => (
          <StyledTodoListReadonlyListItem key={item.id}>
            <StyledTodoListReadonlyListItemContent>
              {item.content}
            </StyledTodoListReadonlyListItemContent>
          </StyledTodoListReadonlyListItem>
        ))}
      </StyledTodoListReadonlyList>
    );
  };

  /**
   * 渲染可编辑列表
   * 支持拖拽排序和删除功能
   */
  const renderEditableList = () => {
    return (
      <EditableList dataSource={dataSource} onItemsChange={onItemsChange} />
    );
  };

  /**
   * 根据编辑状态选择渲染的内容
   */
  const renderContent = () => {
    if (!isEditing) {
      return renderReadonlyList();
    }
    return renderEditableList();
  };

  /**
   * 渲染底部操作按钮
   * 只在待办状态且允许编辑时显示
   */
  const renderFooter = () => {
    if (!editable) return null;
    return (
      <StyledTodoListFooter align="center" justify="flex-end" gap={8}>
        <Button onClick={onTriggerEdit}>{modifyButtonText}</Button>
        <Button onClick={onStartExecute} type="primary">
          确认执行
        </Button>
      </StyledTodoListFooter>
    );
  };

  // 根据编辑状态显示不同的按钮文案
  const modifyButtonText = isEditing ? "取消修改" : "修改方案";

  return (
    <StyledTodoListContainer vertical gap={16}>
      <StyledTodoListHeader align="center" justify="space-between">
        <StyledTodoListTitle>{title}</StyledTodoListTitle>
      </StyledTodoListHeader>
      {renderContent()}
      {renderFooter()}
    </StyledTodoListContainer>
  );
}
