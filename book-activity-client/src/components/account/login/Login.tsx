import { Form, Input, Checkbox, Button } from 'antd';
import React, { useEffect } from 'react';
import { PropsType } from './LoginContainer';
import { useNavigate } from "react-router-dom";

const Login: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.isAuthenticated) {
            return navigate("/books");
        }
    }, [props.isAuthenticated]);

    type LoginDataType = {
        email: string,
        password: string,
        rememberMe: boolean
    }

    const onFinish = (values: LoginDataType) => {
        props.auth(values.email, values.password, values.rememberMe);
    };

    return (
        <Form
            initialValues={{ rememberMe: true }}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 8 }}
            style={{ marginTop: "15%" }}
            onFinish={onFinish}>
            <Form.Item
                wrapperCol={{ offset: 10, span: 16, }}>
                <div style={{ fontFamily: "Pacifico, cursive", fontSize: "25px" }}>Authorization</div>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="rememberMe"
                valuePropName="checked"
                wrapperCol={{ offset: 10, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{ offset: 9, span: 3 }}>
                <Button type="primary" htmlType="submit" shape="round" block>
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Login;