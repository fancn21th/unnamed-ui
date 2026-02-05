import { BlockSelect } from "@/registry/wuhan/composed/block-select/block-select";
import { Star } from "lucide-react";

export default function BlockSelectWithIcon() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-sm font-medium mb-2">前缀 Icon</div>
        <BlockSelect
          iconPosition="prefix"
          icon={<Star className="h-4 w-4" />}
          options={[
            { label: "选项 1", value: "option1" },
            { label: "选项 2", value: "option2" },
            { label: "选项 3", value: "option3" },
          ]}
          placeholder="选择选项"
        />
      </div>

      <div>
        <div className="text-sm font-medium mb-2">后缀 Icon（默认）</div>
        <BlockSelect
          iconPosition="suffix"
          options={[
            { label: "选项 1", value: "option1" },
            { label: "选项 2", value: "option2" },
            { label: "选项 3", value: "option3" },
          ]}
          placeholder="选择选项"
        />
      </div>
    </div>
  );
}
