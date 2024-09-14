import { Button, Col, Form, Input, message, Modal } from 'antd';
import React, { memo, ReactNode, useState } from 'react';
import { GetActiveBooksItem } from 'query';
import { isBadStatusCode, activeBookApi } from 'api';
import { UPDATE_ACTIVE_BOOK_FIELD_NAMES } from './constants';

type Props = {
  activeBook: GetActiveBooksItem;
  onUpdate: (numberPagesRead: number) => void;
  trigger: ReactNode;
};

type UpdateActiveBookType = {
  numberPagesRead: number;
};

const UpdateActiveBook: React.FC<Props> = memo((props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = (updateActiveBook: UpdateActiveBookType) => {
    if (!validateForm()) return;

    activeBookApi
      .updateActiveBook(props.activeBook.id, updateActiveBook.numberPagesRead)
      .then((res) => {
        if (!isBadStatusCode(res.status)) {
          message.success('The active book has been successfully updated', 6);
          props.onUpdate(updateActiveBook.numberPagesRead);
          setIsModalVisible(false);

          form.setFieldValue('numberPagesRead', updateActiveBook.numberPagesRead);
        } else {
          message.error('The active book could not be changed', 6);
        }
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const validateForm = () => {
    const numberPagesRead = form.getFieldValue('numberPagesRead') ?? 0;
    let success = true;

    if (numberPagesRead < props.activeBook.numberPagesRead) {
      form.setFields([
        { name: 'numberPagesRead', errors: ["Can't reduce the number of pages read"] },
      ]);
      setDisabled(true);
      success = false;
    }

    if (disabled && !success) {
      setDisabled(false);
    }

    return success;
  };

  return (
    <>
      <Col onClick={showModal}>{props.trigger}</Col>

      <Modal
        title="Add active book"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            disabled={disabled}
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
        <Form
          id="updateActiveBookForm"
          form={form}
          initialValues={{ [UPDATE_ACTIVE_BOOK_FIELD_NAMES.NUMBER_PAGES_READ]: props.activeBook.numberPagesRead }}
          onFieldsChange={validateForm}
        >
          <Form.Item
            label="Number of pages read"
            name={UPDATE_ACTIVE_BOOK_FIELD_NAMES.NUMBER_PAGES_READ}
            rules={[{ required: true, message: 'Please input number pages read!' }]}
          >
            <Input
              size="small"
              type="number"
              min={0}
              max={props.activeBook.totalNumberPages}
              suffix={'from ' + props.activeBook.totalNumberPages}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default UpdateActiveBook;
