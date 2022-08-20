import React, { useState } from 'react';
import { Button, Form, Modal, Input } from 'antd';

const AddActiveBook: React.FC<PropsType> = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return <>
        <Button type="primary" onClick={showModal}>Make active</Button>
        <Modal title="Add active book" visible={isModalVisible} onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Submit
            </Button>,
          ]}>
            <Form>
            <Form.Item
                label="Total number pages"
                name="totalNumberPages"
                rules={[{ required: true, message: "Please input total number pages!" }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Number pages read"
                name="numberPagesRead"
                rules={[{ required: true, message: "Please input number pages read!" }]}>
                <Input />
            </Form.Item>
            </Form>
        </Modal>
    </>
}

export type PropsType = {
  bookId: string,
}

export default AddActiveBook;