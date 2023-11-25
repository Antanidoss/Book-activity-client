import { Button, Form, Modal, Rate, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { PropsType } from "./BookOpinionViewContainer";
import {
    CommentOutlined
} from "@ant-design/icons";
import ResizableButton from "../../../common/ResizableButton";

const BookOpinionView: React.FC<PropsType> = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(props.bookOpinion === undefined);

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
        if (props.bookOpinion === undefined) {
            props.getBookOpinion(props.bookRatingId, props.userId).then(_ => setLoading(false));
        }
    };

    return (
        <>
            {
                props.resizableButton || props.resizableButton === undefined
                    ? <ResizableButton style={{ marginLeft: "50px" }} icon={React.createElement(CommentOutlined)} shape="round" type="primary" onClick={showModal} titleOnResize="Look review" />
                    : <Button style={{ marginLeft: "50px" }} icon={React.createElement(CommentOutlined)} shape="round" type="primary" onClick={showModal}>Look review</Button>

            }
            <Modal title="Book opinion" open={isModalVisible} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>
                ]}>
                {
                    loading
                        ? <div style={{ textAlign: "center", marginTop: "20%" }}><Spin size="large" spinning={loading} /></div>
                        : <Form initialValues={{ description: props.bookOpinion?.description, grade: props.bookOpinion?.grade }}>
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
                }
            </Modal>
        </>
    )
}

export default BookOpinionView;