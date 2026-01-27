import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const RadioUnselectedIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#A4A7AE" />
  </svg>
);

/**
 * 单选按钮（未选中）
 */
const RadioUnselectedIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={RadioUnselectedIconSvg} {...props} />
);

export default RadioUnselectedIcon;
