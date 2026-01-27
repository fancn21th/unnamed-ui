"use client";

import React from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { StyledInterviewQuestionPanel } from "./style";

export interface AbilityTag {
  id?: string;
  label: string;
  color?: string;
}

export interface FollowUpQuestion {
  id?: string;
  content: string;
}

export interface InterviewQuestionItem {
  id: string;
  /** 题目类型（如"经验深挖"、"问题解决"等） */
  type: string;
  /** 题目编号或标识（如"queryxxxxx"） */
  queryId?: string;
  /** 能力标签列表 */
  abilityTags: AbilityTag[];
  /** 上下文提示 */
  context?: string;
  /** 追问方向列表 */
  followUpQuestions: FollowUpQuestion[];
}

export interface InterviewQuestionPanelSource {
  /** 面板标题（如"面试题_第一轮面试_张三"） */
  title: string;
  /** 面试题列表 */
  questions: InterviewQuestionItem[];
}

export interface InterviewQuestionPanelProps {
  className?: string;
  /** 数据源（必传） */
  source: InterviewQuestionPanelSource;
  /** 关闭回调 */
  onClose?: () => void;
  /** 点击题目项回调 */
  onQuestionClick?: (item: InterviewQuestionItem) => void;
}

// 面试题项组件（单独导出）
export const InterviewQuestionItemComponent: React.FC<{
  item: InterviewQuestionItem;
  index: number;
  onQuestionClick?: (item: InterviewQuestionItem) => void;
}> = ({ item, index, onQuestionClick }) => {
  const handleClick = () => {
    onQuestionClick?.(item);
  };

  const questionTitle = item.queryId
    ? `${index + 1}. 【${item.type}】${item.queryId}`
    : `${index + 1}. 【${item.type}】`;
  const abilityTagsText = item.abilityTags.map((tag) => tag.label).join("、");

  return (
    <div className="question-item" onClick={handleClick}>
      <div className="question-title">{questionTitle}</div>
      {item.abilityTags.length > 0 && (
        <div className="ability-tags">
          能力标签：<span className="ability-tags-text">{abilityTagsText}</span>
        </div>
      )}
      {item.context && <div className="question-context">"{item.context}"</div>}
      {item.followUpQuestions.length > 0 && (
        <div className="follow-up-section">
          <div className="follow-up-title">追问方向：</div>
          <div className="follow-up-questions">
            {item.followUpQuestions.map((question, qIndex) => (
              <div key={question.id || qIndex} className="follow-up-item">
                {question.content}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 面试题面板组件
const InterviewQuestionPanel: React.FC<InterviewQuestionPanelProps> = ({
  className,
  source,
  onClose,
  onQuestionClick,
}) => {
  const { title, questions } = source;

  return (
    <StyledInterviewQuestionPanel className={className}>
      <div className="panel-header">
        <div className="panel-title">{title}</div>
        {onClose && (
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            className="close-button"
          />
        )}
      </div>
      <div className="panel-content">
        {questions.map((item, index) => (
          <InterviewQuestionItemComponent
            key={item.id}
            item={item}
            index={index}
            onQuestionClick={onQuestionClick}
          />
        ))}
      </div>
    </StyledInterviewQuestionPanel>
  );
};

export default InterviewQuestionPanel;
