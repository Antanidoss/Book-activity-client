import { Form, Input, Checkbox, Button } from 'antd';
import React from 'react';
import { PropsType } from './LoginContainer';

const Login: React.FC<PropsType> = (props) => {
    return (
        <Form
        initialValues={{
            rememberMe: true,
        }}
        labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 8
          }}>
             <Form.Item
                wrapperCol={{
                    offset: 10,
                    span: 16,
                }}
            >
                <div style={{fontFamily: "Pacifico, cursive", fontSize: "25px"}}>Authorization</div>
            </Form.Item>

            <Form.Item
                label="Username"
                name="username"
                rules={[{
                    required: true,
                    message: "Please input your username!"
                }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="rememberMe"
                valuePropName="checked"
                wrapperCol={{
                    offset: 10,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 9,
                    span: 3,
                }}
            >
                <Button type="primary" htmlType="submit" shape="round" block>
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Login;