import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const CloseFullIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.5"
      d="M7.99968 14.6668C11.6816 14.6668 14.6663 11.6821 14.6663 8.00016C14.6663 4.31826 11.6816 1.3335 7.99968 1.3335C4.31777 1.3335 1.33301 4.31826 1.33301 8.00016C1.33301 11.6821 4.31777 14.6668 7.99968 14.6668Z"
      fill="#374151"
    />
    <path
      d="M5.29031 10.0075L10.0044 5.29349C10.1996 5.09823 10.5162 5.09823 10.7115 5.29349C10.9067 5.48876 10.9067 5.80534 10.7115 6.0006L5.99742 10.7146C5.80216 10.9099 5.48557 10.9099 5.29031 10.7146C5.09505 10.5194 5.09505 10.2028 5.29031 10.0075Z"
      fill="white"
    />
    <path
      d="M10.0075 10.7146L5.29349 6.00053C5.09823 5.80526 5.09823 5.48868 5.29349 5.29342C5.48876 5.09816 5.80534 5.09816 6.0006 5.29342L10.7146 10.0075C10.9099 10.2027 10.9099 10.5193 10.7146 10.7146C10.5194 10.9098 10.2028 10.9098 10.0075 10.7146Z"
      fill="white"
    />
  </svg>
);

/**
 * 关闭(填充)
 */
const CloseFullIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={CloseFullIconSvg} {...props} />
);

export default CloseFullIcon;
