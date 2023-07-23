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

    type AddOpinionType = {
        grade: number,
        description: string
    }

    const handleOk = (addOpinion: AddOpinionType) => {
        props.updateRating(props.bookRatingId, addOpinion.grade, addOpinion.description, props.userId)
            .then(isSuccess => {
                return isSuccess ? message.success("Review added.", 6) : message.error("Failed to add review. Try again.", 6)
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
            <ResizableButton style={{marginLeft: "50px"}} icon={React.createElement(CommentOutlined)} shape="round" type="primary" onClick={showModal} titleOnResize="Add review" />
            <Modal title="Add active book" open={isModalVisible} onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="primary" htmlType="submit">
                        Submit
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>
                ]}>
                <Form id="addBookOpinionForm" onFinish={handleOk}>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please input number pages read!" }]}>
                        <TextArea rows={10} />
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