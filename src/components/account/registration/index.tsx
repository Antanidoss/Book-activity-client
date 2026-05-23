import { Button, Card, Form, Input, Typography } from 'antd';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UploadImage, FormErrorMessage } from 'commonComponents';
import { userApi } from 'api';
import { ROUT_PAGE_NAME } from 'common';
import { setCurrentUser, useAppDispatch } from 'store';

const { Paragraph, Title } = Typography;

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  type RegisterDataType = {
    userName: string;
    email: string;
    password: string;
    avatarImage: UploadChangeParam<UploadFile>;
  };

  const onFinish = (values: RegisterDataType) => {
    setLoading(true);

    userApi
      .addUser(values.userName, values.email, values.password, values.avatarImage)
      .then((response) => {
        if (response.success) {
          userApi.getCurrentUser().then((res) => {
            dispatch(setCurrentUser(res.result));
          });

          navigate(ROUT_PAGE_NAME.ALL_BOOKS);
          return;
        }

        setFormError(response.errorMessage);
        setLoading(false);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
      <Card className="page-card" style={{ width: '100%', maxWidth: 720, padding: 12 }}>
        <Title level={2} style={{ marginTop: 0, marginBottom: 8 }}>
          Create your reader profile
        </Title>
        <Paragraph style={{ marginBottom: 28 }}>
          Join the app to track books, write notes, rate titles, and connect with other readers.
        </Paragraph>

        <Form layout="vertical" onFinish={onFinish}>
          <FormErrorMessage errorMessage={formError} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.4fr) minmax(220px, 0.8fr)',
              gap: 24,
              alignItems: 'start',
            }}
          >
            <div>
              <Form.Item
                label="Name"
                name="userName"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input type="email" size="large" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password size="large" />
              </Form.Item>
            </div>

            <div>
              <UploadImage
                fieldName="avatarImage"
                fieldLabel="Avatar"
                uploadButtonTitle="Upload avatar"
                uploadListType="picture-card"
              />
            </div>
          </div>

          <Form.Item style={{ marginBottom: 12 }}>
            <Button type="primary" htmlType="submit" shape="round" loading={loading} block size="large">
              Register
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
            <Link to={ROUT_PAGE_NAME.USER_LOGIN}>I already have an account</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Registration;
