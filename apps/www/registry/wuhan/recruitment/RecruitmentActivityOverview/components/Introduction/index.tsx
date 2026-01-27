import { Flex, type ProgressProps } from "antd";
import { ReportSection } from "../../../ReportSection";
import type { RecruitmentActivityOverviewIntroductionProps } from "../../types";
import { StyledInnerContainer } from "../../styles";
import {
  StyledIntroductionRisk,
  StyledProgress,
  StyledDescriptionText,
  StyledIntroductionDetailButton,
} from "./styles";
import { IntroductionStatus } from "./Status";

const conicColors: ProgressProps["strokeColor"] = {
  "0%": "#59A5FC",
  "50%": "#6155F5",
  "100%": "#DD72F2",
};
export function RecruitmentActivityOverviewIntroduction(
  props: RecruitmentActivityOverviewIntroductionProps,
) {
  const { dataSource } = props;
  return (
    <ReportSection title="简介">
      <Flex vertical gap={16}>
        {dataSource?.introductionData?.goalDescription ||
          "暂无岗位招聘目标描述"}
      </Flex>
      <StyledInnerContainer>
        <Flex gap={12}>
          <IntroductionStatus
            status={dataSource?.introductionData?.status || ""}
          />
          <Flex vertical gap={8} flex={1}>
            <StyledDescriptionText>
              当前已完成：{" "}
              {`${dataSource?.introductionData?.completedText || "-"}`}
            </StyledDescriptionText>
            <Flex align="center">
              <StyledDescriptionText>任务进度：</StyledDescriptionText>
              <StyledProgress
                percent={dataSource?.introductionData?.progress ?? 0}
                strokeWidth={14}
                strokeColor={conicColors}
                percentPosition={{ align: "center", type: "inner" }}
                classNames={{ indicator: "process-indicator" }}
              />
            </Flex>
            <StyledIntroductionRisk>
              {dataSource?.introductionData?.riskWarning || "-"}
            </StyledIntroductionRisk>
          </Flex>
          <StyledIntroductionDetailButton type="link">
            {"详细分析>"}
          </StyledIntroductionDetailButton>
        </Flex>
      </StyledInnerContainer>
    </ReportSection>
  );
}
