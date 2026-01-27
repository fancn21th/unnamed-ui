import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const InfoIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 15C9.93298 15 11.683 14.2165 12.9497 12.9497C14.2165 11.683 15 9.93298 15 8C15 6.06702 14.2165 4.31702 12.9497 3.05025C11.683 1.7835 9.93298 1 8 1C6.06702 1 4.31702 1.7835 3.05025 3.05025C1.7835 4.31702 1 6.06702 1 8C1 9.93298 1.7835 11.683 3.05025 12.9497C4.31702 14.2165 6.06702 15 8 15Z"
      stroke="#6B7280"
      strokeWidth="0.666667"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.99996 3.6665C8.46019 3.6665 8.83329 4.0396 8.83329 4.49984C8.83329 4.96007 8.46019 5.33317 7.99996 5.33317C7.53973 5.33317 7.16663 4.96007 7.16663 4.49984C7.16663 4.0396 7.53973 3.6665 7.99996 3.6665Z"
      fill="#666473"
    />
    <path
      d="M8.16667 11.3332V6.6665H7.83333H7.5"
      stroke="#666473"
      strokeWidth="0.666667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 11.3335H9.33333"
      stroke="#666473"
      strokeWidth="0.666667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 信息
 */
const InfoIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={InfoIconSvg} {...props} />
);

export default InfoIcon;
