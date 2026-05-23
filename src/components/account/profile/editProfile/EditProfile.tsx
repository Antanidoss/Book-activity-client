import { Button, Form, Input, Space, message } from 'antd';
import { EDIT_PROFILE_FIELD_NAMES } from './constants';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { isBadStatusCode, userApi } from 'api';
import TextArea from 'antd/es/input/TextArea';
import { setCurrentUser, userSelectors, useAppDispatch, useAppSelector } from 'store';
import { CurrentUserType } from 'common';

const EditProfile: React.FC<{
  userName: string;
  description?: string;
  onEditProfile: (userName: string, description: string) => void;
}> = ({ userName, description, onEditProfile }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = useAppSelector(userSelectors.curUser);

  const dispatch = useAppDispatch();

  const [form] = useForm();

  const initialValues = {
    [EDIT_PROFILE_FIELD_NAMES.USER_NAME]: userName,
    [EDIT_PROFILE_FIELD_NAMES.DESCRIPTION]: description,
  };

  type EditProfileValues = {
    userName: string;
    description: string;
  };

  const onFinish = (values: EditProfileValues) => {
    setLoading(true);

    userApi.updateUser(values.userName, values.description).then((res) => {
      if (!isBadStatusCode(res.status)) {
        message.success('Profile changes have been saved successfully', 6);
        setShowForm(false);
        onEditProfile(values.userName, values.description);
        dispatch(setCurrentUser({ ...currentUser, userName: values.userName } as CurrentUserType));
      } else {
        message.error('The profile could not be changed', 6);
      }

      setLoading(false);
    });
  };

  return (
    <>
      <div hidden={showForm}>
        <Button
          shape="round"
          type="primary"
          size="large"
          onClick={() => setShowForm(true)}
        >
          Edit profile
        </Button>
      </div>

      <Form
        initialValues={initialValues}
        hidden={!showForm}
        onFinish={onFinish}
        form={form}
        layout="vertical"
        style={{ textAlign: 'left', marginTop: 16 }}
      >
        <Form.Item
          label="Name"
          name={EDIT_PROFILE_FIELD_NAMES.USER_NAME}
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input type="text" size="large" />
        </Form.Item>
        <Form.Item label="About me" name={EDIT_PROFILE_FIELD_NAMES.DESCRIPTION}>
          <TextArea maxLength={100} rows={4} />
        </Form.Item>

        <Space>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" shape="round" loading={loading} size="large">
              Save
            </Button>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="default"
              htmlType="button"
              shape="round"
              size="large"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default EditProfile;
