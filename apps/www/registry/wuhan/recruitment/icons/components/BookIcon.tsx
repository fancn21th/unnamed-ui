import Icon from "@ant-design/icons";
import type { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const BookIconSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.6667 10.3333V14.6666C13.6667 14.6666 5.79167 14.6666 4.54167 14.6666C3.29167 14.6666 2.66667 13.9999 2.66667 12.3333C2.66667 10.6666 2.66667 1.33325 2.66667 1.33325H6.66667"
      stroke="#0AA6A4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 12H13"
      stroke="#0AA6A4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 5.04436C8 4.89129 8.12445 4.76868 8.27675 4.75331C9.57314 4.62247 10.6049 3.58233 10.7326 2.27414C10.7473 2.12325 10.8688 2 11.0204 2C11.172 2 11.2935 2.12325 11.3082 2.27414C11.4358 3.582 12.4666 4.62355 13.7644 4.75425C13.9165 4.76956 14.0408 4.89198 14.0408 5.04481C14.0408 5.19763 13.9165 5.32005 13.7644 5.33535C12.4665 5.46597 11.4357 6.50694 11.3082 7.81547C11.2935 7.96636 11.172 8.08961 11.0204 8.08961C10.8688 8.08961 10.7473 7.96636 10.7326 7.81547C10.605 6.50776 9.57443 5.4663 8.27675 5.33541C8.12445 5.32004 8 5.19744 8 5.04436Z"
      fill="#0AA6A4"
    />
  </svg>
);

/**
 * 书籍
 */
const BookIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={BookIconSvg} {...props} />
);

export default BookIcon;
