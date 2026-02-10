"use client";

import * as React from "react";
import { Tag } from "@/registry/wuhan/composed/tag/tag";
import { BlockInput } from "@/registry/wuhan/composed/block-input/block-input";

export default function TagAddable() {
  const [tags, setTags] = React.useState<string[]>([
    "React",
    "TypeScript",
    "Next.js",
  ]);
  const [isAdding, setIsAdding] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
      setIsAdding(false);
    } else if (e.key === "Escape") {
      setInputValue("");
      setIsAdding(false);
    }
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
    setIsAdding(false);
  };

  const handleClose = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          动态标签列表（点击添加标签，按回车或失焦保存）:
        </span>
        <div className="flex flex-wrap gap-2 items-center">
          {tags.map((tag, index) => (
            <Tag
              key={index}
              variant="filled"
              theme="brand"
              closeable
              onClose={() => handleClose(index)}
            >
              {tag}
            </Tag>
          ))}

          {isAdding ? (
            <BlockInput
              value={inputValue}
              onChange={setInputValue}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              placeholder="输入标签名称"
              autoFocus
              className="w-[120px]"
            />
          ) : (
            <Tag addable onAdd={handleAdd} />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[var(--text-secondary)]">
          自定义添加文本:
        </span>
        <div className="flex flex-wrap gap-2">
          <Tag addable addText="添加技能" />
          <Tag addable addText="新建标签" />
          <Tag addable addText="+ 添加" />
        </div>
      </div>
    </div>
  );
}
