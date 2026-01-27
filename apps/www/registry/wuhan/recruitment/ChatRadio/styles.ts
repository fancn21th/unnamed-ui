import styled from "styled-components";

export const StyledChatRadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 16px;
  max-width: 600px;
`;

export const StyledChatRadioContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledChatRadioTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #141414;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledChatRadioStatus = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #666473;
`;

export const StyledChatRadioDescription = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #141414;
`;

export const StyledChatRadioOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledChatRadioOption = styled.div<{ $selected?: boolean }>`
  gap: 10px;
  border-radius: 8px;
  padding-top: 8px;
  padding-right: 12px;
  padding-bottom: 8px;
  padding-left: 12px;
  border: 1px solid ${(props) => (props.$selected ? "#4c56f6" : "#e5e7eb")};
  background-color: ${(props) => (props.$selected ? "#e8eaff" : "transparent")};
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0;
  color: #000000;

  /* 隐藏 Radio 组件的默认图标 */
  .ant-radio-inner {
    display: none !important;
  }

  /* 隐藏 Radio 组件的默认外层圆圈，但保留点击区域 */
  .ant-radio {
    width: 0;
    margin-right: 0;
  }

  /* 确保 Radio wrapper 可以正常点击 */
  .ant-radio-wrapper {
    display: flex;
    align-items: center;
    transition: none !important;

    /* 禁用所有动画和过渡效果 */
    &,
    &:hover,
    &:focus,
    &:active,
    &:focus-within {
      transition: none !important;
      animation: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
  }

  /* 禁用 Radio 的所有动画效果 */
  .ant-radio,
  .ant-radio-inner,
  .ant-radio-input {
    transition: none !important;
    animation: none !important;

    &:hover,
    &:focus,
    &:active,
    &:focus-within {
      transition: none !important;
      animation: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
  }

  /* 禁用 Radio wrapper 的 hover 和 focus 效果 */
  .ant-radio-wrapper:hover,
  .ant-radio-wrapper:focus,
  .ant-radio-wrapper:active,
  .ant-radio-wrapper:focus-within {
    transition: none !important;
    animation: none !important;
    outline: none !important;
    box-shadow: none !important;
  }

  /* 禁用选中状态的动画 */
  .ant-radio-wrapper-checked {
    transition: none !important;
    animation: none !important;

    .ant-radio,
    .ant-radio-inner {
      transition: none !important;
      animation: none !important;
    }
  }

  /* 禁用所有伪元素的动画 */
  .ant-radio-wrapper::before,
  .ant-radio-wrapper::after,
  .ant-radio::before,
  .ant-radio::after,
  .ant-radio-inner::before,
  .ant-radio-inner::after {
    display: none !important;
    animation: none !important;
    transition: none !important;
  }

  /* 禁用可能的 ripple 效果 */
  .ant-radio-wrapper .ant-wave,
  .ant-radio-wrapper .ant-click-animating-node {
    display: none !important;
  }
  .ant-radio-label {
    padding-left: 0 !important;
  }
`;

export const StyledChatRadioOptionLabel = styled.span`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0;
  color: #000000;
`;
