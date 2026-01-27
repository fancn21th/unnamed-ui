import { Table } from "antd";
import type { FilterTableProps } from "../../types";

export function FilterTable(props: FilterTableProps) {
  const { dataSource } = props;

  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
    },
  ];
  return <Table dataSource={dataSource} columns={columns} />;
}
