import styled from "styled-components";

export const StyledStepOverviewContainer = styled.div<{ $expanded?: boolean }>`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-right: 12px;
  padding-bottom: ${({ $expanded }) => ($expanded ? "12px" : "8px")};
  padding-left: 12px;
  background: #f6f5ff;
  border-radius: ${({ $expanded }) => ($expanded ? "12px" : "25px")};
  max-width: 600px;
  transition: all 0.2s;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StyledLeftSection = styled.div`
  display: flex;
  align-items: center;
  line-height: 22px;
  gap: 8px;
`;

// 不同状态的图标样式（需要在前面定义，因为可能被其他组件继承）
export const StyledStatusIcon = styled.div<{ $status?: string }>`
  position: relative;
  width: 20px;
  height: 20px;
  flex-shrink: 0;

  /* 等待状态 - 灰色圆圈 */
  ${({ $status }) =>
    $status === "waiting" &&
    `
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(107, 114, 128, 0.15);
      top: 0;
      left: 0;
      border: 2px solid rgba(107, 114, 128, 0.3);
    }
  `}

  /* 进行中状态 - 蓝色三层圆 */
  ${({ $status }) =>
    ($status === "processing" || !$status) &&
    `
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(74, 86, 255, 0.15) 0%, rgba(74, 86, 255, 0.25) 100%);
      top: 0;
      left: 0;
      box-shadow: 0 0 0 0.5px rgba(74, 86, 255, 0.1);
    }
    &::after {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(74, 86, 255, 0.3) 0%, rgba(74, 86, 255, 0.4) 100%);
      top: 4px;
      left: 4px;
      box-shadow:
        inset 0 1px 2px rgba(255, 255, 255, 0.3),
        0 0 0 0.5px rgba(74, 86, 255, 0.2),
        0 1px 2px rgba(74, 86, 255, 0.15);
    }
    & > span {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4a56ff 0%, #6366f1 100%);
      top: 8px;
      left: 8px;
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.4),
        0 0 4px rgba(74, 86, 255, 0.4),
        0 1px 2px rgba(0, 0, 0, 0.1);
      z-index: 1;
    }
  `}

  /* 完成状态 - 绿色对勾 */
  ${({ $status }) =>
    $status === "completed" &&
    `
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.25) 100%);
      top: 0;
      left: 0;
      box-shadow: 0 0 0 0.5px rgba(34, 197, 94, 0.1);
    }
    &::after {
      content: '✓';
      position: absolute;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #22c55e;
      font-size: 12px;
      font-weight: 600;
      top: 0;
      left: 0;
    }
  `}

  /* 错误状态 - 红色感叹号 */
  ${({ $status }) =>
    $status === "error" &&
    `
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.25) 100%);
      top: 0;
      left: 0;
      box-shadow: 0 0 0 0.5px rgba(239, 68, 68, 0.1);
    }
    &::after {
      content: '!';
      position: absolute;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ef4444;
      font-size: 14px;
      font-weight: 600;
      top: 0;
      left: 0;
    }
  `}
`;

export const StyledTitle = styled.h3`
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, "Noto Sans", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: justify;
  color: #252b37;
  margin: 0;
`;

export const StyledRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledProgress = styled.div`
  font-family:
    "PingFang SC",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0;
  text-align: right;
  vertical-align: middle;
  color: #6b7280;
`;

export const StyledArrowIcon = styled.div<{ $expanded?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  user-select: none;
  color: #6b7280;
  transition: all 0.2s ease;

  &:hover {
    color: #4a56ff;
    background: rgba(74, 86, 255, 0.08);
    border-radius: 4px;
  }

  &::before {
    content: "";
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 6px solid currentColor;
    transform: ${({ $expanded }) =>
      $expanded ? "rotate(0deg)" : "rotate(180deg)"};
    transition: transform 0.2s ease;
  }
`;

export const StyledExpandedContent = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledStepItem = styled.div<{ $status?: string }>`
  padding: 8px 12px;
  border-radius: 6px;
  background: ${({ $status }) => {
    switch ($status) {
      case "completed":
        return "rgba(34, 197, 94, 0.08)";
      case "processing":
        return "rgba(74, 86, 255, 0.08)";
      case "error":
        return "rgba(239, 68, 68, 0.08)";
      default:
        return "rgba(0, 0, 0, 0.02)";
    }
  }};
  transition: background 0.2s;

  &:hover {
    background: ${({ $status }) => {
      switch ($status) {
        case "completed":
          return "rgba(34, 197, 94, 0.12)";
        case "processing":
          return "rgba(74, 86, 255, 0.12)";
        case "error":
          return "rgba(239, 68, 68, 0.12)";
        default:
          return "rgba(0, 0, 0, 0.04)";
      }
    }};
  }
`;

export const StyledStepItemTitle = styled.div`
  font-family:
    "PingFang SC",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #252b37;
  margin-bottom: 4px;
`;

export const StyledStepItemDescription = styled.div`
  font-family:
    "PingFang SC",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #6b7280;
`;
