import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const BoldIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.99984 8.00016C9.83504 8.00016 11.3228 6.50776 11.3228 4.66683C11.3228 2.82588 9.83504 1.3335 7.99984 1.3335H3.6665V8.00016H7.99984Z"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.34357 14.6667C11.1788 14.6667 12.6665 13.1743 12.6665 11.3333C12.6665 9.4924 11.1788 8 9.34357 8H3.6665V14.6667H9.34357Z"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 加粗
 */
const BoldIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={BoldIconSvg} {...props} />
);

export default BoldIcon;
