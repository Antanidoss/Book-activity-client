import { Button, Col, Form, Input, message, Row } from 'antd';
import React from 'react';
import { PropsType } from './AddAuthorContainer';

const AddAuthor: React.FC<PropsType> = (props) => {
    type AddAuthorType = {
        firstName: string,
        surname: string,
        patronymic: string
    }

    const handleSubmit = (addAuthorType: AddAuthorType) => {
        props.addAuthor(addAuthorType.firstName, addAuthorType.surname, addAuthorType.patronymic)
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
                    <Form.Item
                        label="Patronymic"
                        name="patronymic"
                        rules={[{ required: true, message: "Please input patronymic!" }]}
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