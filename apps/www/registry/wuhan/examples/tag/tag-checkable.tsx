"use client";

import * as React from "react";
import {
  CheckableTag,
  CheckableTagGroup,
} from "@/registry/wuhan/composed/tag/tag";
import { Star } from "lucide-react";

export default function TagCheckableExample() {
  // 单选模式状态
  const [singleValue, setSingleValue] = React.useState<string | number | null>(
    "react",
  );

  // 多选模式状态
  const [multipleValue, setMultipleValue] = React.useState<
    Array<string | number>
  >(["react", "typescript"]);

  // 单个 CheckableTag 状态
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(true);

  return (
    <div className="flex flex-col gap-8 p-8">
      {/* 单个 CheckableTag 示例 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          单个 CheckableTag
        </h3>
        <div className="flex flex-wrap gap-2">
          <CheckableTag checked={checked1} onChange={setChecked1}>
            可选中标签
          </CheckableTag>
          <CheckableTag checked={checked2} onChange={setChecked2}>
            默认选中
          </CheckableTag>
          <CheckableTag checked={false} disabled>
            禁用未选中
          </CheckableTag>
          <CheckableTag checked={true} disabled>
            禁用已选中
          </CheckableTag>
          <CheckableTag
            checked={checked1}
            onChange={setChecked1}
            icon={<Star className="h-3.5 w-3.5" />}
          >
            带图标
          </CheckableTag>
        </div>
      </div>

      {/* CheckableTagGroup 单选模式 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          CheckableTagGroup - 单选模式
        </h3>
        <CheckableTagGroup
          options={[
            { label: "React", value: "react" },
            { label: "Vue", value: "vue" },
            { label: "Angular", value: "angular" },
            { label: "Svelte", value: "svelte" },
          ]}
          value={singleValue}
          onChange={(value) => {
            setSingleValue(value as string | number | null);
            console.log("单选值:", value);
          }}
          classNames={{
            root: "flex flex-wrap gap-2",
            tag: "",
          }}
        />
        <p className="text-sm text-[var(--text-secondary)]">
          当前选中: {singleValue ? String(singleValue) : "无"}
        </p>
      </div>

      {/* CheckableTagGroup 多选模式 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          CheckableTagGroup - 多选模式
        </h3>
        <CheckableTagGroup
          multiple
          options={[
            { label: "React", value: "react" },
            { label: "TypeScript", value: "typescript" },
            { label: "Next.js", value: "nextjs" },
            { label: "Tailwind CSS", value: "tailwind" },
            { label: "Vite", value: "vite" },
          ]}
          value={multipleValue}
          onChange={(value) => {
            setMultipleValue(value as Array<string | number>);
            console.log("多选值:", value);
          }}
          classNames={{
            root: "flex flex-wrap gap-2",
            tag: "",
          }}
        />
        <p className="text-sm text-[var(--text-secondary)]">
          当前选中:{" "}
          {Array.isArray(multipleValue) ? multipleValue.join(", ") : "无"}
        </p>
      </div>

      {/* CheckableTagGroup 禁用状态 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          CheckableTagGroup - 禁用状态
        </h3>
        <CheckableTagGroup
          disabled
          options={[
            { label: "选项 1", value: "option1" },
            { label: "选项 2", value: "option2" },
            { label: "选项 3", value: "option3" },
          ]}
          defaultValue="option1"
          classNames={{
            root: "flex flex-wrap gap-2",
            tag: "",
          }}
        />
      </div>

      {/* CheckableTagGroup 非受控模式 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          CheckableTagGroup - 非受控模式（多选）
        </h3>
        <CheckableTagGroup
          multiple
          options={[
            { label: "标签 A", value: "tagA" },
            { label: "标签 B", value: "tagB" },
            { label: "标签 C", value: "tagC" },
            { label: "标签 D", value: "tagD" },
          ]}
          defaultValue={["tagA", "tagC"]}
          onChange={(value) => {
            console.log("非受控多选值变化:", value);
          }}
          classNames={{
            root: "flex flex-wrap gap-2",
            tag: "",
          }}
        />
      </div>
    </div>
  );
}
