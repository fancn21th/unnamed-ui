"use client";

import { useState } from "react";
import { Button, Flex } from "antd";
import { ReportSection } from "../../../ReportSection";
import type { RecruitmentActivityOverviewStatisticViewProps } from "../../types";
import { StyledInnerContainer } from "../../styles";
import { GridStatisticView } from "./GridStatisticView";
import { StatisticFilter } from "./StatisticFilter";
import { FilterTable } from "./FilterTable";

export function RecruitmentActivityOverviewStatisticView(
  props: RecruitmentActivityOverviewStatisticViewProps,
) {
  const { dataSource, onViewSwitch } = props;
  const [viewMode, setViewMode] = useState<"statistic" | "filter">("statistic");

  const onClickViewSwitch = () => {
    const newMode = viewMode === "statistic" ? "filter" : "statistic";
    setViewMode(newMode);
    onViewSwitch?.(newMode);
  };

  const renderContent = () => {
    if (viewMode === "statistic") {
      return (
        <Flex>
          <GridStatisticView
            processStatisticList={dataSource?.processStatisticList || []}
          />
        </Flex>
      );
    } else {
      return (
        <Flex vertical gap={24}>
          <StatisticFilter
            processStatisticList={dataSource?.processStatisticList || []}
            totalCandidates={dataSource?.totalCandidates || 0}
          />
          <FilterTable dataSource={dataSource?.candidateList} />
        </Flex>
      );
    }
  };
  return (
    <ReportSection
      title={`全部候选人：${dataSource?.totalCandidates || 0}`}
      extra={<Button onClick={onClickViewSwitch}>切换视图</Button>}
      style={{ backgroundColor: "#EFEEFE" }}
    >
      <StyledInnerContainer>{renderContent()}</StyledInnerContainer>
    </ReportSection>
  );
}
