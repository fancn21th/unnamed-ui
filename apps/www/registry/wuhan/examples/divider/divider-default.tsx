import { Divider } from "@/registry/wuhan/composed/divider/divider";

export default function DividerDefault() {
  return (
    <div className="space-y-4 p-8">
      <p className="text-[var(--text-primary)]">默认水平分割线</p>
      <Divider />
      <p className="text-[var(--text-primary)]">内容下方</p>
    </div>
  );
}
