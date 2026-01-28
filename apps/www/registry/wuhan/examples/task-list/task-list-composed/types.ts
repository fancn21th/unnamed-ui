/**
 * 待办事项列表组件的属性类型定义
 */
export interface TaskListComposedProps {
  /** 数据源 */
  dataSource: TodoItem[];
  /** 标题 */
  title?: string;
  // /** 状态 */
  // status: StatusType;
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
 * 待办事项项的类型定义
 */
export interface TodoItem {
  /** 唯一标识符 */
  id: string;
  /** 待办事项内容 */
  content: string;
  /** 排序顺序 */
  order: number;
}

/** 只读列表组件的属性类型定义 */
export type ReadonlyTaskListItemProps = Pick<
  TaskListComposedProps,
  "dataSource"
>;

/** 可编辑列表组件的属性类型定义 */
export type EditableTaskListItemProps = Pick<
  TaskListComposedProps,
  "dataSource" | "onItemsChange"
>;
