import React, { useState } from 'react';
import { Button, Form, Modal, Input, message } from 'antd';
import { PropsType } from './AddActiveBookContainer';

const AddActiveBook: React.FC<PropsType> = (props) => {
  type AddActiveBookType = {
    totalNumberPages: number,
    numberPagesRead: number
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = (addActiveBookType: AddActiveBookType) => {
    props.addActiveBook(addActiveBookType.numberPagesRead, addActiveBookType.totalNumberPages, props.bookId)
      .then(message.success("The book has been successfully added to active", 6))
      .then(_ => props.setActiveBookStatus(props.bookId))
      
      setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return <>
    <Button shape="round" type="primary" onClick={showModal}>Make active</Button>
    <Modal title="Add active book" visible={isModalVisible} onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>
      ]}>
      <Form id="addActiveBookForm" onFinish={handleSubmit}>
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
        <Button key="submit" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  </>
}

export default AddActiveBook;