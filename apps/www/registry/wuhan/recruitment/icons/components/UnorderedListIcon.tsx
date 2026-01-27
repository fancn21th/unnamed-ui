import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const UnorderedListIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 3H13"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 3H4"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 6.33008H4"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 9.66992H4"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 13H4"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6.3335H13"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 9.6665H13"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 13H13"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 无序列表
 */
const UnorderedListIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={UnorderedListIconSvg} {...props} />
);

export default UnorderedListIcon;
