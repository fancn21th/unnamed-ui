import { Skeleton } from "antd";
import { StyledGptVisWrapper } from "./style";
import { useState, useEffect, lazy, Suspense } from "react";

const Line = lazy(() =>
  import("@antv/gpt-vis").then((mod) => ({ default: mod.Line })),
);
const Column = lazy(() =>
  import("@antv/gpt-vis").then((mod) => ({ default: mod.Column })),
);

export const GptVis = (props: Record<string, any>) => {
  const { type, axisXTitle, axisYTitle, x, y, streamStatus } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const LoadingFallback = (
    <Skeleton.Image active={true} style={{ width: "100%", height: "300px" }} />
  );

  if (streamStatus === "loading" || !mounted) return LoadingFallback;

  const parsedX = typeof x === "string" ? JSON.parse(x.replace(/'/g, '"')) : x;
  const parsedY = typeof y === "string" ? JSON.parse(y.replace(/'/g, '"')) : y;

  if (type === "line") {
    const data = parsedX.map((item: string, index: number) => ({
      time: item,
      value: Number(parsedY[index]),
    }));
    return (
      <StyledGptVisWrapper>
        <Suspense fallback={LoadingFallback}>
          <Line data={data} axisXTitle={axisXTitle} axisYTitle={axisYTitle} />
        </Suspense>
      </StyledGptVisWrapper>
    );
  }

  if (type === "bar") {
    const data = parsedX.map((item: string, index: number) => ({
      category: item,
      value: Number(parsedY[index]),
    }));
    return (
      <StyledGptVisWrapper>
        <Suspense fallback={LoadingFallback}>
          <Column data={data} axisXTitle={axisXTitle} axisYTitle={axisYTitle} />
        </Suspense>
      </StyledGptVisWrapper>
    );
  }

  return null;
};

export default GptVis;
