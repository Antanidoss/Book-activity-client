import React, { useState } from 'react';
import { Button, Form, Modal, message, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { activeBookApi } from '../../../api/activeBooks';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../../redux/users/selectors';

const AddActiveBook: React.FC<{bookId: string, onAddActiveBookSuccess?: () => void} > = ({bookId, onAddActiveBookSuccess}) => {
  type AddActiveBookType = {
    totalNumberPages: number,
    numberPagesRead: number
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const [addActiveBookButtonLoading, setAddActiveBookButtonLoading] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(getIsAuthenticated);

  const showModal = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    setIsModalVisible(true);
  };

  const handleSubmit = (addActiveBookType: AddActiveBookType) => {
    const haveErrors = validateForm();

    if (haveErrors) {
      return;
    }

    setAddActiveBookButtonLoading(true);

    activeBookApi.addActiveBook(addActiveBookType.totalNumberPages, addActiveBookType.numberPagesRead, bookId).then(result => {
      if (result.success) {
        message.success("The book has been successfully added to active", 6);
        setIsModalVisible(false);
        onAddActiveBookSuccess?.();
      } else {
        message.error("Failed to make the book active", 6);
        setAddActiveBookButtonLoading(false);
      }
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