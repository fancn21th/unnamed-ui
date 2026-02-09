import { Divider } from "@/registry/wuhan/composed/divider/divider";

export default function DividerCustom() {
  return (
    <div className="space-y-8 p-8">
      {/* 自定义颜色 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          自定义颜色
        </h3>
        <Divider color="var(--border-brand)">品牌色</Divider>
        <Divider color="var(--border-success)">成功色</Divider>
        <Divider color="var(--border-warning)">警告色</Divider>
        <Divider color="var(--border-error)">错误色</Divider>
      </div>

      {/* 自定义粗细 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          自定义粗细
        </h3>
        <Divider thickness="1px">1px 细线</Divider>
        <Divider thickness="2px">2px 中等</Divider>
        <Divider thickness="3px">3px 粗线</Divider>
        <Divider thickness="4px">4px 更粗</Divider>
      </div>

      {/* 组合自定义 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          组合自定义
        </h3>
        <Divider color="var(--border-brand)" thickness="2px" variant="solid">
          品牌色粗实线
        </Divider>
        <Divider color="var(--border-error)" thickness="3px" variant="dashed">
          错误色粗虚线
        </Divider>
      </div>
    </div>
  );
}
