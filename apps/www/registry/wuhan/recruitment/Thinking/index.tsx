/** 深度思考 */
import React from "react";
import type { CollapseProps } from "antd";
import {
  StyledThinkingCollapse,
  StyledThinkingStatus,
  StyledThinkingHeader,
} from "./style";
import { ThinkingIcon } from "../icons";

interface ThinkingProps {
  /** 当前状态，思考中 或 思考完成 */
  status?: "start" | "end";
  /** 思考内容 */
  content?: string;
}

const Thinking: React.FC<ThinkingProps> = ({
  status,
  content = "在面对复杂的问题时，深度思考能够帮助我们理清思路，找到最佳解决方案。通过系统化的分析和多角度的审视，我们可以更全面地理解问题的本质，从而做出更明智的决策。",
}) => {
  const currentStatus = status === "start" ? "思考中..." : "思考完成";

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <StyledThinkingHeader gap={8} align="center">
          <ThinkingIcon style={{ fontSize: 16 }} />
          <StyledThinkingStatus>{currentStatus}</StyledThinkingStatus>
        </StyledThinkingHeader>
      ),
      children: <p>{content}</p>,
    },
  ];

  return (
    <StyledThinkingCollapse
      items={items}
      defaultActiveKey={["1"]}
      expandIconPlacement="end"
    />
  );
};

export default Thinking;
