import type { ReportSectionProps } from "./types";
import { StyledReportSection, StyledReportSectionTitle } from "./styles";
import { Flex } from "antd";
export function ReportSection(props: ReportSectionProps) {
  const { className = "", style = {}, title = "", children, extra } = props;
  return (
    <StyledReportSection className={className} style={style} vertical gap={16}>
      <Flex justify="space-between" align="center">
        <StyledReportSectionTitle>{title}</StyledReportSectionTitle>
        {extra}
      </Flex>
      {children}
    </StyledReportSection>
  );
}
