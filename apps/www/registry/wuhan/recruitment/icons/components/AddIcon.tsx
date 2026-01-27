import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const AddIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0253 4.16675L10.01 15.8334"
      stroke="#414651"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.16663 10H15.8333"
      stroke="#414651"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 添加
 */
const AddIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={AddIconSvg} {...props} />
);

export default AddIcon;
