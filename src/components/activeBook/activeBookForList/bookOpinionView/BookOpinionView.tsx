import { Button, Form, Modal, Rate } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { PropsType } from "./BookOpinionViewContainer";
import {
    CommentOutlined
} from "@ant-design/icons";
import ResizableButton from "../../../common/ResizableButton";

const BookOpinionView: React.FC<PropsType> = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <>
            <ResizableButton style={{marginLeft: "50px"}} icon={React.createElement(CommentOutlined)} shape="round" type="primary" onClick={showModal} titleOnResize="Look review" />
            <Modal title="Add active book" open={isModalVisible} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>
                ]}>
                <Form initialValues={{description: props.bookOpinion?.description, grade: props.bookOpinion?.grade }}>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please input number pages read!" }]}>
                        <TextArea rows={10} disabled={true} />
                    </Form.Item>
                    <Form.Item
                        label="Grade"
                        name="grade">
                        <Rate allowHalf disabled={true} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default BookOpinionView;