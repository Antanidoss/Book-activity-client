import React, { useState } from 'react';
import { Button, Form, Modal, message, InputNumber } from 'antd';
import { PropsType } from './AddActiveBookContainer';

const AddActiveBook: React.FC<PropsType> = (props) => {
  type AddActiveBookType = {
    totalNumberPages: number,
    numberPagesRead: number
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const [addActiveBookButtonLoading, setAddActiveBookButtonLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = (addActiveBookType: AddActiveBookType) => {
    let haveErrors = validateForm();

    if (haveErrors) {
      return;
    }

    setAddActiveBookButtonLoading(true);

    props.addActiveBook(addActiveBookType.numberPagesRead, addActiveBookType.totalNumberPages, props.bookId)
      .then(isSuccess => {
        if (isSuccess) {
          props.setActiveBookStatus(props.bookId);
          message.success("The book has been successfully added to active", 6);
          setIsModalVisible(false);
        } else {
          message.error("Failed to make the book active", 6);
        }

        setAddActiveBookButtonLoading(false);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const validateForm = () => {
    const totalNumberPages = form.getFieldValue("totalNumberPages") ?? 0;
    const numberPagesRead = form.getFieldValue("numberPagesRead") ?? 0;
    let haveErrors = false

    if (numberPagesRead > totalNumberPages) {
      form.setFields([{ name: "numberPagesRead", errors: ["The total number of pages cannot be less than the pages read"] }]);
      setDisabled(true);
      haveErrors = true;
    } else {
      form.setFields([{ name: "numberPagesRead", errors: undefined }]);
    }

    if (disabled && !haveErrors) {
      setDisabled(false);
    }

    return haveErrors;
  }

  return <>
    <Button shape="round" type="primary" onClick={showModal}>Make active</Button>
    <Modal forceRender title="Add active book" open={isModalVisible} onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" htmlType="submit" loading={addActiveBookButtonLoading} disabled={disabled} onClick={() => {
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
      <Form id="addActiveBookForm" form={form} onFieldsChange={validateForm}>
        <Form.Item
          label="Total number pages"
          name="totalNumberPages"
          rules={[{ required: true, message: "Please input total number pages!" }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Number pages read"
          name="numberPagesRead"
          rules={[{ required: true, message: "Please input number pages read!" }]}>
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    </Modal>
  </>
}

export default AddActiveBook;