import { Button, Checkbox, Form, Input, UploadFile } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "../../common/UploadImage";
import { PropsType } from "./RegistrationContainer";

const Registration: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.isAuthenticated) {
            return navigate("/books");
        }
    }, [props.isAuthenticated]);

    type RegisterDataType = {
        userName: string,
        email: string,
        password: string,
        avatarImage: UploadChangeParam<UploadFile>
    }

    const onFinish = (values: RegisterDataType) => {
        props.registration(values.userName, values.email, values.password, values.avatarImage);
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
                <div style={{ fontFamily: "Pacifico, cursive", fontSize: "30px" }}>Registration</div>
            </Form.Item>

            <Form.Item
                label="Name"
                name="userName"
                rules={[{ required: true, message: "Please input your name!" }]}>
                <Input />
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

            <UploadImage fieldLabel="Avatar image" fieldName="avatarImage" rules={undefined} uploadListType="picture-card" />

            <Form.Item
                wrapperCol={{ offset: 10, span: 4 }}>
                <Button type="primary" htmlType="submit" shape="round" block>
                    Register
                </Button>
            </Form.Item>
            
            <Form.Item style={{textAlign: "center"}} wrapperCol={{ span: 24 }}>
                <Link to="/login">Login</Link>
            </Form.Item>
        </Form>
    )
}

export default Registration;