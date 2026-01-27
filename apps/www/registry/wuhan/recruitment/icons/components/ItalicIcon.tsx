import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const ItalicIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.6665 2H11.9998"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 14H9.33333"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.66683 1.98389L6.3335 13.9998"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 斜体
 */
const ItalicIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={ItalicIconSvg} {...props} />
);

export default ItalicIcon;
