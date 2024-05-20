import React, { useState } from 'react';
import {
    PushpinOutlined
} from "@ant-design/icons";
import { Button, Form, message, Modal, ColorPicker, Row, UploadFile } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Color } from 'antd/es/color-picker';
import { UploadChangeParam } from 'antd/lib/upload';
import { bookNoteApi, ocrApi } from '../../../../../api';
import ResizableButton from '../../../../common/ResizableButton';
import UploadImage from '../../../../common/UploadImage';

const AddBookNote: React.FC<{ activeBookId: string }> = ({ activeBookId }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#FFFFFF");
    const [selectedTextColor, setSelectedTextColor] = useState("#000000");
    const [form] = Form.useForm();
    const [addNoteButtonLoading, setAddNoteButtonLoading] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    type AddBookNoteType = {
        note: string,
    }

    const handleSubmit = (addBookNote: AddBookNoteType) => {
        setAddNoteButtonLoading(true);

        bookNoteApi.addBookNote(activeBookId, addBookNote.note, selectedColor, selectedTextColor).then(isSuccess => {
            if (isSuccess) {
                setIsModalVisible(false);
                message.success("Book note has been successfully added", 6);
            } else {
                message.success("Failed to add note. Try again", 6);
            }

            setAddNoteButtonLoading(false);
        });
    }

    const onSelectColor = (color: Color) => {
        setSelectedColor(color.toHexString());
    }

    const onSelectTextColor = (color: Color) => {
        setSelectedTextColor(color.toHexString());
    }

    const onSelectImage = (fileInfo: UploadChangeParam<UploadFile>) => {
        ocrApi.getTextOnImage(fileInfo).then(d => {
            if (d.success) {
                form.setFieldValue("note", d.result);
            }
        })
    }

    return (
        <>
            <ResizableButton icon={React.createElement(PushpinOutlined)} onClick={showModal} shape="round" titleOnResize="Add note" type="primary" />
            <Modal title="Add book note" open={isModalVisible} onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="primary" htmlType="submit" loading={addNoteButtonLoading} onClick={() => {
                        form.validateFields().then((value) => {
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
                <Form id="addBookNoteForm" form={form} initialValues={{color: selectedColor, textColor: selectedTextColor}}>
                    <Row>
                        <Form.Item
                            label="Note color"
                            name="color">
                            <ColorPicker onChangeComplete={onSelectColor} />
                        </Form.Item>
                        <Form.Item
                            style={{marginLeft: "30px"}}
                            label="Text color"
                            name="textColor">
                            <ColorPicker onChangeComplete={onSelectTextColor} />
                        </Form.Item>
                        <UploadImage showUploadImage={false} fieldName="image" style={{ marginLeft: "50px" }} onChange={onSelectImage} />
                    </Row>
                    <Form.Item
                        label="Note"
                        name="note">
                        <TextArea style={{ backgroundColor: selectedColor, color: selectedTextColor, maxHeight: "700px" }} autoSize />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddBookNote;