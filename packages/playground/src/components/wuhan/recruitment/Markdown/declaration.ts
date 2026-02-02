import { type XMarkdownProps } from "@ant-design/x-markdown";

export interface MarkdownProps extends XMarkdownProps {
  // status?: 'pending' | 'streaming' | 'success' | 'error' | 'abort';
  status?: "local" | "loading" | "updating" | "success" | "error" | "abort";
  messageId?: string;
  [props: string]: any;
}
