import styled from "styled-components";

export const StyledWorkResultList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .list-title {
    font-size: 14px;
    color: #999999;
  }

  .list-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

export const StyledWorkResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #d9d9d9;
    background: #fafafa;
  }

  .item-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .item-header {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .item-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
  }

  .item-title {
    flex: 1;
    min-width: 0;
    font-size: 14px;
    font-weight: 400;
    color: #252b37;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-meta {
    font-size: 12px;
    color: #999999;
    line-height: 1.5;
  }

  .item-more {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: #999999;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #333333;
    }
  }
`;
