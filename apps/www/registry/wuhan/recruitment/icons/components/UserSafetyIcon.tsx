import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const UserSafetyIconSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M5.00008 6.24984C5.00008 3.71853 7.05211 1.6665 9.58341 1.6665C12.1147 1.6665 14.1667 3.71853 14.1667 6.24984C14.1667 8.78114 12.1147 10.8332 9.58341 10.8332C7.05211 10.8332 5.00008 8.78114 5.00008 6.24984ZM12.0834 11.2498H19.5834V15.9445C19.5834 16.7887 19.1574 17.5758 18.4507 18.0375L15.8334 19.7473L13.2162 18.0375C12.5094 17.5758 12.0834 16.7887 12.0834 15.9445V11.2498ZM10.4167 18.3332H1.66675V16.6665C1.66675 13.9051 3.90532 11.6665 6.66675 11.6665H10.4167V18.3332Z"
      fill="#6155F5"
    />
  </svg>
);

/**
 * 用户
 */
const UserSafetyIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={UserSafetyIconSvg} {...props} />
);

export default UserSafetyIcon;
