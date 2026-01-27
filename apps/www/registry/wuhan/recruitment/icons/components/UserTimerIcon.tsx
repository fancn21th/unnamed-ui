import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const UserTimerIconSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M9.58341 1.6665C7.05211 1.6665 5.00008 3.71853 5.00008 6.24984C5.00008 8.78114 7.05211 10.8332 9.58341 10.8332C12.1147 10.8332 14.1667 8.78114 14.1667 6.24984C14.1667 3.71853 12.1147 1.6665 9.58341 1.6665Z"
      fill="#02C338"
    />
    <path
      d="M15.0001 10.4165C12.4688 10.4165 10.4167 12.4685 10.4167 14.9998C10.4167 17.5311 12.4688 19.5832 15.0001 19.5832C17.5314 19.5832 19.5834 17.5311 19.5834 14.9998C19.5834 12.4685 17.5314 10.4165 15.0001 10.4165ZM15.8334 17.0117L14.1667 15.3449V13.1265H15.8334V14.6546L17.0119 15.8332L15.8334 17.0117Z"
      fill="#02C338"
    />
    <path
      d="M10.2123 11.6665C9.55326 12.6114 9.16675 13.7605 9.16675 14.9998C9.16675 16.2392 9.55326 17.3883 10.2123 18.3332H1.66675V16.6665C1.66675 13.9051 3.90532 11.6665 6.66675 11.6665H10.2123Z"
      fill="#02C338"
    />
  </svg>
);

/**
 * 用户
 */
const UserTimerIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={UserTimerIconSvg} {...props} />
);

export default UserTimerIcon;
