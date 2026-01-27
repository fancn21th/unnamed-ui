import { Flex } from "antd";
import { DoubleCircleIcon } from "../../../icons";
import { ReportSection } from "../../../ReportSection";
import type { RecruitmentActivityOverviewGoalListProps } from "../../types";
import { StyledInnerContainer } from "../../styles";
import {
  StyledGoalPositionDescription,
  StyledGoalPositionTitle,
} from "./styles";
export function RecruitmentActivityOverviewGoalList(
  props: RecruitmentActivityOverviewGoalListProps,
) {
  const { dataSource } = props;
  return (
    <ReportSection title="岗位招聘目标" style={{ backgroundColor: "#EDF4FF" }}>
      <StyledInnerContainer>
        <Flex vertical gap={12}>
          {dataSource?.positionGoalList?.map((item) => (
            <Flex vertical gap={8} key={item.id}>
              <Flex align="center" gap={4}>
                <DoubleCircleIcon style={{ fontSize: 22 }} />
                <StyledGoalPositionTitle>{item.name}</StyledGoalPositionTitle>
              </Flex>
              <StyledGoalPositionDescription>
                {item.description}
              </StyledGoalPositionDescription>
            </Flex>
          ))}
        </Flex>
      </StyledInnerContainer>
    </ReportSection>
  );
}
