import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const UserMarkedIconSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 18 19"
    fill="none"
  >
    <path
      d="M3.33333 4.58333C3.33333 2.05203 5.38536 0 7.91667 0C10.448 0 12.5 2.05203 12.5 4.58333C12.5 7.11464 10.448 9.16667 7.91667 9.16667C5.38536 9.16667 3.33333 7.11464 3.33333 4.58333ZM10.625 9.58333H17.7083V18.1621L14.1691 15.9817L10.625 18.1604V9.58333ZM8.95833 16.6667H0V15C0 12.2386 2.23858 10 5 10H8.95833V16.6667Z"
      fill="#00BFE6"
    />
  </svg>
);

/**
 * 用户标记
 */
const UserMarkedIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={UserMarkedIconSvg} {...props} />
);

export default UserMarkedIcon;
