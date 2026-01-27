"use client";

import React, { useState } from "react";
import { Radio, Space, type RadioChangeEvent } from "antd";
import { RadioSelectedIcon, RadioUnselectedIcon } from "../icons";
import {
  StyledChatRadioContainer,
  StyledChatRadioContent,
  StyledChatRadioTitle,
  StyledChatRadioStatus,
  StyledChatRadioDescription,
  StyledChatRadioOptions,
  StyledChatRadioOption,
  StyledChatRadioOptionLabel,
} from "./styles";

interface ChatRadioProps {
  title?: string;
  description?: string;
  options?: Array<{ label: string; value: string | number }>;
  defaultValue?: string | number;
  status?: "success" | "error" | "warning" | "info";
}

const statusMap = {
  success: { label: "已确认", color: "#008000" },
  error: { label: "已拒绝", color: "#FF0000" },
  warning: { label: "已忽略", color: "#FFA500" },
  info: { label: "未确认", color: "#0000FF" },
};
const ChatRadio: React.FC<ChatRadioProps> = ({
  title = "请选择您的偏好设置",
  description = "选择最符合您需求的选项",
  options = [
    { label: "选项一：快速响应", value: 1 },
    { label: "选项二：详细分析", value: 2 },
    { label: "选项三：简洁回答", value: 3 },
    { label: "选项四：创意模式", value: 4 },
  ],
  defaultValue = 1,
  status = "success",
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <StyledChatRadioContainer>
      {/* 上部分：标题 */}
      <StyledChatRadioTitle>
        {title}
        {status && (
          <StyledChatRadioStatus>
            {statusMap[status].label}
          </StyledChatRadioStatus>
        )}
      </StyledChatRadioTitle>

      <StyledChatRadioContent>
        {/* 中间部分：描述（加粗） */}
        <StyledChatRadioDescription>{description}</StyledChatRadioDescription>

        {/* 下部分：单选组件 */}
        <StyledChatRadioOptions>
          <Radio.Group onChange={handleChange} value={value}>
            <Space orientation="vertical" style={{ width: "100%" }} size={8}>
              {options.map((option) => {
                const isSelected = value === option.value;
                return (
                  <StyledChatRadioOption
                    key={option.value}
                    $selected={isSelected}
                  >
                    <Radio key={option.value} value={option.value}>
                      <StyledChatRadioOptionLabel>
                        {isSelected ? (
                          <RadioSelectedIcon
                            style={{
                              fontSize: "16px",
                              marginRight: "8px",
                              verticalAlign: "middle",
                            }}
                          />
                        ) : (
                          <RadioUnselectedIcon
                            style={{
                              fontSize: "16px",
                              marginRight: "8px",
                              verticalAlign: "middle",
                            }}
                          />
                        )}
                        {option.label}
                      </StyledChatRadioOptionLabel>
                    </Radio>
                  </StyledChatRadioOption>
                );
              })}
            </Space>
          </Radio.Group>
        </StyledChatRadioOptions>
      </StyledChatRadioContent>
    </StyledChatRadioContainer>
  );
};

export default ChatRadio;
