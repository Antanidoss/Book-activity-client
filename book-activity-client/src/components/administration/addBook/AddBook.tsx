import { Button, Col, Form, Input, message, Row, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { PropsType } from './AddBookContainer';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import DebounceSelect, {PropsType as SelectProps} from '../../../common/DebounceSelect';
import { DefaultOptionType } from 'antd/lib/select';

const AddBook: React.FC<PropsType> = (props) => {
    type AddBookModelType = {
        title: string,
        description: string,
        image: UploadChangeParam<UploadFile>,
        authors: Array<DefaultOptionType>
    }

    const handleSubmit = (addBookModel: AddBookModelType) => {
        const authorIds = addBookModel.authors.map(o => {
            return o.value as string
        })

        props.addBook({...addBookModel, authorIds: authorIds});
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

    const selectProps: SelectProps = {
        fetchOptions: props.getAuthors, 
        debounceTimeout: 800,
        rules: [{ required: true, message: "Please select authors!" }],
        fieldName: "authors",
        fieldLabel: "Authors",
        transformToOptions(items) {
            return items.map(a => {
                var authorFullName = `${a.surname} ${a.firstName} ${a.patronymic}`;
                return {
                    value: a.id,
                    label: authorFullName
                };
            })
        }
    }

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
                    <Col span={11} style={{ marginLeft: "200px" }}>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: "Please input description!" }]}>
                            <TextArea />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{marginTop: "70px"}}>
                    <Col span={8}>
                        <DebounceSelect {...selectProps} />
                    </Col>
                    <Col span={8} style={{ marginLeft: "200px" }}>
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
                    </Col>
                </Row>
                <Button style={{ marginTop: "50px", marginLeft: "40%" }} key="submit" type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </Col>
    )
}

export default AddBook;