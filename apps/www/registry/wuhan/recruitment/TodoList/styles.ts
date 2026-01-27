import { Flex, Input } from "antd";
import styled from "styled-components";

/**
 * 待办事项列表容器
 */
export const StyledTodoListContainer = styled(Flex)`
  background-color: #f9f9fb;
  border-radius: 12px;
  padding: 16px;
`;

/**
 * 待办事项列表头部
 */
export const StyledTodoListHeader = styled(Flex)`
  height: 30px;
`;

/**
 * 待办事项列表标题
 */
export const StyledTodoListTitle = styled.span`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0px;
  color: #1e1d26;
`;

/**
 * 待办事项只读列表
 */
export const StyledTodoListReadonlyList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 10px;
  margin: 0;
  list-style-type: disc; /* 保留默认圆点标记（disc=实心圆） */
  list-style-position: inside; /* 标记在li内容内侧 */
`;

/**
 * 待办事项列表项容器
 */
export const StyledTodoListReadonlyListItem = styled.li`
  height: 22px;
`;

/**
 * 待办事项列表项内容
 */
export const StyledTodoListReadonlyListItemContent = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #403f4d;
`;

/**
 * 可编辑待办事项列表项容器
 */
export const StyledTodoListEditableListItemContainer = styled(Flex)`
  height: 32px;
  .move-icon {
    cursor: move;
  }
  .delete-icon {
    cursor: pointer;
  }
`;
/**
 * 可编辑待办事项列表项输入框
 */
export const StyledTodoListEditableListItemInput = styled(Input)`
  flex: 1;
`;

/**
 * 待办事项列表底部
 */
export const StyledTodoListFooter = styled(Flex)`
  height: 32px;
`;
