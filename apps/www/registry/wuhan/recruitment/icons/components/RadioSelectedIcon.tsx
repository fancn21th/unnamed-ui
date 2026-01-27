import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const RadioSelectedIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#4C56F6" />
    <path
      d="M3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8Z"
      fill="#4C56F6"
    />
  </svg>
);

/**
 * 单选按钮（选中）
 */
const RadioSelectedIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={RadioSelectedIconSvg} {...props} />
);

export default RadioSelectedIcon;
