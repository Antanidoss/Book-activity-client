import { Button, Form, Input, InputNumber, message, Modal } from "antd";
import React, { useState } from "react";
import { PropsType } from "./UpdateActiveBookContainer";
import {
    EditOutlined
} from "@ant-design/icons";
import ResizableButton from "../../../common/ResizableButton";

const UpdateActiveBook: React.FC<PropsType> = (props) => {
    type UpdateActiveBookType = {
        numberPagesRead: number
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [numberPagesRead, setNumberPagesRead] = useState(props.numberPagesRead);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (updateActiveBook: UpdateActiveBookType) => {
        props.updateActiveBook(props.activeBookId, updateActiveBook.numberPagesRead)
            .then(message.success("The active book has been successfully updated", 6));

        setNumberPagesRead(updateActiveBook.numberPagesRead);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return <>
        <ResizableButton style={{marginLeft: "50px"}} onClick={showModal} shape="round" type="primary" icon={React.createElement(EditOutlined)} titleOnResize={"Edit"}/>
        <Modal title="Add active book" open={isModalVisible} onCancel={handleCancel}
            footer={[
                <Button key="submit" type="primary" htmlType="submit">
                    Submit
                </Button>,
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>
            ]}>
            <Form id="updateActiveBookForm" onFinish={handleOk}>
                <Form.Item
                    label="Number of pages read"
                    name="numberPagesRead"
                    rules={[{ required: true, message: "Please input number pages read!" }]}>
                    <Input size="small" type="number" defaultValue={numberPagesRead} min={0} max={props.totalNumberPages} suffix={"from " + props.totalNumberPages} />
                    
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default UpdateActiveBook;