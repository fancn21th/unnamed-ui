import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const DownloadIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 8.00277V14H14V8"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 7.6665L8 10.6665L5 7.6665"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.99707 2V10.6667"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 下载
 */
const DownloadIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={DownloadIconSvg} {...props} />
);

export default DownloadIcon;
