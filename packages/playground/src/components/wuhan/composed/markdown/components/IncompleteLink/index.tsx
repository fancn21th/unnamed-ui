import type { ComponentProps } from "@ant-design/x-markdown";

export const IncompleteLink = (props: ComponentProps) => {
  const text = decodeURIComponent(String(props["data-raw"] || ""));

  // 提取链接文本，格式为 [text](url)
  const linkTextMatch = text.match(/^\[([^\]]*)\]/);
  const displayText = linkTextMatch ? linkTextMatch[1] : text.slice(1);

  return (
    <a style={{ pointerEvents: "none" }} href="#">
      {displayText}
    </a>
  );
};
export default IncompleteLink;
