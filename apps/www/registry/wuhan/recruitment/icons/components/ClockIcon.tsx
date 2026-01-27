import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const ClockIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.00008 14.0001C11.3138 14.0001 14.0001 11.3138 14.0001 8.00008C14.0001 4.68637 11.3138 2.00008 8.00008 2.00008C4.68637 2.00008 2.00008 4.68637 2.00008 8.00008C2.00008 11.3138 4.68637 14.0001 8.00008 14.0001ZM15.3334 8.00008C15.3334 12.0502 12.0502 15.3334 8.00008 15.3334C3.94999 15.3334 0.666748 12.0502 0.666748 8.00008C0.666748 3.94999 3.94999 0.666748 8.00008 0.666748C12.0502 0.666748 15.3334 3.94999 15.3334 8.00008ZM10.0001 10.9429L7.33341 8.27622L7.33342 3.66675H8.66675L8.66675 7.72394L10.9429 10.0001L10.0001 10.9429Z"
      fill="#BC68FF"
    />
  </svg>
);

/**
 * 时钟
 */
const ClockIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={ClockIconSvg} {...props} />
);

export default ClockIcon;
