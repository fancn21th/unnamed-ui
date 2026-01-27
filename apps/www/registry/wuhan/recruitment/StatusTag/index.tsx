import React from "react";
import { StyledStatusTag } from "./style";
import { STATUS_TEXT_MAP, STATUS_COLOR_MAP } from "./constants";
import type { StatusTagProps } from "./types";

export type { StatusType, StatusTagProps } from "./types";

/**
 * StatusTag 状态标签组件
 */
const StatusTag: React.FC<StatusTagProps> = ({
  status,
  text,
  backgroundColor,
  color,
  style,
  className,
}) => {
  const finalText = text ?? (status ? STATUS_TEXT_MAP[status] : "");
  const finalBackgroundColor =
    backgroundColor ??
    (status ? STATUS_COLOR_MAP[status].backgroundColor : undefined);
  const finalColor =
    color ?? (status ? STATUS_COLOR_MAP[status].color : undefined);

  return (
    <StyledStatusTag
      className={className}
      style={{
        ...(finalBackgroundColor && { backgroundColor: finalBackgroundColor }),
        ...(finalColor && { color: finalColor }),
        ...style,
      }}
    >
      {finalText}
    </StyledStatusTag>
  );
};

export default StatusTag;
