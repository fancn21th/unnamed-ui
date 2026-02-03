import { Skeleton } from "antd";

export const TableSkeleton = () => {
  return (
    <Skeleton.Node
      active
      style={{ minWidth: "160px", maxWidth: "690px", width: "690px" }}
    />
  );
};

export default TableSkeleton;
