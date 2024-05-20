import { Button, Col, Form, Input, message } from 'antd';
import React from 'react';
import { authorApi } from '../../../api';

const AddAuthor: React.FC = () => {
    type AddAuthorType = {
        firstName: string,
        surname: string,
    }

    const handleSubmit = (addAuthorType: AddAuthorType) => {
        authorApi.addAuthor(addAuthorType.firstName, addAuthorType.surname)
            .then(isSuccess => {
                isSuccess ? message.success("Author added") : message.error("Failed to add author. Try again.");
            });
    };

    return (
        <Col span={24}>
            <Col span={8} style={{ margin: "0px auto" }}>
                <Form onFinish={handleSubmit}>
                    <Form.Item
                        label="First name"
                        name="firstName"
                        rules={[{ required: true, message: "Please input first name!" }]}
                        style={{ marginLeft: "70px" }}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Surname"
                        name="surname"
                        rules={[{ required: true, message: "Please input surname!" }]}
                        style={{ marginLeft: "70px" }}>
                        <Input />
                    </Form.Item>
                    <Button style={{ marginTop: "50px", marginLeft: "50%" }} key="submit" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Col>
    )
}

export default AddAuthor;