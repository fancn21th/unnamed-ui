import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";
const MDFileIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.25 3.375C2.25 2.13236 3.25736 1.125 4.5 1.125L10.6875 1.125L13.5 3.9375L15.75 6.1875V14.625C15.75 15.8676 14.7426 16.875 13.5 16.875H4.5C3.25736 16.875 2.25 15.8676 2.25 14.625V3.375Z"
      fill="url(#paint0_linear_962_56047)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.6875 1.125V3.9375C10.6875 5.18014 11.6949 6.1875 12.9375 6.1875H15.75L13.5 3.9375L10.6875 1.125Z"
      fill="url(#paint1_linear_962_56047)"
    />
    <path
      d="M5.66906 6.52559H6.86756L8.95137 11.6137H9.02808L11.1119 6.52559H12.3104V13.071H11.3708V8.33454H11.31L9.37964 13.0615H8.59981L6.66941 8.33134H6.60869V13.071H5.66906V6.52559Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_962_56047"
        x1="15.75"
        y1="9"
        x2="2.25"
        y2="9"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7B61FF" />
        <stop offset="1" stopColor="#6172F3" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_962_56047"
        x1="9"
        y1="1.125"
        x2="9"
        y2="16.875"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EAE5FF" />
        <stop offset="1" stopColor="#E1DBFF" />
      </linearGradient>
    </defs>
  </svg>
);

const MDFileIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={MDFileIconSvg} {...props} />
);

export default MDFileIcon;
