import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const DeleteIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.6665 7.3335V11.3335"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.3335 7.3335V11.3335"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.6668 4V13.3333C12.6668 13.687 12.5264 14.0261 12.2763 14.2761C12.0263 14.5262 11.6871 14.6667 11.3335 14.6667H4.66683C4.31321 14.6667 3.97407 14.5262 3.72402 14.2761C3.47397 14.0261 3.3335 13.687 3.3335 13.3333V4"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 4H14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.3335 4.00016V2.66683C5.3335 2.31321 5.47397 1.97407 5.72402 1.72402C5.97407 1.47397 6.31321 1.3335 6.66683 1.3335H9.3335C9.68712 1.3335 10.0263 1.47397 10.2763 1.72402C10.5264 1.97407 10.6668 2.31321 10.6668 2.66683V4.00016"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 删除
 */
const DeleteIcon = (props: Partial<IconComponentProps>) => {
  const { style = {}, ...rest } = props;
  return (
    <Icon
      component={DeleteIconSvg}
      {...rest}
      style={{ color: "currentColor", ...style }}
    />
  );
};

export default DeleteIcon;
