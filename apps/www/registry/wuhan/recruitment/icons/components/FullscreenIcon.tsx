import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const FullscreenIconSvg = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 2.5H17.5V7.5"
      stroke="#9E9FAA"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 2.5H2.5V7.5"
      stroke="#9E9FAA"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 17.5H17.5V12.5"
      stroke="#9E9FAA"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 17.5H2.5V12.5"
      stroke="#9E9FAA"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5002 2.5L12.0835 7.91667"
      stroke="#9E9FAA"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.91667 12.0833L2.5 17.4999"
      stroke="#9E9FAA"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 全屏
 */
const FullscreenIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={FullscreenIconSvg} {...props} />
);

export default FullscreenIcon;
