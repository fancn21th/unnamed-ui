import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const DropdownIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 6.55556C12 6.70602 11.9505 6.83623 11.8516 6.94618L8.35156 10.8351C8.2526 10.945 8.13542 11 8 11C7.86458 11 7.7474 10.945 7.64844 10.8351L4.14844 6.94618C4.04948 6.83623 4 6.70602 4 6.55556C4 6.40509 4.04948 6.27488 4.14844 6.16493C4.2474 6.05498 4.36458 6 4.5 6H11.5C11.6354 6 11.7526 6.05498 11.8516 6.16493C11.9505 6.27488 12 6.40509 12 6.55556Z"
      fill="#6B7280"
    />
  </svg>
);

/**
 * 下拉箭头
 */
const DropdownIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={DropdownIconSvg} {...props} />
);

export default DropdownIcon;
