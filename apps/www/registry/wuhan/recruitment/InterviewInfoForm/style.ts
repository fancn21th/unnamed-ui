import styled from "styled-components";

export const StyledInterviewInfoForm = styled.div`
  width: 100%;
  max-width: 700px;
  background: #f9f9fb;
  /* border: 1px solid #e5e7eb; */
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .interview-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    /* 表单项通用样式 */
    .ant-form-item {
      margin-bottom: 0;
      /* 标签样式 - 白底黑字 */
      .ant-form-item-label {
        > label {
          color: #1a1a1a;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
        }

        /* 隐藏 Ant Design 默认的必填标记（前面的星号） */
        .ant-form-item-required-mark {
          display: none !important;
        }

        /* 隐藏 label 上的默认必填标记 */
        > label.ant-form-item-required::before {
          display: none !important;
        }
      }

      /* 错误提示信息样式 - 与输入框字体大小统一 */
      .ant-form-item-explain-error {
        font-size: 14px;
        line-height: 1.5;
      }

      /* 只读模式下的文本值样式 */
      [class^="readonly-value-"],
      [class*=" readonly-value-"] {
        font-size: 14px;
        color: #403f4d;
        line-height: 20px;

        /* 确保内部的 span 也应用样式 */
        span {
          font-size: 14px !important;
          color: #403f4d !important;
          line-height: 20px !important;
        }
      }
    }

    /* 必填字段样式 - 确保必填标记显示在文本后面 */
    .form-item-required {
      .ant-form-item-label {
        > label {
          /* 隐藏默认的必填标记（前面的星号） */
          &::before {
            display: none !important;
          }
        }
      }
    }

    /* 通用 Radio 组样式 */
    [class^="radio-group-"],
    [class*=" radio-group-"] {
      width: 100%;

      .ant-radio-group {
        width: 100%;
      }

      .radio-group-container {
        width: 100%;
      }

      [class^="radio-item-"],
      [class*=" radio-item-"] {
        margin: 0;
        padding: 8px 12px;
        line-height: 22px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        transition: all 0.3s ease;
        color: #000000;
        font-size: 14px;
        background: #ffffff;
        text-align: center;

        &:hover {
          border-color: #4c56f6;
        }

        .ant-radio {
          display: none;
        }

        .ant-radio + span {
          padding: 0;
          text-align: center;
          display: block;
          width: 100%;
          font-size: 14px;
        }

        &.ant-radio-wrapper-checked {
          border-color: #4c56f6;
          background-color: #e8eaff;
          color: #000000;
        }
      }
    }

    /* 通用 Checkbox 组样式 */
    [class^="checkbox-group-"],
    [class*=" checkbox-group-"] {
      width: 100%;

      .ant-checkbox-group {
        width: 100%;
      }

      .checkbox-group-container {
        width: 100%;
      }

      [class^="checkbox-item-"],
      [class*=" checkbox-item-"] {
        margin: 0;
        padding: 8px 12px;
        line-height: 22px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        transition: all 0.3s ease;
        color: #000000;
        font-size: 14px;
        background: #ffffff;
        text-align: center;

        &:hover {
          border-color: #4c56f6;
        }

        .ant-checkbox {
          display: none;
        }

        .ant-checkbox + span {
          padding: 0;
          text-align: center;
          display: block;
          width: 100%;
          font-size: 14px;
        }

        &.ant-checkbox-wrapper-checked {
          border-color: #4c56f6;
          background-color: #e8eaff;
          color: #000000;
        }
      }
    }

    /* 通用输入框样式 */
    [class^="input-"],
    [class*=" input-"],
    [class^="textarea-"],
    [class*=" textarea-"] {
      width: 100%;
      height: 40px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      color: #1a1a1a;
      font-size: 14px;
      transition: all 0.3s ease;

      &:hover {
        border-color: #4c56f6;
      }

      &:focus,
      &.ant-input-focused {
        border-color: #4c56f6;
        box-shadow: 0 0 0 2px rgba(135, 206, 235, 0.1);
      }

      &::placeholder {
        color: #bfbfbf;
        font-size: 14px;
      }
    }

    /* Textarea 特殊样式 */
    [class^="textarea-"],
    [class*=" textarea-"] {
      height: auto;
      min-height: 80px;
    }

    /* 通用上传组件样式 */
    [class^="upload-wrapper-"],
    [class*=" upload-wrapper-"] {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;

      /* Ant Design Upload 文件列表容器样式 - 文件显示在按钮前面 */
      .ant-upload-list {
        margin-top: 0;
        margin-bottom: 0;
        order: -1;
        display: flex;
        flex-direction: row;
        gap: 8px;
        flex-wrap: wrap;

        .ant-upload-list-item {
          margin-top: 0;
          margin-bottom: 0;
          padding: 0;
          border: none;
          background: transparent;

          /* 隐藏进度条 */
          .ant-upload-list-item-progress {
            display: none !important;
          }
        }
      }

      [class^="upload-button-"],
      [class*=" upload-button-"] {
        width: 112px;
        height: 32px;
        padding: 4px 16px;
        border-radius: 6px;
        border: 1px solid #e1e0e7;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: #ffffff;
        color: #1a1a1a;
        font-size: 14px !important;
        font-weight: 400;
        line-height: 20px;
        transition: all 0.3s ease;

        * {
          font-size: 14px !important;
        }

        &:hover {
          border-color: #4c56f6;
          color: #1a1a1a;
        }

        &:focus {
          border-color: #4c56f6;
          color: #1a1a1a;
        }

        .anticon {
          font-size: 14px;
        }
      }

      /* 文件列表项样式 - 与按钮样式完全一致 */
      [class^="upload-file-item-"],
      [class*=" upload-file-item-"] {
        width: 112px;
        height: 32px;
        padding: 4px 12px;
        border-radius: 6px;
        border: 1px solid #e1e0e7;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: #ffffff;
        color: #1a1a1a;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        transition: all 0.3s ease;
        position: relative;
        cursor: default;
        box-sizing: border-box;

        &:focus {
          border-color: #4c56f6;
          color: #1a1a1a;
        }

        .file-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .file-name {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px !important;
          color: #1a1a1a;
          text-align: left;
        }
      }

      /* 只读模式下文件项不显示hover效果 */
      &.upload-wrapper-readonly {
        [class^="upload-file-item-"],
        [class*=" upload-file-item-"] {
          &:hover {
            border-color: #e1e0e7;
            color: #1a1a1a;
          }
        }
      }

      /* 编辑模式下文件项hover效果 */
      &:not(.upload-wrapper-readonly) {
        [class^="upload-file-item-"],
        [class*=" upload-file-item-"] {
          &:hover {
            border-color: #4c56f6;
            color: #1a1a1a;
          }
        }
      }
    }

    /* 兼容旧的 upload- 类名 */
    [class^="upload-"],
    [class*=" upload-"] {
      [class^="upload-button-"],
      [class*=" upload-button-"] {
        width: 112px;
        height: 32px;
        padding: 4px 16px;
        border-radius: 6px;
        border: 1px solid #e1e0e7;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: #ffffff;
        color: #1a1a1a;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        transition: all 0.3s ease;

        &:hover {
          border-color: #4c56f6;
          color: #1a1a1a;
        }

        &:focus {
          border-color: #4c56f6;
          color: #1a1a1a;
        }

        .anticon {
          font-size: 14px;
        }
      }
    }

    /* 提交按钮样式 - 右下角 */
    .form-item-submit {
      margin-bottom: 0;
      text-align: right;

      .ant-form-item-control {
        text-align: right;
      }

      .submit-button {
        width: 61px;
        height: 32px;
        border-radius: 8px;
        padding-top: 6px;
        padding-right: 16px;
        padding-bottom: 6px;
        padding-left: 16px;
        background: #7b61ff;
        border-color: #7b61ff;
        color: #ffffff;
        font-weight: 400;
        font-size: 14px !important;
        line-height: 20px;
        letter-spacing: 0.25px;
        transition: all 0.3s ease;

        &:hover {
          background: #6b51ef;
          border-color: #6b51ef;
        }

        &:active {
          background: #5b41df;
          border-color: #5b41df;
        }

        &:focus {
          background: #7b61ff;
          border-color: #7b61ff;
        }
      }
    }
  }

  /* 响应式适配桌面端 */
  @media (max-width: 768px) {
    padding: 24px;
    max-width: 100%;

    .interview-form {
      [class^="radio-group-"],
      [class*=" radio-group-"] {
        .radio-group-container {
          grid-template-columns: 1fr !important;
        }

        [class^="radio-item-"],
        [class*=" radio-item-"] {
          width: 100%;
          padding: 6px 16px;
          font-size: 14px;

          .ant-radio + span {
            font-size: 14px;
          }
        }
      }

      .form-item-submit {
        margin-top: 0;
        .submit-button {
          width: 100%;
        }
      }
    }
  }
`;

export const StyledInterviewInfoFormTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #141414;
`;

/**
 * 必填标记样式
 */
export const StyledRequiredMark = styled.span<{ $color: string }>`
  color: ${(props) => props.$color};
`;

/**
 * 空值显示样式
 */
export const StyledEmptyValue = styled.span`
  color: #bfbfbf;
`;

/**
 * Radio 组容器样式（支持动态列数）
 */
export interface RadioGroupContainerProps {
  $columns: number;
}

export const StyledRadioGroupContainer = styled.div<RadioGroupContainerProps>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  gap: 12px;
`;

/**
 * Radio 组样式
 */
export const StyledRadioGroup = styled.div`
  width: 100%;
`;

/**
 * Checkbox 组容器样式（支持动态列数）
 */
export interface CheckboxGroupContainerProps {
  $columns: number;
}

export const StyledCheckboxGroupContainer = styled.div<CheckboxGroupContainerProps>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  gap: 12px;
`;

/**
 * Checkbox 组样式
 */
export const StyledCheckboxGroup = styled.div`
  width: 100%;
`;
