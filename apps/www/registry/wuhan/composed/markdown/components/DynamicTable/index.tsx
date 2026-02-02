import { Table } from "antd";

export const DynamicTable: React.FC = () => {
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
    },
  ];

  const dataSource = [
    {
      key: "1",
      name: "张三",
      age: 28,
      address: "北京市",
    },
    {
      key: "2",
      name: "李四",
      age: 32,
      address: "上海市",
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default DynamicTable;
