import { Button, Col, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import {
    EditOutlined
} from "@ant-design/icons";
import { activeBookApi } from "../../../../../api";
import { GetActiveBooksItem } from "../../../../../query/activeBooks/models";
import { isBadStatusCode } from "../../../../../api/instanceAxios";

const UpdateActiveBook: React.FC<{ activeBook: GetActiveBooksItem, progressPercent: number, setActiveBook: (activeBook: GetActiveBooksItem) => void }> = (props) => {
    type UpdateActiveBookType = {
        numberPagesRead: number
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [numberPagesRead, setNumberPagesRead] = useState(props.activeBook.numberPagesRead);
    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleSubmit = (updateActiveBook: UpdateActiveBookType) => {
        if (!validateForm()) return;

        activeBookApi.updateActiveBook(props.activeBook.id, updateActiveBook.numberPagesRead)
            .then(res => {
                if (!isBadStatusCode(res.status)) {
                    message.success("The active book has been successfully updated", 6)
                    setIsModalVisible(false);
                    setNumberPagesRead(updateActiveBook.numberPagesRead);
                    props.setActiveBook({ ...props.activeBook, numberPagesRead: updateActiveBook.numberPagesRead })
                }
                else {
                    message.error("The active book could not be changed", 6)
                }
            });

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const validateForm = () => {
        const numberPagesRead = form.getFieldValue("numberPagesRead") ?? 0;
        let success = true

        if (numberPagesRead < props.activeBook.numberPagesRead) {
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
        <Col onClick={showModal}>
            <EditOutlined /> Edit
        </Col>

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
            <Form id="updateActiveBookForm" form={form} initialValues={{ numberPagesRead: numberPagesRead }} onFieldsChange={validateForm}>
                <Form.Item
                    label="Number of pages read"
                    name="numberPagesRead"
                    rules={[{ required: true, message: "Please input number pages read!" }]}>
                    <Input size="small" type="number" min={0} max={props.activeBook.totalNumberPages} suffix={"from " + props.activeBook.totalNumberPages} />
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default UpdateActiveBook;