"use client";

import React, { useState } from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { StyledSender } from "./style";

export interface SenderProps {
  className?: string;
  /** 输入框占位符文本，默认为"请输入" */
  placeholder?: string;
  /** 输入框初始值 */
  value?: string;
  /** 输入框值变化回调 */
  onChange?: (value: string) => void;
  /** 发送按钮点击回调 */
  onSubmit?: (value: string) => void;
  /** 数据源数量，默认为 0 */
  dataSourceCount?: number;
  /** 是否禁用发送按钮，默认为 false */
  disabled?: boolean;
  /** 是否显示加载状态，默认为 false */
  loading?: boolean;
}

const Sender: React.FC<SenderProps> = ({
  className,
  placeholder = "请输入",
  value: controlledValue,
  onChange,
  onSubmit,
  dataSourceCount = 0,
  disabled = false,
  loading = false,
}) => {
  const [internalValue, setInternalValue] = useState("");

  // 使用受控或非受控模式
  const inputValue =
    controlledValue !== undefined ? controlledValue : internalValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleSubmit = () => {
    if (disabled || loading || !inputValue.trim()) return;
    onSubmit?.(inputValue.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <StyledSender className={className}>
      <div className="sender-container">
        {/* 输入框 */}
        <Input
          className="sender-input"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={disabled || loading}
          allowClear
        />

        {/* 数据源展示 */}
        <div className="data-source-display">{dataSourceCount}个数据源</div>

        {/* 发送按钮 */}
        <Button
          type="primary"
          className="send-button"
          icon={<SendOutlined />}
          onClick={handleSubmit}
          disabled={disabled || loading || !inputValue.trim()}
          loading={loading}
        />
      </div>
    </StyledSender>
  );
};

export default Sender;
