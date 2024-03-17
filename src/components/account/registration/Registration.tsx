import { Button, Col, Form, Input, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "../../common/UploadImage";
import { PropsType } from "./RegistrationContainer";
import FormErrorMessage from "../../common/FormErrorMessage";
import { ROUT_PAGE_NAME } from "../../../types/constants";

const Registration: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState("");

    type RegisterDataType = {
        userName: string,
        email: string,
        password: string,
        avatarImage: UploadChangeParam<UploadFile>
    }

    const onFinish = (values: RegisterDataType) => {
        props.registration(values.userName, values.email, values.password, values.avatarImage).then(response => {
            if (response.isSuccess) {
                return navigate(ROUT_PAGE_NAME.ALL_BOOKS);
            }

            setFormError(response.errorMessage);
            setLoading(false);
        });

        setLoading(true);
    };

    return (
        <Form
            initialValues={{ rememberMe: true }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 9 }}
            style={{ marginTop: "15%" }}
            onFinish={onFinish}>
            <Form.Item
                wrapperCol={{ offset: 11, span: 10, }}>
                <div style={{ fontFamily: "Pacifico, cursive", fontSize: "30px" }}>Registration</div>
            </Form.Item>

            <FormErrorMessage errorMessage={formError} />

            <Form.Item
                label="Name"
                name="userName"
                rules={[{ required: true, message: "Please input your name!" }]}>
                <Input />
            </Form.Item>

            <Row>
                <Col sm={12} offset={4}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please input your email!" }]}>
                        <Input type="email" style={{ width: '170%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password style={{ width: '170%' }} />
                    </Form.Item>
                </Col>
                <Col span={2}>
                    <UploadImage wrapperCol={{ offset: 10, span: 4 }} fieldName="avatarImage" uploadButtonTitle="Upload avatar" uploadListType="picture-card" />
                </Col>
            </Row>

            <Form.Item
                wrapperCol={{ offset: 10, span: 4 }}>
                <Button type="primary" htmlType="submit" shape="round" loading={loading} block>
                    Register
                </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }} wrapperCol={{ span: 24 }}>
                <Link to={ROUT_PAGE_NAME.USER_LOGIN}>Login</Link>
            </Form.Item>
        </Form>
    )
}

export default Registration;