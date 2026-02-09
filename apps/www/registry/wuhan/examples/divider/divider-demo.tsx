import { Divider } from "@/registry/wuhan/composed/divider/divider";

export default function DividerDemo() {
  return (
    <div className="space-y-8 p-8">
      {/* 水平分割线 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          水平分割线
        </h3>
        <div className="space-y-4">
          <p className="text-sm text-[var(--text-secondary)]">实线</p>
          <Divider />
          <p className="text-sm text-[var(--text-secondary)]">虚线</p>
          <Divider variant="dashed" />
        </div>
      </div>

      {/* 带文本的分割线 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          带文本的分割线
        </h3>
        <div className="space-y-4">
          <Divider>默认居中</Divider>
          <Divider textAlign="left">左对齐</Divider>
          <Divider textAlign="right">右对齐</Divider>
        </div>
      </div>

      {/* 垂直分割线 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          垂直分割线
        </h3>
        <div className="flex items-center" style={{ height: "100px" }}>
          <span className="text-sm text-[var(--text-secondary)]">左侧内容</span>
          <Divider orientation="vertical" />
          <span className="text-sm text-[var(--text-secondary)]">中间内容</span>
          <Divider orientation="vertical" variant="dashed" />
          <span className="text-sm text-[var(--text-secondary)]">右侧内容</span>
        </div>
      </div>

      {/* 自定义样式 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          自定义颜色和粗细
        </h3>
        <div className="space-y-4">
          <Divider color="var(--border-brand)" thickness="2px">
            品牌色粗线
          </Divider>
          <Divider color="var(--border-error)" thickness="3px" variant="dashed">
            错误色虚线
          </Divider>
        </div>
      </div>
    </div>
  );
}
