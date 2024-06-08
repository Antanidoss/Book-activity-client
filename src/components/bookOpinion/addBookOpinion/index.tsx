import { Button, Col, Form, Modal, Rate } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import {
    CommentOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { bookOpinionApi, isBadStatusCode } from "api";
import { useSelector } from "react-redux";
import { userSelectors } from "reduxStore";
import { ROUT_PAGE_NAME } from "common";

type Props = {
    bookId: string,
    onAddBookOpinion?: (grade: number, description: string) => void
}

const AddBookOpinion: React.FC<Props> = ({ bookId, onAddBookOpinion }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(userSelectors.isAuthenticated)

    type AddOpinionType = {
        grade: number,
        description: string
    }

    const handleSubmit = (addOpinion: AddOpinionType) => {
        bookOpinionApi.update(bookId, addOpinion.grade, addOpinion.description).then(res => {
            if (!isBadStatusCode(res.status)) {
                onAddBookOpinion?.(addOpinion.grade, addOpinion.description);
                setIsModalVisible(false);
            }
        })

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        if (!isAuthenticated) {
            navigate(ROUT_PAGE_NAME.USER_LOGIN);
        }

        setIsModalVisible(true);
    };

    return (
        <>
            <Col onClick={showModal}><CommentOutlined /> Add review</Col>
            
            <Modal title="Add book opinion" open={isModalVisible} onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="primary" htmlType="submit" onClick={() => {
                        form.validateFields()
                            .then((value) => {
                                handleSubmit(value);
                                form.resetFields();
                            })
                    }}>
                        Submit
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>
                ]}>
                <Form id="addBookOpinionForm" form={form}>
                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: "Please input number pages read!" }]}>
                        <TextArea placeholder="Description" rows={10} autoSize style={{maxHeight: "700px"}} />
                    </Form.Item>
                    <Form.Item
                        label="Grade"
                        name="grade">
                        <Rate allowHalf />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddBookOpinion;