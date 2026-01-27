/** 人员推荐列表 - 展示候选人推荐信息及优先级 */
import React from "react";
import { RecommendType } from "./types";
import {
  StyledContainer,
  StyledDescription,
  StyledList,
  StyledListItem,
  StyledItemHeader,
  StyledRank,
  StyledCandidateName,
  StyledRecommendTag,
  StyledItemDescription,
} from "./style";

/**
 * 推荐类型标签文案映射
 */
const RECOMMEND_TYPE_LABELS = {
  [RecommendType.PRIORITY]: "优先选择",
  [RecommendType.ALTERNATIVE]: "备选",
  [RecommendType.NOT_RECOMMENDED]: "不建议",
};

/**
 * 人员推荐项数据接口
 * 定义单个候选人推荐信息的结构
 */
export interface PersonnelRecommendItem {
  /** 候选人名称 */
  candidateName: string;
  /** 推荐类型 */
  recommendType: RecommendType;
  /** 推荐描述/理由 */
  description: string;
  /** 候选人 ID（可选，用于点击等交互） */
  candidateId?: string;
  /** 支持额外的自定义字段 */
  [key: string]: any;
}

/**
 * 组件 Props 接口
 */
export interface PersonnelRecommendProps {
  /** 描述文本 */
  description?: string;
  /** 人员推荐数据数组 */
  recommendList: PersonnelRecommendItem[];
  /** 点击候选人名称的回调 */
  onCandidateClick?: (item: PersonnelRecommendItem, index: number) => void;
  /** 是否显示序号 */
  showRank?: boolean;
}

export const PersonnelRecommend: React.FC<PersonnelRecommendProps> = ({
  description,
  recommendList,
  onCandidateClick,
  showRank = true,
}) => {
  /**
   * 处理候选人名称点击
   */
  const handleCandidateClick = (
    item: PersonnelRecommendItem,
    index: number,
  ) => {
    if (onCandidateClick) {
      onCandidateClick(item, index);
    }
  };

  return (
    <StyledContainer>
      {description && <StyledDescription>{description}</StyledDescription>}
      <StyledList>
        {recommendList.map((item, index) => (
          <StyledListItem key={item.candidateId || index}>
            <StyledItemHeader>
              {showRank && <StyledRank>{index + 1}</StyledRank>}
              <StyledCandidateName
                onClick={() => handleCandidateClick(item, index)}
                style={{ cursor: onCandidateClick ? "pointer" : "default" }}
                title={item.candidateName}
              >
                {item.candidateName}
              </StyledCandidateName>
              <StyledRecommendTag $type={item.recommendType}>
                {RECOMMEND_TYPE_LABELS[item.recommendType]}
              </StyledRecommendTag>
            </StyledItemHeader>

            {item.description && (
              <StyledItemDescription>{item.description}</StyledItemDescription>
            )}
          </StyledListItem>
        ))}
      </StyledList>
    </StyledContainer>
  );
};

export default PersonnelRecommend;
