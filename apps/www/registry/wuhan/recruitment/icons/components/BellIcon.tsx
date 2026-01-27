import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const BellIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.66659 5.33333C2.66659 2.38781 5.0544 0 7.99992 0C10.9454 0 13.3333 2.38781 13.3333 5.33333V8.46482L14.6666 10.4648V13.3333H10.9256C10.6224 14.6693 9.42764 15.6667 7.99992 15.6667C6.57219 15.6667 5.37741 14.6693 5.07426 13.3333H1.33325V10.4648L2.66659 8.46482V5.33333ZM6.47193 13.3333C6.72912 13.922 7.31648 14.3333 7.99992 14.3333C8.68336 14.3333 9.27072 13.922 9.5279 13.3333H6.47193ZM7.99992 1.33333C5.79078 1.33333 3.99992 3.12419 3.99992 5.33333V8.86852L2.66659 10.8685V12H13.3333V10.8685L11.9999 8.86852V5.33333C11.9999 3.12419 10.2091 1.33333 7.99992 1.33333Z"
      fill="#0EA5E9"
    />
  </svg>
);

/**
 * 铃铛
 */
const BellIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={BellIconSvg} {...props} />
);

export default BellIcon;
