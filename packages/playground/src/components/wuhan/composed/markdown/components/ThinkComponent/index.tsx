import { Think } from "@ant-design/x";
import { type ComponentProps } from "@ant-design/x-markdown";
import { memo, useState, useEffect } from "react";

export const ThinkComponent = memo((props: ComponentProps) => {
  const [title, setTitle] = useState("深度思考");
  const [loading, setLoading] = useState(true);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (props.streamStatus === "done") {
      setTitle("Complete thinking");
      setLoading(false);
      setExpand(false);
    }
  }, [props.streamStatus]);

  return (
    <Think
      title={title}
      loading={loading}
      expanded={expand}
      onClick={() => setExpand(!expand)}
    >
      {props.children}
    </Think>
  );
});
export default ThinkComponent;
