import styled from "styled-components";
import { Flex } from "antd";

export const StyledStageGrid = styled(Flex)`
  width: 68px;
  height: 62px;
  background-color: #f4f4fe;
  .label {
    height: 20px;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: #4a56ff;
  }
`;

export const StyledStatusGrid = styled(Flex)`
  width: 67px;
  height: 62px;
  background-color: #f9f9fe;
  .status {
    height: 20px;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    /* Netural_500 */
    color: #6b7280;
  }
  .number {
    height: 22px;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    /* Netural_600 */
    color: #344054;
  }
`;

export const StyledFilterContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  height: 70px;
`;

export const StyledFilterItem = styled(Flex)<{ $active?: boolean }>`
  width: 104px;
  height: 100%;
  border: 1px solid #e9eaeb;
  padding: 12px;
  box-sizing: border-box;
  flex-shrink: 0;
  position: relative;
  margin-left: -1px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:first-child {
    margin-left: 0;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &:hover {
    z-index: 1;
    border-color: #d7d9ff;
  }

  ${({ $active }) =>
    $active &&
    `
    z-index: 2;
    border-color: #d7d9ff;
    background-color: #F4F4FE;
  `}

  .label {
    height: 20px;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    /* Netural_500 */
    color: #6b7280;
  }
  .count {
    height: 22px;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #4c56f6;
  }

  .status-select-container {
    height: 22px;
  }
  .status-select {
    padding: 0;
    border: none;
    background-color: transparent;
    font-size: 12px;
    color: #6b7280;
    &.ant-select.ant-select-outlined:not(
        .ant-select-disabled
      ).ant-select-focused {
      box-shadow: none;
    }
  }
`;
