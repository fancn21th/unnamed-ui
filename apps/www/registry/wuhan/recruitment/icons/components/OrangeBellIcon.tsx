import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const OrangeBellIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_i_1085_20372)">
      <path
        d="M4.4 8.48936C4.4 4.3531 7.80264 1 12 1C16.1974 1 19.6 4.3531 19.6 8.48936V12.8868L21.5 15.6953V19.7234H2.5V15.6953L4.4 12.8868V8.48936Z"
        fill="#FF6E23"
      />
      <path
        d="M8.8123 20.6596C9.22107 22.013 10.4934 23 11.9996 23C13.5058 23 14.7782 22.013 15.1869 20.6596H8.8123Z"
        fill="#FF6E23"
      />
    </g>
    <path
      d="M10.6489 7.10742V12.2138H12.3511V7.10742H10.6489ZM12.3544 13.4904H10.6489V15.1959H12.3544V13.4904Z"
      fill="white"
    />
    <defs>
      <filter
        id="filter0_i_1085_20372"
        x="-0.199995"
        y="-1.69999"
        width="21.7"
        height="24.7"
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
        <feOffset dx="-2.69999" dy="-2.69999" />
        <feGaussianBlur stdDeviation="1.35" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0.884455 0 0 0 0 0.00961538 0 0 0 0.7 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_1085_20372"
        />
      </filter>
    </defs>
  </svg>
);

/**
 * 铃铛
 */
const OrangeBellIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={OrangeBellIconSvg} {...props} />
);

export default OrangeBellIcon;
