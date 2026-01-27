import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const FullscreenArrowIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.66699 13.333H2.66699M2.66699 13.333V9.33301M2.66699 13.333L6.5 9.5"
      stroke="#6B7280"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33301 2.66699H13.333M13.333 2.66699V6.66699M13.333 2.66699L9.5 6.5"
      stroke="#6B7280"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 全屏（箭头式）
 */
const FullscreenArrowIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={FullscreenArrowIconSvg} {...props} />
);

export default FullscreenArrowIcon;
