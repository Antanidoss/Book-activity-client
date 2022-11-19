import { Button, Form, Input, InputNumber, message, Modal } from "antd";
import React, { useState } from "react";
import { PropsType } from "./UpdateActiveBookContainer";
import {
    EditOutlined
} from "@ant-design/icons";
import ResizableButton from "../../common/ResizableButton";

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
        <ResizableButton onClick={showModal} shape="round" type="primary" icon={React.createElement(EditOutlined)} titleOnResize={"Edit"}/>
        <Modal title="Add active book" visible={isModalVisible} onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>
            ]}>
            <Form id="updateActiveBookForm" onFinish={handleOk}>
                <Form.Item
                    label="Number of pages read"
                    name="numberPagesRead"
                    rules={[{ required: true, message: "Please input number pages read!" }]}>
                    <InputNumber defaultValue={numberPagesRead} min={0} max={props.totalNumberPages} />
                </Form.Item>
                <Button key="submit" type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </Modal>
    </>
}

export default UpdateActiveBook;