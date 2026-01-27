import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const NoteIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.66667 0.666748H11.3333V2.00008H14V15.3334H2V2.00008H4.66667V0.666748ZM4.66667 3.33341H3.33333V14.0001H12.6667V3.33341H11.3333V4.66675H4.66667V3.33341ZM10 2.00008H6V3.33341H10V2.00008ZM6 7.33342H10V8.66675H6V7.33342ZM6 10.0001H10V11.3334H6V10.0001Z"
      fill="#00C3CF"
    />
  </svg>
);

/**
 * 记事本
 */
const NoteIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={NoteIconSvg} {...props} />
);

export default NoteIcon;
