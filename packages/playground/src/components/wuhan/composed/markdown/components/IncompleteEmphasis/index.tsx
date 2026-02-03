import type { ComponentProps } from "@ant-design/x-markdown";

export const IncompleteEmphasis = (props: ComponentProps) => {
  const text = decodeURIComponent(String(props["data-raw"] || ""));

  const match = text.match(/^([*_]{1,3})([^*_]*)/);
  if (!match || !match[2]) return null;

  const [, symbols, content] = match;
  const level = symbols.length;

  switch (level) {
    case 1:
      return <em>{content}</em>;
    case 2:
      return <strong>{content}</strong>;
    case 3:
      return (
        <em>
          <strong>{content}</strong>
        </em>
      );
    default:
      return null;
  }
};

export default IncompleteEmphasis;
