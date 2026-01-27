import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const EarthIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.00004 14.6668C11.6819 14.6668 14.6667 11.6821 14.6667 8.00016C14.6667 4.31826 11.6819 1.3335 8.00004 1.3335C4.31814 1.3335 1.33337 4.31826 1.33337 8.00016C1.33337 11.6821 4.31814 14.6668 8.00004 14.6668Z"
      stroke="#535862"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.00004 1.3335C6.2882 3.13093 5.33337 5.51799 5.33337 8.00016C5.33337 10.4823 6.2882 12.8694 8.00004 14.6668C9.71188 12.8694 10.6667 10.4823 10.6667 8.00016C10.6667 5.51799 9.71188 3.13093 8.00004 1.3335Z"
      stroke="#535862"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.33337 8H14.6667"
      stroke="#535862"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 地球
 */
const EarthIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={EarthIconSvg} {...props} />
);

export default EarthIcon;
