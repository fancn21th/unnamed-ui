import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const CopyIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.3335 4.1437V2.604C4.3335 2.08624 4.75323 1.6665 5.271 1.6665H13.396C13.9138 1.6665 14.3335 2.08624 14.3335 2.604V10.729C14.3335 11.2468 13.9138 11.6665 13.396 11.6665H11.8389"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.729 4.3335H2.604C2.08624 4.3335 1.6665 4.75323 1.6665 5.271V13.396C1.6665 13.9138 2.08624 14.3335 2.604 14.3335H10.729C11.2468 14.3335 11.6665 13.9138 11.6665 13.396V5.271C11.6665 4.75323 11.2468 4.3335 10.729 4.3335Z"
      stroke="#344054"
      strokeLinejoin="round"
    />
  </svg>
);

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
 * 复制
 */
export const CopyIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={CopyIconSvg} {...props} />
);

/**
 * 下载
 */
export const DownloadIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={DownloadIconSvg} {...props} />
);
