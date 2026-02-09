import { Divider } from "@/registry/wuhan/composed/divider/divider";

export default function DividerVariants() {
  return (
    <div className="space-y-8 p-8">
      {/* 实线 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          实线（Solid）
        </h3>
        <Divider variant="solid" />
        <Divider variant="solid">带文本</Divider>
      </div>

      {/* 虚线 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          虚线（Dashed）
        </h3>
        <Divider variant="dashed" />
        <Divider variant="dashed">带文本</Divider>
      </div>
    </div>
  );
}
