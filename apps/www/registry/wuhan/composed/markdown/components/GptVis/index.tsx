import { Skeleton } from "antd";
import { StyledGptVisWrapper } from "./style";
import { useSyncExternalStore, lazy, Suspense } from "react";

const emptySubscribe = () => () => {};

const Line = lazy(() =>
  import("@antv/gpt-vis").then((mod) => ({ default: mod.Line })),
);
const Column = lazy(() =>
  import("@antv/gpt-vis").then((mod) => ({ default: mod.Column })),
);

export interface GptVisProps {
  type?: string;
  axisXTitle?: string;
  axisYTitle?: string;
  x?: unknown;
  y?: unknown;
  streamStatus?: string;
}

function parseAxisArray(v: unknown): string[] {
  if (typeof v === "string") {
    return JSON.parse(v.replace(/'/g, '"')) as string[];
  }
  if (Array.isArray(v)) {
    return v.map((item) => String(item));
  }
  return [];
}

export const GptVis = (props: GptVisProps) => {
  const { type, axisXTitle, axisYTitle, x, y, streamStatus } = props;
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const LoadingFallback = (
    <Skeleton.Image active={true} style={{ width: "100%", height: "300px" }} />
  );

  if (streamStatus === "loading" || !mounted) return LoadingFallback;

  const parsedX = parseAxisArray(x);
  const parsedY = parseAxisArray(y);

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
