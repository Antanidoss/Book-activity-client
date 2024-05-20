import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import {
    EditOutlined
} from "@ant-design/icons";
import ResizableButton from "../../../../common/ResizableButton";
import { activeBookApi } from "../../../../../api";

const UpdateActiveBook: React.FC<{ totalNumberPages: number, numberPagesRead: number, activeBookId: string, progressPercent: number }> = (props) => {
    type UpdateActiveBookType = {
        numberPagesRead: number
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [numberPagesRead, setNumberPagesRead] = useState(props.numberPagesRead);
    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleSubmit = (updateActiveBook: UpdateActiveBookType) => {
        if (!validateForm()) return;

        activeBookApi.updateActiveBook(props.activeBookId, updateActiveBook.numberPagesRead)
            .then(message.success("The active book has been successfully updated", 6));

        setNumberPagesRead(updateActiveBook.numberPagesRead);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const validateForm = () => {
        const numberPagesRead = form.getFieldValue("numberPagesRead") ?? 0;
        let success = true
    
        if (numberPagesRead < props.numberPagesRead) {
          form.setFields([{ name: "numberPagesRead", errors: ["Can't reduce the number of pages read"] }]);
          setDisabled(true);
          success = false;
        }
    
        if (disabled && !success) {
          setDisabled(false);
        }
    
        return success;
      }

    return <>
        <ResizableButton
            style={{marginLeft: "50px"}}
            onClick={showModal}
            shape="round"
            type="primary"
            icon={React.createElement(EditOutlined)}
            titleOnResize={"Edit"}
            disable={props.progressPercent === 100} />

        <Modal title="Add active book" open={isModalVisible} onCancel={handleCancel}
            footer={[
                <Button key="submit" type="primary" htmlType="submit" disabled={disabled} onClick={() => {
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
            <Form id="updateActiveBookForm" form={form} initialValues={{numberPagesRead: numberPagesRead}} onFieldsChange={validateForm}>
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