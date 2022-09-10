import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { PropsType } from "./UpdateActiveBookContainer";

const UpdateActiveBook: React.FC<PropsType> = (props) => {
    type UpdateActiveBookType = {
        numberPagesRead: number
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [numberPagesRead, setNumberPagesRead] = useState(props.numberPagesRead);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (updateActiveBookType: UpdateActiveBookType) => {
        props.updateActiveBook(props.activeBookId, updateActiveBookType.numberPagesRead)
            .then(message.success("The active book has been successfully updated", 6))

        setNumberPagesRead(updateActiveBookType.numberPagesRead)
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return <>
        <Button onClick={showModal} shape="round" type="primary">Edit</Button>
        <Modal title="Add active book" visible={isModalVisible} onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>
            ]}>
            <Form id="updateActiveBookForm" onFinish={handleOk}>
                <Form.Item
                    label="Total number pages"
                    name="numberPagesRead"
                    rules={[{ required: true, message: "Please input number pages read!" }]}>
                    <Input value={numberPagesRead} />
                </Form.Item>
                <Button key="submit" type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </Modal>
    </>
}

export default UpdateActiveBook;