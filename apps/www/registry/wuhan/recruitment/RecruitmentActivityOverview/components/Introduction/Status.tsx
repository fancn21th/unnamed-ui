import { Flex } from "antd";
import { OrangeBellIcon } from "../../../icons";
import { StyledIntroductionStatusLabel } from "./styles";

const StatusMap = {
  hasRisk: {
    text: "存在风险",
    icon: <OrangeBellIcon style={{ fontSize: 24 }} />,
    className: "risk",
  },
};
export type IntroductionStatusProps = {
  status: string;
};
export function IntroductionStatus(props: IntroductionStatusProps) {
  const { status } = props;
  // @ts-ignore
  const { text, icon, className } = StatusMap[status];
  return (
    <Flex vertical gap={8} align="center">
      {icon}
      <StyledIntroductionStatusLabel className={className}>
        {text}
      </StyledIntroductionStatusLabel>
    </Flex>
  );
}
