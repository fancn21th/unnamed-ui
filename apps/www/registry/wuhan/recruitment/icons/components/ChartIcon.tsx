import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const ChartIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3333 2.33325H2.66667V10.3333H13.3333V2.33325Z"
      stroke="#4A56FF"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M5.07382 6.4828L7.27599 7.32714L8.70213 5.38254L10.9043 6.22689"
      stroke="#4A56FF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.33333 2.33325H14.6667"
      stroke="#4A56FF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 13.6666L8 10.3333L11 13.6666"
      stroke="#4A56FF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 图表
 */
const ChartIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={ChartIconSvg} {...props} />
);

export default ChartIcon;
