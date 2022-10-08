import { Button, Form, message, Modal, Rate } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { PropsType } from "./AddBookOpinionContainer";

const AddBookOpinion: React.FC<PropsType> = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    type AddOpinionType = {
        grade: number,
        description: string
    }

    const handleOk = (addOpinion: AddOpinionType) => {
        props.updateRating(props.bookRatingId, addOpinion.grade, addOpinion.description)
            .then(isSuccess => {
                return isSuccess ? message.success("Review added.", 6) : message.success("Failed to add review. Try again.", 6)
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
            <Button shape="round" type="primary" onClick={showModal}>Add a review</Button>
            <Modal title="Add active book" visible={isModalVisible} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>
                ]}>
                <Form id="updateActiveBookForm" onFinish={handleOk}>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please input number pages read!" }]}>
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Grade"
                        name="grade">
                        <Rate allowHalf />
                    </Form.Item>
                    <Button key="submit" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </Modal>
        </>
    )
}

export default AddBookOpinion;