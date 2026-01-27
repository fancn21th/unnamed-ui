import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const UserIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 9.17067C10.6505 9.17067 12.7988 7.11791 12.7988 4.58533C12.7988 2.05276 10.6505 0 8 0C5.34953 0 3.20122 2.05276 3.20122 4.58533C3.20122 7.11791 5.34953 9.17067 8 9.17067ZM8 11.3105C3.58188 11.3105 0 12.659 0 14.3209C0 15.9829 3.58188 17.3333 8 17.3333C12.4181 17.3333 16 15.9848 16 14.3229C16 12.6609 12.4181 11.3105 8 11.3105Z"
      fill="#4C56F6"
    />
  </svg>
);

/**
 * 用户
 */
const UserIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={UserIconSvg} {...props} />
);

export default UserIcon;
