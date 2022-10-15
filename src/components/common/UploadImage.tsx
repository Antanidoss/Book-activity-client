import { message, Upload } from "antd";
import { RcFile, UploadChangeParam, UploadFile, UploadListType } from "antd/lib/upload/interface";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Form, { Rule } from "antd/lib/form";

const UploadImage: React.FC<PropsType> = (props) => {
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
                }}>
                Upload
            </div>
        </div>
    );

    return (
        <Form.Item
            name={props.fieldName}
            label={props.fieldLabel}
            rules={props.rules}>
            <Upload
                listType={props.uploadListType}
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
    )
}

export type PropsType = {
    uploadListType: UploadListType
    fieldName: string,
    fieldLabel: string,
    rules: Rule[] | undefined
}

export default UploadImage;