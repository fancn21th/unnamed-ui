import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const RectangleEditIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 11.9996C9 11.8487 9.12262 11.7279 9.2727 11.713C10.5607 11.5851 11.5861 10.5609 11.7139 9.27226C11.7288 9.12242 11.8494 9 12 9C12.1506 9 12.2712 9.12242 12.2861 9.27226C12.4138 10.5606 13.4383 11.5862 14.7277 11.7139C14.8776 11.7288 15 11.8494 15 12C15 12.1506 14.8776 12.2712 14.7277 12.2861C13.4383 12.4137 12.4137 13.4387 12.2861 14.7277C12.2712 14.8776 12.1506 15 12 15C11.8494 15 11.7288 14.8776 11.7139 14.7277C11.5862 13.4395 10.5619 12.4141 9.2727 12.2861C9.12262 12.2712 9 12.1504 9 11.9996Z"
      fill="#4A56FF"
    />
    <path
      d="M6.5 15H3C2.44772 15 2 14.5523 2 14V2C2 1.44772 2.44772 1 3 1H13C13.5523 1 14 1.44772 14 2V8"
      stroke="#4A56FF"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M5.31579 9.42101L9.73683 5L11 6.26303L6.57895 10.6842L5 11L5.31579 9.42101Z"
      stroke="#4A56FF"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 矩形编辑
 */
const RectangleEditIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={RectangleEditIconSvg} {...props} />
);

export default RectangleEditIcon;
