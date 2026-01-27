import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const OrderedListIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.6665 3H13.9998"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.6665 6.3335H13.9998"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.6665 9.6665H13.9998"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.6665 13H13.9998"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 9.6665H4V10.6665L2 12.6665V12.9998H4"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.3335 3.66667L3.00016 3V6.33333M3.00016 6.33333H2.3335M3.00016 6.33333H3.66683"
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 有序列表
 */
const OrderedListIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={OrderedListIconSvg} {...props} />
);

export default OrderedListIcon;
