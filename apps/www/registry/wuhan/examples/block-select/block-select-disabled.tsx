import { BlockSelect } from "@/registry/wuhan/composed/block-select/block-select";

export default function BlockSelectDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <BlockSelect
        disabled
        defaultValue="apple"
        options={[
          { label: "苹果", value: "apple" },
          { label: "香蕉", value: "banana" },
          { label: "橙子", value: "orange" },
        ]}
        placeholder="禁用状态"
      />

      <BlockSelect
        options={[
          { label: "苹果", value: "apple" },
          { label: "香蕉（禁用）", value: "banana", disabled: true },
          { label: "橙子", value: "orange" },
        ]}
        placeholder="部分选项禁用"
      />
    </div>
  );
}
