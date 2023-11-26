import { Button, Form, message, Modal, Rate } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { PropsType } from "./AddBookOpinionContainer";
import {
    CommentOutlined
} from "@ant-design/icons";
import ResizableButton from "../../../common/ResizableButton";

const AddBookOpinion: React.FC<PropsType> = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    type AddOpinionType = {
        grade: number,
        description: string
    }

    const handleSubmit = (addOpinion: AddOpinionType) => {
        props.addBookOpinion(props.bookId, addOpinion.grade, addOpinion.description, props.userId)
            .then(isSuccess => {
                if (isSuccess) {
                    message.success("Review added", 6);
                    props.onAddedOpinion?.();
                }
                else {
                    message.error("Failed to add review. Try again", 6)
                }
            })

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <>
            {
                props.resizableButton || props.resizableButton === undefined
                    ? <ResizableButton style={{ marginLeft: "50px" }} icon={React.createElement(CommentOutlined)} shape="round" type="primary" onClick={showModal} titleOnResize="Add review" />
                    : <Button style={{ marginLeft: "50px" }} icon={React.createElement(CommentOutlined)} shape="round" type="primary" onClick={showModal}>Add review</Button>
            }
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