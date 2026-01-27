import React, { type ReactNode } from "react";
import { Space, Spin } from "antd";
import {
  StyledReportCardContainer,
  StyledHeaderWrapper,
  StyledIconWrapper,
  StyledContentWrapper,
  StyledTitle,
  StyledUpdateTime,
  StyledDetailSection,
  StyledDetailItem,
  StyledDetailLabel,
  StyledDetailValue,
} from "./styles";

export interface DetailItem {
  label: string;
  value: string | ReactNode;
}

export interface ReportCardProps {
  /** 自定义图标，可以是 ReactNode */
  icon?: ReactNode;
  /** 卡片标题 */
  title: string;
  /** 更新时间 */
  updateTime?: string;
  /** 底部详情列表，传入则显示详情区域 */
  details?: DetailItem[];
  /** 加载状态 */
  loading?: boolean;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 点击事件 */
  onClick?: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({
  icon,
  title,
  updateTime,
  details,
  loading = false,
  style,
  className,
  onClick,
}) => {
  return (
    <StyledReportCardContainer
      style={style}
      className={className}
      onClick={onClick}
      $hasDetails={!!details}
      $loading={loading}
    >
      <Spin spinning={loading}>
        {/* 头部区域：图标 + 标题/时间 */}
        <StyledHeaderWrapper>
          {icon && (
            <StyledIconWrapper $loading={loading}>{icon}</StyledIconWrapper>
          )}

          <StyledContentWrapper>
            <StyledTitle $loading={loading}>{title}</StyledTitle>
            {updateTime && !loading && (
              <StyledUpdateTime>{updateTime}</StyledUpdateTime>
            )}
          </StyledContentWrapper>
        </StyledHeaderWrapper>

        {/* 底部详情区域（可选） */}
        {details && details.length > 0 && (
          <StyledDetailSection>
            <Space vertical size={0} style={{ width: "100%" }}>
              {details.map((item, index) => (
                <StyledDetailItem key={index}>
                  <StyledDetailLabel>{item.label}</StyledDetailLabel>
                  <StyledDetailValue>{item.value}</StyledDetailValue>
                </StyledDetailItem>
              ))}
            </Space>
          </StyledDetailSection>
        )}
      </Spin>
    </StyledReportCardContainer>
  );
};

export default ReportCard;
