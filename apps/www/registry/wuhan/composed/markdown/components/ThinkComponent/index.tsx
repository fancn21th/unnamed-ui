import { Think } from "@ant-design/x";
import { type ComponentProps } from "@ant-design/x-markdown";
import { memo, useState, useCallback } from "react";

function ThinkComponentInner(props: ComponentProps) {
  const streamDone = props.streamStatus === "done";
  const title = streamDone ? "Complete thinking" : "深度思考";
  const loading = !streamDone;
  const [expand, setExpand] = useState(false);
  const effectiveExpand = streamDone ? false : expand;
  const handleClick = useCallback(() => {
    if (!streamDone) setExpand((e) => !e);
  }, [streamDone]);

  return (
    <Think
      title={title}
      loading={loading}
      expanded={effectiveExpand}
      onClick={handleClick}
    >
      {props.children}
    </Think>
  );
}

export const ThinkComponent = memo(ThinkComponentInner);
ThinkComponent.displayName = "ThinkComponent";
export default ThinkComponent;
