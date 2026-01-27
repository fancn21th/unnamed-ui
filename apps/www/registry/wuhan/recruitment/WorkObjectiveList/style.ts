import styled from "styled-components";

export const StyledWorkObjectiveList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

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

export const StyledWorkObjectiveItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 10px;
  padding-right: 12px;
  padding-bottom: 8px;
  padding-left: 12px;
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
    gap: 8px;
  }

  .item-icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    .default-icon {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .item-title {
    font-size: 14px;
    font-weight: 400;
    color: #1a1a1a;
    line-height: 1.5;
    word-break: break-word;
  }

  .item-progress {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .ant-progress {
      .ant-progress-indicator {
        font-weight: 600;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 0px;
        text-align: center;
        vertical-align: middle;
        color: #6b7280;
      }
    }
  }
`;
