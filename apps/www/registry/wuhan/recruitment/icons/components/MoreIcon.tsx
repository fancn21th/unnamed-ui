import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const MoreIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8C8.5 7.72386 8.27614 7.5 8 7.5C7.72386 7.5 7.5 7.72386 7.5 8C7.5 8.27614 7.72386 8.5 8 8.5Z"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.6665 8.5C12.9426 8.5 13.1665 8.27614 13.1665 8C13.1665 7.72386 12.9426 7.5 12.6665 7.5C12.3904 7.5 12.1665 7.72386 12.1665 8C12.1665 8.27614 12.3904 8.5 12.6665 8.5Z"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.3335 8.5C3.60964 8.5 3.8335 8.27614 3.8335 8C3.8335 7.72386 3.60964 7.5 3.3335 7.5C3.05735 7.5 2.8335 7.72386 2.8335 8C2.8335 8.27614 3.05735 8.5 3.3335 8.5Z"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 更多
 */
const MoreIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={MoreIconSvg} {...props} />
);

export default MoreIcon;
