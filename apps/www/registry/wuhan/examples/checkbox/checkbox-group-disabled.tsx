import { CheckboxGroup } from "@/registry/wuhan/composed/checkbox/checkbox";

export default function CheckboxGroupDisabled() {
  return (
    <div className="flex flex-col gap-6">
      <CheckboxGroup
        disabled
        defaultValue={["option1"]}
        options={[
          { label: "选项 1", value: "option1" },
          { label: "选项 2", value: "option2" },
          { label: "选项 3", value: "option3" },
        ]}
      />

      <CheckboxGroup
        defaultValue={["option1"]}
        options={[
          { label: "正常选项", value: "option1" },
          { label: "禁用选项", value: "option2", disabled: true },
          { label: "正常选项", value: "option3" },
        ]}
      />
    </div>
  );
}
