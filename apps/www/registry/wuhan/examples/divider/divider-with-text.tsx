import { Divider } from "@/registry/wuhan/composed/divider/divider";

export default function DividerWithText() {
  return (
    <div className="space-y-8 p-8">
      {/* 文本居中 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          文本居中
        </h3>
        <Divider>默认居中</Divider>
        <Divider textAlign="center">明确居中</Divider>
      </div>

      {/* 文本左对齐 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          文本左对齐
        </h3>
        <Divider textAlign="left">左对齐文本</Divider>
        <Divider textAlign="left" variant="dashed">
          左对齐虚线
        </Divider>
      </div>

      {/* 文本右对齐 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          文本右对齐
        </h3>
        <Divider textAlign="right">右对齐文本</Divider>
        <Divider textAlign="right" variant="dashed">
          右对齐虚线
        </Divider>
      </div>
    </div>
  );
}
