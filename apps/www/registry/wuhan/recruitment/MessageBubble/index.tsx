"use client";

import React from "react";
import { AntDesignOutlined, RedoOutlined } from "@ant-design/icons";
import { Actions, Bubble } from "@ant-design/x";
import { Avatar } from "antd";
import { StyledMessageBubbleContainer, StyledTime } from "./style";

const actionItems = (content: string) => [
  {
    key: "copy",
    label: "copy",
    actionRender: () => {
      return <Actions.Copy text={content} />;
    },
  },
  {
    key: "retry",
    icon: <RedoOutlined />,
    label: "Retry",
  },
];

const text = `给我生成一份报告`;

interface MessageBubbleProps {
  role?: "user" | "assistant";
  placement?: "start" | "end";
  [key: string]: any;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  role = "assistant",
  placement,
  ...rest
}) => {
  const bubblePlacement = placement || (role === "user" ? "end" : "start");
  const isUserMessage = bubblePlacement === "end";

  return (
    <StyledMessageBubbleContainer $placement={bubblePlacement} $role={role}>
      <div className="avatar-wrapper">
        <Avatar icon={<AntDesignOutlined />} />
        <div className="time-wrapper">
          <StyledTime>1月11日 21:57</StyledTime>
        </div>
      </div>
      <div className="bubble-wrapper">
        <Bubble
          content={text}
          typing={{ effect: "fade-in" }}
          footer={(content) => (
            <Actions
              items={actionItems(content)}
              onClick={() => console.log(content)}
            />
          )}
          placement={bubblePlacement}
          styles={{
            content: {
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "14px",
              lineHeight: "22px",
              letterSpacing: "0px",
              color: "#252B37",
              borderRadius: isUserMessage ? "16px 16px 0px 16px" : "0",
              padding: isUserMessage ? "16px" : 0,
              background: isUserMessage ? "#E8EAFF" : "transparent",
            },
            root: isUserMessage
              ? {
                  minHeight: "54px",
                }
              : {
                  padding: 0,
                  background: "transparent",
                },
          }}
          {...rest}
        />
      </div>
    </StyledMessageBubbleContainer>
  );
};

export default MessageBubble;
