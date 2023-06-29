import { Form, Input, Checkbox, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { PropsType } from './LoginContainer';
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
        props.auth(values.email, values.password, values.rememberMe).then(isSuccess => {
            if (isSuccess) {
                return navigate("/books");
            }

            setLoading(false);
        });

        setLoading(true);
    };

    return (
        <Form
            initialValues={{ rememberMe: true }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            style={{ marginTop: "15%" }}
            onFinish={onFinish}>
            <Form.Item
                wrapperCol={{ offset: 11, span: 10, }}>
                <div style={{ fontFamily: "Pacifico, cursive", fontSize: "30px" }}>Authorization</div>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}>
                <Input type="email" />
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
                label="Remember me"
                labelCol={{sm: {offset: 11}}}>
                <Checkbox></Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10, span: 4 }}>
                <Button type="primary" htmlType="submit" shape="round" loading={loading} block>
                    Login
                </Button>
            </Form.Item>

            <Form.Item style={{textAlign: "center"}} wrapperCol={{ span: 24 }}>
                <Link to="/registration">Registration</Link>
            </Form.Item>
        </Form>
    )
}

export default Login;