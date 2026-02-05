import { Checkbox } from "@/registry/wuhan/composed/checkbox/checkbox";

export default function CheckboxCustomStyle() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        classNames={{
          wrapper: "p-2 bg-blue-50 rounded",
          label: "text-blue-600 font-semibold",
        }}
        defaultChecked
      >
        自定义样式
      </Checkbox>

      <Checkbox
        styles={{
          wrapper: {
            padding: "8px",
            backgroundColor: "#f0f9ff",
            borderRadius: "4px",
          },
          label: { color: "#0ea5e9", fontWeight: "600" },
        }}
        defaultChecked
      >
        自定义内联样式
      </Checkbox>
    </div>
  );
}
