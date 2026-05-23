import { Form, Input, Checkbox, Button, Card, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { ROUT_PAGE_NAME } from 'common';
import { userApi } from 'api';
import { setCurrentUser, userSelectors, useAppDispatch, useAppSelector } from 'store';
import { FormErrorMessage } from 'commonComponents';
import { LOGIN_FIELD_NAMES } from './constants';

const { Paragraph, Title } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [form] = useForm();

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const isAuthenticated = useAppSelector(userSelectors.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      return navigate(ROUT_PAGE_NAME.ALL_BOOKS);
    }
  }, [isAuthenticated]);

  type LoginDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
  };

  const onFinish = (values: LoginDataType) => {
    setLoading(true);

    userApi.auth(values.email, values.password, values.rememberMe).then((response) => {
      if (response.success) {
        dispatch(
          setCurrentUser({
            userName: response.result.userName,
            id: response.result.userId,
            avatarImage: response.result.avatarImage,
            roles: response.result.roles,
          }),
        );
        return navigate(ROUT_PAGE_NAME.ALL_BOOKS);
      }

      setFormError(response.errorMessage);
      setLoading(false);
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
      <Card className="page-card" style={{ width: '100%', maxWidth: 560, padding: 12 }}>
        <Title level={2} style={{ marginTop: 0, marginBottom: 8 }}>
          Welcome back
        </Title>
        <Paragraph style={{ marginBottom: 28 }}>
          Sign in to keep your shelves, notes, subscriptions, and reading statistics in sync.
        </Paragraph>

        <Form
          initialValues={{ [LOGIN_FIELD_NAMES.REMEMBER_ME]: true }}
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <FormErrorMessage errorMessage={formError} />

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

          <Form.Item
            name={LOGIN_FIELD_NAMES.REMEMBER_ME}
            valuePropName="checked"
            style={{ marginBottom: 18 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: 12 }}>
            <Button type="primary" htmlType="submit" shape="round" loading={loading} block size="large">
              Login
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
            <Link to={ROUT_PAGE_NAME.USER_REGISTRATION}>Create an account</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
