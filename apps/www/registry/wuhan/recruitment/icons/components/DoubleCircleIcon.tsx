import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const DoubleCircleIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_i_1085_20406)">
      <path
        d="M10.4541 5C13.4664 5 15.9089 7.44184 15.9092 10.4541C15.9092 10.5757 15.9033 10.6968 15.8955 10.8164C15.4029 10.5848 14.8528 10.4541 14.2725 10.4541C12.164 10.4543 10.4552 12.164 10.4551 14.2725C10.4551 14.8528 10.5847 15.4029 10.8164 15.8955C10.6968 15.9033 10.5757 15.9092 10.4541 15.9092C7.44184 15.9089 5 13.4664 5 10.4541C5.00024 7.44199 7.44199 5.00024 10.4541 5Z"
        fill="url(#paint0_linear_1085_20406)"
      />
    </g>
    <circle
      cx="14.2727"
      cy="14.2722"
      r="2.72727"
      fill="url(#paint1_linear_1085_20406)"
    />
    <defs>
      <filter
        id="filter0_i_1085_20406"
        x="5"
        y="5"
        width="10.9092"
        height="10.9102"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="1.9" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.766667 0 0 0 0 0.65 0 0 0 0 1 0 0 0 0.96 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_1085_20406"
        />
      </filter>
      <linearGradient
        id="paint0_linear_1085_20406"
        x1="6.21212"
        y1="6.81818"
        x2="13.4848"
        y2="15.9091"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B795FC" />
        <stop offset="0.655713" stopColor="#8447FF" />
        <stop offset="1" stopColor="#86C4FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1085_20406"
        x1="14.2727"
        y1="11.5449"
        x2="14.2727"
        y2="16.9995"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E2D4FF" />
        <stop offset="1" stopColor="#9B69FF" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * 双圆圈图标
 */
const DoubleCircleIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={DoubleCircleIconSvg} {...props} />
);

export default DoubleCircleIcon;
