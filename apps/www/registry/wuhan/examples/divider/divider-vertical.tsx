import { Divider } from "@/registry/wuhan/composed/divider/divider";

export default function DividerVertical() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-0" style={{ height: "120px" }}>
        <div className="flex-1 text-center">
          <p className="text-sm text-[var(--text-primary)]">第一部分</p>
          <p className="text-xs text-[var(--text-secondary)] mt-2">
            左侧内容区域
          </p>
        </div>

        <Divider orientation="vertical" />

        <div className="flex-1 text-center">
          <p className="text-sm text-[var(--text-primary)]">第二部分</p>
          <p className="text-xs text-[var(--text-secondary)] mt-2">
            中间内容区域
          </p>
        </div>

        <Divider orientation="vertical" variant="dashed" />

        <div className="flex-1 text-center">
          <p className="text-sm text-[var(--text-primary)]">第三部分</p>
          <p className="text-xs text-[var(--text-secondary)] mt-2">
            右侧内容区域
          </p>
        </div>
      </div>
    </div>
  );
}
