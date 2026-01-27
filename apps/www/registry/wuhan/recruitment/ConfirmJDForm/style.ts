import styled from "styled-components";

/**
 * ConfirmJDForm 外层容器
 * - 设置边框、圆角和内边距
 * - 实现清晰的视觉边界
 */
export const StyledConfirmJDForm = styled.div`
  width: 100%;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;

  /* 标题样式 */
  .form-title {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 24px;
    line-height: 24px;
  }

  /* Form 整体布局 */
  .confirm-jd-form {
    .ant-form-item {
      margin-bottom: 20px;

      /* Label 样式：带序号，独占一行 */
      .ant-form-item-label {
        text-align: left;
        padding-bottom: 8px;

        > label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          height: auto;

          /* 必填标记样式 */
          &.ant-form-item-required {
            &::before {
              display: inline-block;
              margin-right: 4px;
              color: #ef4444;
              font-size: 14px;
              font-family: SimSun, sans-serif;
              line-height: 1;
              content: "*";
            }
          }
        }
      }

      /* 输入控件样式：独占一行 */
      .ant-form-item-control {
        .ant-input,
        .ant-input-number,
        .ant-picker,
        .ant-select {
          width: 100%;
        }

        .ant-input-number {
          width: 100%;
        }
      }

      /* 错误提示样式 */
      .ant-form-item-explain-error {
        font-size: 12px;
        color: #ef4444;
        margin-top: 4px;
      }
    }

    /* 提交按钮容器：右对齐 */
    .form-item-submit {
      margin-top: 32px;
      margin-bottom: 0;
      text-align: right;

      .submit-button {
        min-width: 100px;
        height: 36px;
        font-size: 14px;
        border-radius: 6px;
      }
    }
  }
`;
