import React, { useState } from 'react';
import ResizableButton from '../../../common/ResizableButton';
import { PropsType } from './AddBookNoteContainer';
import {
    PushpinOutlined
} from "@ant-design/icons";
import { Button, Form, message, Modal, Select } from 'antd';
import { NoteColor, toHexadecimal } from '../../../../types/bookNoteType';
import TextArea from 'antd/lib/input/TextArea';

const AddBookNote: React.FC<PropsType> = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState("white");

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    type AddBookNoteType = {
        note: string,
        color: NoteColor
    }

    const handleOk = (addBookNote: AddBookNoteType) => {
        props.addBookNote(props.activeBookId, addBookNote.note, addBookNote.color)
            .then(message.success("Book note has been successfully added", 6))

        setIsModalVisible(false);
    }

    const onSelectColor = (color: number) => {
        setSelectedColor(toHexadecimal(color));
    }

    return (
        <>
            <ResizableButton icon={React.createElement(PushpinOutlined)} onClick={showModal} shape="round" titleOnResize="Add note" type="primary" />
            <Modal title="Add book note" visible={isModalVisible} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>
                ]}>
                <Form id="addBookNoteForm" onFinish={handleOk}>
                    <Form.Item
                        label="Note color"
                        name="color">
                        <Select options={[
                            {
                                value: NoteColor.White,
                                label: NoteColor[NoteColor.White],
                            },
                            {
                                value: NoteColor.Blue,
                                label: NoteColor[NoteColor.Blue],
                            }
                        ]} onSelect={onSelectColor} />
                    </Form.Item>
                    <Form.Item
                        label="Note"
                        name="note">
                            <TextArea style={{backgroundColor: selectedColor}} />
                        </Form.Item>
                    <Button key="submit" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </Modal>
        </>
    )
}

export default AddBookNote;