import React, { useState } from 'react';
import ResizableButton from '../../../common/ResizableButton';
import { PropsType } from './AddBookNoteContainer';
import {
    PushpinOutlined
} from "@ant-design/icons";
import { Button, Form, message, Modal, ColorPicker, Row, UploadFile } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Color } from 'antd/es/color-picker';
import UploadImage from '../../../common/UploadImage';
import { UploadChangeParam } from 'antd/lib/upload';
import { ocrApi } from '../../../../api/ocrApi';

const AddBookNote: React.FC<PropsType> = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState("white");
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
        color: string
    }

    const handleSubmit = (addBookNote: AddBookNoteType) => {
        setAddNoteButtonLoading(true);

        props.addBookNote(props.activeBookId, addBookNote.note, addBookNote.color).then(isSuccess => {
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
                <Form id="addBookNoteForm" form={form}>
                    <Row>
                        <Form.Item
                            label="Note color"
                            name="color">
                            <ColorPicker value="#FFFFFF" onChangeComplete={onSelectColor} />
                        </Form.Item>
                        <UploadImage showUploadImage={false} fieldName="image" style={{ margin: "0 auto" }} onChange={onSelectImage} />
                    </Row>
                    <Form.Item
                        label="Note"
                        name="note">
                        <TextArea style={{ backgroundColor: selectedColor }} autoSize />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddBookNote;