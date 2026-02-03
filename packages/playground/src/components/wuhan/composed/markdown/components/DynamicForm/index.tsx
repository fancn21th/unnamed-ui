import { Form, Input, Button } from "antd";

export const DynamicForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="名称"
        name="name"
        rules={[{ required: true, message: "请输入名称" }]}
      >
        <Input placeholder="请输入名称" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
