import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";
const WordFileIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.25 3.375C2.25 2.13236 3.25736 1.125 4.5 1.125L10.6875 1.125L13.5 3.9375L15.75 6.1875V14.625C15.75 15.8676 14.7426 16.875 13.5 16.875H4.5C3.25736 16.875 2.25 15.8676 2.25 14.625V3.375Z"
      fill="url(#paint0_linear_962_56035)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.6875 1.125V3.9375C10.6875 5.18014 11.6949 6.1875 12.9375 6.1875H15.75L13.5 3.9375L10.6875 1.125Z"
      fill="url(#paint1_linear_962_56035)"
    />
    <path
      d="M6.50071 13.0457L4.68537 6.50026H5.72408L6.99929 11.5692H7.06001L8.38636 6.50026H9.41548L10.7418 11.5723H10.8026L12.0746 6.50026H13.1165L11.2979 13.0457H10.304L8.92649 8.14302H8.87536L7.49787 13.0457H6.50071Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_962_56035"
        x1="15.75"
        y1="9"
        x2="2.25"
        y2="9"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0BA5EC" />
        <stop offset="1" stopColor="#2E90FA" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_962_56035"
        x1="9"
        y1="1.125"
        x2="9"
        y2="16.875"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D1E9FF" />
        <stop offset="1" stopColor="#D1E9FF" />
      </linearGradient>
    </defs>
  </svg>
);

const WordFileIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={WordFileIconSvg} {...props} />
);

export default WordFileIcon;
