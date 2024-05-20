import { Button, Form, Modal, Rate } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import {
    CommentOutlined
} from "@ant-design/icons";
import ResizableButton from "../../common/ResizableButton";
import { useNavigate } from "react-router-dom";
import { bookOpinionApi } from "../../../api/bookOpinions";
import { useSelector } from "react-redux";
import { getIsAuthenticated } from "../../../redux/users/selectors";

const AddBookOpinion: React.FC<{ bookId: string, resizableButton?: boolean }> = ({ bookId, resizableButton }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(getIsAuthenticated)

    type AddOpinionType = {
        grade: number,
        description: string
    }

    const handleSubmit = (addOpinion: AddOpinionType) => {
        bookOpinionApi.update(bookId, addOpinion.grade, addOpinion.description).then(result => {
            //TODO:
        })

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        if (!isAuthenticated) {
            navigate("/login");
        }

        setIsModalVisible(true);
    };

    return (
        <>
            {
                resizableButton || resizableButton === undefined
                    ? <ResizableButton style={{ marginLeft: "50px" }} icon={React.createElement(CommentOutlined)} shape="round" type="primary" onClick={showModal} titleOnResize="Add review" />
                    : <Button style={{ marginLeft: "50px" }} icon={React.createElement(CommentOutlined)} shape="round" type="primary" onClick={showModal}>Add review</Button>
            }
            <Modal title="Add book opinion" open={isModalVisible} onCancel={handleCancel}
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
                <Form id="addBookOpinionForm" form={form}>
                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: "Please input number pages read!" }]}>
                        <TextArea placeholder="Description" rows={10} autoSize style={{maxHeight: "700px"}} />
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