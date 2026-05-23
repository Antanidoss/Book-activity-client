import { Button, Form, Input, Space, Typography, message } from 'antd';
import React from 'react';
import { authorApi } from 'api';

const { Paragraph, Title } = Typography;

const AddAuthor: React.FC = () => {
  type AddAuthorType = {
    firstName: string;
    surname: string;
  };

  const handleSubmit = (addAuthorType: AddAuthorType) => {
    authorApi.addAuthor(addAuthorType.firstName, addAuthorType.surname).then((isSuccess) => {
      isSuccess
        ? message.success('Author added')
        : message.error('Failed to add author. Try again.');
    });
  };

  return (
    <Space direction="vertical" size={20} style={{ width: '100%' }}>
      <div>
        <Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
          Add author
        </Title>
        <Paragraph style={{ marginBottom: 0 }}>
          Create new author entries so they can be attached to books in the catalogue.
        </Paragraph>
      </div>

      <Form onFinish={handleSubmit} layout="vertical" style={{ maxWidth: 520 }}>
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true, message: 'Please input first name!' }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Surname"
          name="surname"
          rules={[{ required: true, message: 'Please input surname!' }]}
        >
          <Input size="large" />
        </Form.Item>
        <Button key="submit" type="primary" htmlType="submit" size="large" shape="round">
          Submit
        </Button>
      </Form>
    </Space>
  );
};

export default AddAuthor;
