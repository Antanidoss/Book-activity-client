import { Button, Form, Modal, Rate, Typography, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookOpinionApi, isBadStatusCode } from 'api';
import { userSelectors, useAppSelector } from 'store';
import { ROUT_PAGE_NAME } from 'common';

const { Paragraph } = Typography;

type Props = {
  bookId: string;
  trigger: ReactNode;
  onAddBookOpinion?: (grade: number, description: string) => void;
};

const AddBookOpinion: React.FC<Props> = ({ bookId, trigger, onAddBookOpinion }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(userSelectors.isAuthenticated);

  type AddOpinionType = {
    grade: number;
    description: string;
  };

  const handleSubmit = (addOpinion: AddOpinionType) => {
    bookOpinionApi.update(bookId, addOpinion.grade, addOpinion.description).then((res) => {
      if (!isBadStatusCode(res.status)) {
        message.success('The review was added successfully');
        onAddBookOpinion?.(addOpinion.grade, addOpinion.description);
        setIsModalVisible(false);
      } else {
        message.error("Couldn't add a review, try again");
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    if (!isAuthenticated) {
      navigate(ROUT_PAGE_NAME.USER_LOGIN);
      return;
    }

    setIsModalVisible(true);
  };

  return (
    <>
      <span onClick={showModal}>{trigger}</span>

      <Modal
        title="Add book opinion"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={() => {
              form.validateFields().then((value) => {
                handleSubmit(value);
                form.resetFields();
              });
            }}
          >
            Submit
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form id="addBookOpinionForm" form={form}>
          <Paragraph>
            Leave a short review so other readers can quickly understand what you thought about the book.
          </Paragraph>
          <Form.Item
            name="description"
            rules={[{ required: true, message: 'Please input number pages read!' }]}
          >
            <TextArea placeholder="Description" rows={10} autoSize style={{ maxHeight: '700px' }} />
          </Form.Item>
          <Form.Item label="Grade" name="grade">
            <Rate allowHalf />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddBookOpinion;
