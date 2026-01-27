import { Flex, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { ArrowDownIcon } from "../../../icons";
import { StyledReportSectionHeaderTitle } from "./styles";

import type { RecruitmentActivityOverviewHeaderProps } from "../../types";
export function RecruitmentActivityOverviewHeader(
  props: RecruitmentActivityOverviewHeaderProps,
) {
  const { positionOptions, selectedPositionValue, onPositionChange, onClose } =
    props;
  return (
    <Flex align="center" justify="space-between">
      <StyledReportSectionHeaderTitle>
        招聘活动概览
      </StyledReportSectionHeaderTitle>
      <Flex align="center" gap={24}>
        <Select
          options={positionOptions}
          value={selectedPositionValue}
          onChange={onPositionChange}
          removeIcon={<ArrowDownIcon />}
        />
        <CloseOutlined style={{ fontSize: 20 }} onClick={onClose} />
      </Flex>
    </Flex>
  );
}
