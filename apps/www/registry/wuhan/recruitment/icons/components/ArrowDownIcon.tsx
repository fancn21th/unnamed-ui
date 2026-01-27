import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const ArrowDownIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.01807 5.6123C8.21444 5.45223 8.50399 5.46348 8.68701 5.64648L12.687 9.64648C12.8822 9.84171 12.8822 10.1582 12.687 10.3535C12.4918 10.5488 12.1752 10.5488 11.98 10.3535L8.3335 6.70703L4.68701 10.3535C4.49175 10.5488 4.17524 10.5488 3.97998 10.3535C3.78474 10.1583 3.78473 9.84174 3.97998 9.64648L7.97998 5.64648L8.01807 5.6123Z"
      fill="#666473"
    />
  </svg>
);

/**
 * 向下箭头图标
 */
const ArrowDownIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={ArrowDownIconSvg} {...props} />
);

export default ArrowDownIcon;
