import * as React from "react";
import { CopyButton } from "@/components/copy-button";

export function MDXCode(props: React.ComponentProps<"code"> & {
  __raw__?: string;
  __src__?: string;
}) {
  const { className, __raw__, __src__, children, ...restProps } = props;

  // Inline Code (单行代码，不换行) - code 组件主要用于内联代码
  // 代码块的处理已经在 pre 组件中完成
  return (
    <>
      {__raw__ && <CopyButton value={__raw__} src={__src__} />}
      <code className={className} {...restProps}>
        {children}
      </code>
    </>
  );
}

