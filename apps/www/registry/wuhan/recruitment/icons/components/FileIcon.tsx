import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const FileIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.33337 1.33325L14.6667 1.33325L14.6667 9.60939L9.60952 14.6666L1.33337 14.6666L1.33337 1.33325ZM2.66671 2.66659L2.66671 13.3333L8.66671 13.3333L8.66671 8.66658L13.3334 8.66658L13.3334 2.66659L2.66671 2.66659ZM12.3906 9.99992H10V12.3904L12.3906 9.99992ZM4.00004 5.33325L12 5.33325V6.66658L4.00004 6.66658L4.00004 5.33325ZM4.00004 7.99992L7.33337 7.99992V9.33325H4.00004L4.00004 7.99992Z"
      fill="#4A56FF"
    />
  </svg>
);

/**
 * 普通文档图标
 */
const FileIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={FileIconSvg} {...props} />
);

export default FileIcon;
