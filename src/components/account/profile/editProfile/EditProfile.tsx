import { Button, Col, Form, Input, Row, message } from 'antd';
import { EDIT_PROFILE_FIELD_NAMES } from './constants';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { isBadStatusCode, userApi } from 'api';
import TextArea from 'antd/es/input/TextArea';

const EditProfile: React.FC<{ userName: string; description?: string }> = ({
  userName,
  description,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form] = useForm();

  const initialValues = [
    {
      [EDIT_PROFILE_FIELD_NAMES.USER_NAME]: userName,
    },
    {
      [EDIT_PROFILE_FIELD_NAMES.DESCRIPTION]: description,
    },
  ];

  type EditProfileValues = {
    userName: string;
    description: string;
  };

  const onFinish = (values: EditProfileValues) => {
    userApi.updateUser(values.userName, values.description).then((res) => {
      if (!isBadStatusCode(res.status)) {
        message.success('Profile changes have been saved successfully', 6);
      } else {
        message.error('The profile could not be changed', 6);
      }

      setLoading(false);
    });
  };

  return (
    <>
      <Col hidden={showForm}>
        <Button
          style={{ width: '150px' }}
          shape="round"
          type="primary"
          onClick={() => setShowForm(true)}
        >
          Edit profile
        </Button>
      </Col>

      <Form
        initialValues={{ initialValues }}
        labelCol={{ span: 5 }}
        hidden={!showForm}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Name"
          name={EDIT_PROFILE_FIELD_NAMES.USER_NAME}
          rules={[{ required: true, message: 'Please input your name!' }]}
          wrapperCol={{ span: 20 }}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="About me"
          name={EDIT_PROFILE_FIELD_NAMES.DESCRIPTION}
          wrapperCol={{ span: 20 }}
        >
          <TextArea maxLength={100} />
        </Form.Item>

        <Row>
          <Form.Item wrapperCol={{ span: 12 }}>
            <Button type="primary" htmlType="submit" shape="round" loading={loading}>
              Save
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 2, span: 12 }}>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default EditProfile;
