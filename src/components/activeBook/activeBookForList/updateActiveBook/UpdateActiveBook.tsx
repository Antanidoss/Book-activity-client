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
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleSubmit = (updateActiveBook: UpdateActiveBookType) => {
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
            <Form id="updateActiveBookForm" form={form} initialValues={{numberPagesRead: numberPagesRead}}>
                <Form.Item
                    label="Number of pages read"
                    name="numberPagesRead"
                    rules={[{ required: true, message: "Please input number pages read!" }]}>
                    <Input size="small" type="number" min={0} max={props.totalNumberPages} suffix={"from " + props.totalNumberPages} />
                    
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default UpdateActiveBook;