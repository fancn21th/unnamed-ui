import styled from "styled-components";

export const StyledSender = styled.div`
  height: 56px;
  padding: 1px;
  background: linear-gradient(90deg, #bc68ff 0%, #4c56f6 100%);
  border-radius: 16px;
  box-sizing: border-box;

  .sender-container {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    background: #ffffff;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    /* 输入框样式 */
    .sender-input {
      flex: 1;
      border: none;
      box-shadow: none;
      padding: 0;
      font-size: 14px;
      background: transparent;
      height: 100%;

      &:focus,
      &:hover {
        border: none;
        box-shadow: none;
      }

      &::placeholder {
        color: #bfbfbf;
      }
    }

    /* 数据源展示 */
    .data-source-display {
      padding: 8px 12px;
      border-radius: 6px;
      background: #f5f5f5;
      color: #666666;
      font-size: 13px;
      white-space: nowrap;
    }

    /* 发送按钮样式 - 圆形 */
    .send-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      min-width: 32px;
      padding: 0;
      border: none;
      border-radius: 16px;
      background: linear-gradient(90deg, #bc68ff 0%, #4c56f6 100%);
      color: #ffffff;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        opacity: 0.8;
      }

      &:active:not(:disabled) {
        opacity: 0.6;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.4;
      }

      .anticon {
        font-size: 16px;
      }
    }
  }
`;
