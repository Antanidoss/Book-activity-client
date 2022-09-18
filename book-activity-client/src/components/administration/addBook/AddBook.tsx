import { Button, Col, Form, Input, message, Row, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { AddBookModelType } from '../../../api/bookApi';
import { PropsType } from './AddBookContainer';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';

const AddBook: React.FC<PropsType> = (props) => {
    const handleSubmit = (addBookModel: AddBookModelType) => {
        props.addBook(addBookModel);
    }

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const getBase64 = (callback: (url: string | ArrayBuffer | null) => void, img?: RcFile) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img as Blob);
    };

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }


        return isJpgOrPng;
    };

    const handleChange = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            getBase64((url) => {
                setLoading(false);
                setImageUrl(url as string);
            }, info.file.originFileObj);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <Col span={20} style={{ margin: "0px auto" }}>
            <Form onFinish={handleSubmit}>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: "Please input title!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={11} style={{ marginLeft: "20px" }}>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: "Please input description!" }]}>
                            <TextArea />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: "Please upload image!" }]}>
                    <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        customRequest={({ file, onSuccess }) => {
                            setTimeout(() => {
                                onSuccess?.("ok");
                            }, 0);
                        }}                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                style={{
                                    width: '100%',
                                }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Form.Item>
                <Button style={{ marginLeft: "40%" }} key="submit" type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </Col>
    )
}

export default AddBook;