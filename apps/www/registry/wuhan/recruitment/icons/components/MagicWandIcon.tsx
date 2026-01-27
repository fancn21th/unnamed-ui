import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const MagicWandIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 7.99983L7.95459 10.0452L10 10.9998L7.95459 11.9544L7 13.9998L6.04541 11.9544L4 10.9998L6.04541 10.0452L7 7.99983Z"
      fill="#9CA3AF"
    />
    <path
      d="M12 3.99983L12.6364 5.36344L14 5.99983L12.6364 6.63623L12 7.99983L11.3636 6.63623L10 5.99983L11.3636 5.36344L12 3.99983Z"
      fill="#9CA3AF"
    />
    <path
      d="M26 19.9998L27.2728 22.727L30 23.9998L27.2728 25.2726L26 27.9998L24.7272 25.2726L22 23.9998L24.7272 22.727L26 19.9998Z"
      fill="#9CA3AF"
    />
    <path
      d="M8.26721 25.3922L11.7313 27.3922L23.7313 6.60761L20.2672 4.60761L8.26721 25.3922ZM13.2632 28.739L13.1749 28.8763C12.7321 29.4903 11.9137 29.7096 11.2232 29.3992L11.0781 29.3245L6.92046 26.9241C6.20322 26.5098 5.92769 25.6237 6.26018 24.8841L6.33496 24.739L18.7354 3.26087C19.1772 2.49597 20.1554 2.23388 20.9205 2.67537L25.0781 5.07576L25.2154 5.16407C25.8731 5.63833 26.0775 6.54343 25.6636 7.26087L13.2632 28.739Z"
      fill="#9CA3AF"
    />
    <path
      d="M22.9634 11.9376L21.9634 13.6697L15.0352 9.66969L16.0352 7.93764L22.9634 11.9376Z"
      fill="#9CA3AF"
    />
  </svg>
);

/**
 * 魔法棒
 */
const MagicWandIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={MagicWandIconSvg} {...props} />
);

export default MagicWandIcon;
