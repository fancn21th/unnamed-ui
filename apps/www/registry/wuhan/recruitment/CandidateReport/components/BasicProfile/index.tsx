import React from "react";
import { Avatar, Tag, Space, Descriptions, Typography, Divider } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import type { BasicProfileData } from "../../index";
import { cssVar } from "../../../utils/cssVar";

const { Text } = Typography;

export interface BasicProfileProps {
  data: BasicProfileData;
}

// Descriptions 容器
const StyledDescriptions = styled(Descriptions)`
  && {
    width: 100%;
    background: #f0f7f6;
    border-radius: 12px;
    padding: ${cssVar("size", { prefix: "ant" })};
    gap: ${cssVar("size", { prefix: "ant" })};
    display: flex;
    flex-direction: column;
    .ant-descriptions-header {
      margin-bottom: 0;
    }
    .ant-descriptions-title {
      font-size: 20px;
      font-weight: 600;
      color: #6155f5;
    }

    .ant-descriptions-item-label {
      display: none;
    }

    .ant-descriptions-item-content {
      display: block;
    }

    .ant-descriptions-row {
      border-bottom: none;
    }
  }
`;

// 头像容器
const StyledProfileAvatar = styled(Avatar)`
  && {
    background: #e5f4ff;
    flex-shrink: 0;
  }
`;

// 信息容器
const StyledInfoWrapper = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #27272a;
`;

// 姓名文本
const StyledNameText = styled(Text)`
  && {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
  }
`;

// 状态标签
const StyledStatusTag = styled(Tag)`
  border: 1px solid #b9ecd1;
  color: #06ba7e;
  font-weight: 500;
  && {
    margin: 0;
    border-radius: 4px;
  }
`;

// 详细信息文本
const StyledDetailText = styled(Text)`
  && {
    font-size: 14px;
    color: #666666;
  }
`;

// 经验详情容器
const StyledExperienceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  color: #6b7280;
`;

// 经验图标
const StyledExperienceIcon = styled(PlusOutlined)`
  && {
    color: #4c56f6;
    font-size: 12px;
    margin-top: 4px;
    flex-shrink: 0;
  }
`;

// 经验文本
const StyledExperienceText = styled(Text)`
  && {
    font-size: 14px;
    color: #666666;
    line-height: 1.6;
    flex: 1;
  }
`;

// 基本画像组件
const BasicProfile: React.FC<BasicProfileProps> = ({ data }) => {
  console.info(data, "BasicProfile data");
  const {
    name,
    avatar,
    status,
    gender,
    age,
    workExperience,
    education,
    salaryExpectation,
    position,
    experienceDetails,
  } = data;

  return (
    <StyledDescriptions title="基本画像" column={1}>
      <Descriptions.Item>
        <Space align="start" size={12}>
          <StyledProfileAvatar size={48} src={avatar} icon={<UserOutlined />} />

          <StyledInfoWrapper>
            <Space size={12} wrap>
              <StyledNameText>{name}</StyledNameText>
              <StyledStatusTag color={status?.color || "green"}>
                {status?.text || "已通过二面"}
              </StyledStatusTag>
            </Space>

            <Space size={12} wrap>
              <StyledDetailText>{gender}</StyledDetailText>
              <Divider vertical />
              <StyledDetailText>{age}</StyledDetailText>
              <Divider vertical />
              <StyledDetailText>{workExperience}年工作经验</StyledDetailText>
              <Divider vertical />
              <StyledDetailText>{education}</StyledDetailText>
              <Divider vertical />
              <StyledDetailText>{salaryExpectation}</StyledDetailText>
              <Divider vertical />
              <StyledDetailText>{position}</StyledDetailText>
            </Space>
          </StyledInfoWrapper>
        </Space>
      </Descriptions.Item>

      {experienceDetails && experienceDetails.length > 0 && (
        <Descriptions.Item>
          <StyledExperienceWrapper>
            {experienceDetails.map((detail, index) => (
              <Space key={index} align="start" size={8}>
                <StyledExperienceIcon />
                <StyledExperienceText>{detail}</StyledExperienceText>
              </Space>
            ))}
          </StyledExperienceWrapper>
        </Descriptions.Item>
      )}
    </StyledDescriptions>
  );
};

export default BasicProfile;
