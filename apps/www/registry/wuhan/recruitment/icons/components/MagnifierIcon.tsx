import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const MagnifierIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.00004 12.6668C10.1296 12.6668 12.6667 10.1298 12.6667 7.00016C12.6667 3.87056 10.1296 1.3335 7.00004 1.3335C3.87044 1.3335 1.33337 3.87056 1.33337 7.00016C1.33337 10.1298 3.87044 12.6668 7.00004 12.6668Z"
      stroke="#6B7280"
      strokeWidth="1.33333"
      strokeLinejoin="round"
    />
    <path
      d="M8.88561 4.78103C8.40305 4.29847 7.73638 4 6.99998 4C6.26361 4 5.59695 4.29847 5.11438 4.78103"
      stroke="#6B7280"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.0739 11.0737L13.9023 13.9022"
      stroke="#6B7280"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 放大镜
 */
const MagnifierIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={MagnifierIconSvg} {...props} />
);

export default MagnifierIcon;
