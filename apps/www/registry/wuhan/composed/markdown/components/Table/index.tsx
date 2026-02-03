import type { ComponentProps } from "@ant-design/x-markdown";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DownloadIcon, CopyIcon } from "../../icons";
import {
  StyledMarkdownTableWrapper,
  StyledMarkdownTableScroll,
  StyledMarkdownTable,
  StyledCodeToolButton,
  StyledCodeToolbar,
} from "./style";

export const Table: React.FC<ComponentProps> = (props) => {
  const { domNode } = props;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [xOverflow, setXOverflow] = useState(false);

  const updateXOverflow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // 用 1px 容错，避免小数像素/滚动条抖动
    const next = el.scrollWidth - el.clientWidth > 1;
    setXOverflow(next);
  }, []);

  useEffect(() => {
    // 首次渲染后再测一次，避免 layout 未完成导致测量不准
    const raf = window.requestAnimationFrame(updateXOverflow);

    const ro = new ResizeObserver(() => updateXOverflow());
    if (scrollRef.current) ro.observe(scrollRef.current);
    if (tableRef.current) ro.observe(tableRef.current);

    window.addEventListener("resize", updateXOverflow);

    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", updateXOverflow);
    };
    // domNode 变化意味着表格结构变化，需要重新测量
  }, [domNode, updateXOverflow]);

  const extractText = (node: any): string => {
    if (!node) return "";
    if (node.type === "text") return node.data || "";
    if (node.children)
      return node.children.map((child: any) => extractText(child)).join("");
    return "";
  };

  const parse = () => {
    if (!domNode || domNode.type !== "tag" || domNode.name !== "table")
      return null;

    const children = domNode.children || [];
    let theadNode: any = null;
    let tbodyNode: any = null;

    for (const child of children) {
      if (child.type === "tag") {
        if (child.name === "thead") theadNode = child;
        if (child.name === "tbody") tbodyNode = child;
      }
    }

    const headers: string[] = [];
    const rows: string[][] = [];

    const renderThead = () => {
      if (!theadNode) return null;
      const trNode = theadNode.children?.find(
        (child: any) => child.type === "tag" && child.name === "tr",
      );
      if (!trNode) return null;
      const thNodes =
        trNode.children?.filter(
          (child: any) => child.type === "tag" && child.name === "th",
        ) || [];
      headers.push(...thNodes.map((th: any) => extractText(th)));

      return (
        <thead>
          <tr>
            {thNodes.map((th: any, index: number) => {
              const text = extractText(th);
              const attribs = th.attribs || {};
              const rowSpan = attribs.rowspan
                ? parseInt(attribs.rowspan, 10)
                : undefined;
              const colSpan = attribs.colspan
                ? parseInt(attribs.colspan, 10)
                : undefined;
              return (
                <th key={index} rowSpan={rowSpan} colSpan={colSpan}>
                  {text}
                </th>
              );
            })}
          </tr>
        </thead>
      );
    };

    const renderTbody = () => {
      if (!tbodyNode) return null;
      const trNodes =
        tbodyNode.children?.filter(
          (child: any) => child.type === "tag" && child.name === "tr",
        ) || [];
      return (
        <tbody>
          {trNodes.map((tr: any, rowIndex: number) => {
            const tdNodes =
              tr.children?.filter(
                (child: any) => child.type === "tag" && child.name === "td",
              ) || [];
            rows[rowIndex] = tdNodes.map((td: any) => extractText(td));
            return (
              <tr key={rowIndex}>
                {tdNodes.map((td: any, colIndex: number) => {
                  const text = extractText(td);
                  const attribs = td.attribs || {};
                  const rowSpan = attribs.rowspan
                    ? parseInt(attribs.rowspan, 10)
                    : undefined;
                  const colSpan = attribs.colspan
                    ? parseInt(attribs.colspan, 10)
                    : undefined;
                  return (
                    <td key={colIndex} rowSpan={rowSpan} colSpan={colSpan}>
                      {text}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      );
    };

    const toCsv = (matrix: string[][]) => {
      const esc = (v: string) => {
        const s = v ?? "";
        const needsQuote = /[",\n]/.test(s);
        const quoted = `"${s.replace(/"/g, '""')}"`;
        return needsQuote ? quoted : s;
      };
      return matrix.map((row) => row.map(esc).join(",")).join("\n");
    };

    const toTsv = (matrix: string[][]) => {
      const esc = (v: string) =>
        (v ?? "").replace(/\t/g, "  ").replace(/\r?\n/g, " ");
      return matrix.map((row) => row.map(esc).join("\t")).join("\n");
    };

    const handleCopy = async () => {
      const matrix = headers.length ? [headers, ...rows] : rows;
      const text = toTsv(matrix);
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    };

    const handleDownload = () => {
      const matrix = headers.length ? [headers, ...rows] : rows;
      const csv = toCsv(matrix);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "table.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    return (
      <StyledMarkdownTableWrapper>
        <StyledCodeToolbar className="md-table-toolbar">
          <StyledCodeToolButton
            type="button"
            aria-label="下载"
            title="下载"
            onClick={handleDownload}
          >
            <DownloadIcon />
          </StyledCodeToolButton>
          <StyledCodeToolButton
            type="button"
            aria-label="复制"
            title="复制"
            onClick={handleCopy}
          >
            <CopyIcon />
          </StyledCodeToolButton>
        </StyledCodeToolbar>

        <StyledMarkdownTableScroll
          ref={scrollRef}
          data-x-overflow={xOverflow ? "true" : "false"}
        >
          <StyledMarkdownTable ref={tableRef}>
            {renderThead()}
            {renderTbody()}
          </StyledMarkdownTable>
        </StyledMarkdownTableScroll>
      </StyledMarkdownTableWrapper>
    );
  };

  const table = parse();
  if (!table) return <div style={{ overflow: "auto" }}>{props.children}</div>;
  return table;
};

export default Table;
