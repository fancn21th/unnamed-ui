import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const EditIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1168_11278)">
      <path
        d="M8.66675 14H14.0001"
        stroke="#535862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 3.33334L12.6667 6.00001"
        stroke="#535862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1161 4.54132C14.4686 4.18894 14.6666 3.71097 14.6667 3.21256C14.6668 2.71415 14.4688 2.23613 14.1165 1.88366C13.7641 1.53118 13.2861 1.33313 12.7877 1.33307C12.2893 1.33301 11.8113 1.53094 11.4588 1.88332L2.56145 10.7827C2.40667 10.937 2.29219 11.127 2.22812 11.336L1.34745 14.2373C1.33022 14.295 1.32892 14.3562 1.34369 14.4146C1.35845 14.4729 1.38873 14.5261 1.43132 14.5687C1.4739 14.6112 1.5272 14.6414 1.58556 14.656C1.64392 14.6707 1.70516 14.6693 1.76279 14.652L4.66479 13.772C4.87357 13.7085 5.06357 13.5947 5.21812 13.4407L14.1161 4.54132Z"
        stroke="#535862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1168_11278">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

/**
 * 地球
 */
const EditIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={EditIconSvg} {...props} />
);

export default EditIcon;
