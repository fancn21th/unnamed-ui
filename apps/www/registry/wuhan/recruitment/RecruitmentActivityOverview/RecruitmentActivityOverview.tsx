"use client";

import { Flex } from "antd";
import {
  RecruitmentActivityOverviewHeader,
  RecruitmentActivityOverviewIntroduction,
  RecruitmentActivityOverviewGoalList,
} from "./components";
import { StyledReportSectionContainer } from "./styles";
import type { RecruitmentActivityOverviewProps } from "./types";
import { RecruitmentActivityOverviewStatisticView } from "./components/StatisticView";
export function RecruitmentActivityOverview(
  props: RecruitmentActivityOverviewProps,
) {
  const {
    className = "",
    style = {},
    positionOptions = [],
    selectedPositionValue,
    onPositionChange = () => {},
    dataSource,
    onDetailAnalysisClick = () => {},
    onViewSwitch = () => {},
    onClose = () => {},
  } = props;
  return (
    <StyledReportSectionContainer className={className} style={style}>
      <RecruitmentActivityOverviewHeader
        positionOptions={positionOptions}
        onPositionChange={onPositionChange}
        selectedPositionValue={selectedPositionValue}
        onClose={onClose}
      />
      <Flex vertical gap={16}>
        <RecruitmentActivityOverviewIntroduction
          dataSource={dataSource}
          onDetailAnalysisClick={onDetailAnalysisClick}
        />
        <RecruitmentActivityOverviewGoalList dataSource={dataSource} />
        <RecruitmentActivityOverviewStatisticView
          dataSource={dataSource}
          onViewSwitch={onViewSwitch}
        />
      </Flex>
    </StyledReportSectionContainer>
  );
}
