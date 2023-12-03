import { Button, Col, Form, Input, message, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { PropsType } from './AddBookContainer';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';
import DebounceSelect, { PropsType as SelectProps } from '../../../components/common/DebounceSelect';
import { DefaultOptionType } from 'antd/lib/select';
import UploadImage from '../../common/UploadImage';

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

        props.addBook({ ...addBookModel, authorIds: authorIds })
            .then(isSuccess => {
                isSuccess ? message.success("Book added.", 6) : message.error("Failed to add book. Try again.", 6);
            });
    }

    const selectProps: SelectProps = {
        fetchOptions: props.getAuthors,
        debounceTimeout: 800,
        rules: [{ required: true, message: "Please select authors!" }],
        fieldName: "authors",
        fieldLabel: "Authors",
        transformToOptions(items) {
            return items.map(a => {
                return {
                    value: a.id,
                    label: `${a.firstName} ${a.surname}`
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
                    <Col span={11} style={{ marginLeft: "20%" }}>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: "Please input description!" }]}>
                            <TextArea />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ marginTop: "70px" }}>
                    <Col span={8}>
                        <DebounceSelect {...selectProps} />
                    </Col>
                    <Col span={8} style={{ marginLeft: "20%" }}>
                        <UploadImage fieldLabel="Image" fieldName="image" rules={[{ required: true, message: "Please upload image!" }]} uploadListType="picture-card" />
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