import { Button, Col, Form, Input, message, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { DebounceSelect, PropsType as SelectProps } from 'commonComponents/DebounceSelect';
import { DefaultOptionType } from 'antd/lib/select';
import { UploadImage } from 'commonComponents';
import { bookApi } from 'api';
import { useLazyQuery } from '@apollo/client';
import { GET_AUTHORS_BY_NAME, GET_CATEGORIES_BY_TITLE, GetAuthorsByName, GetAuthorsByNameItem, GetCategoriesByTitle, GetCategoriesByTitleItem } from 'query';

const AddBook: React.FC = () => {
    const [getAuthorsByName] = useLazyQuery<GetAuthorsByName>(GET_AUTHORS_BY_NAME);
    const [getCategoriesByTitle] = useLazyQuery<GetCategoriesByTitle>(GET_CATEGORIES_BY_TITLE);

    const getAuthors = (authorName: string) => {
        return getAuthorsByName({
            variables: {
                take: 4,
                name: authorName
            }
        }).then(res => res.data?.authors.items ?? [])
    }

    const getCategories = (categoryTitle: string) => {
        return getCategoriesByTitle({
            variables: {
                take: 4,
                title: categoryTitle
            }
        }).then(res => res.data?.categories.items ?? [])
    }

    type AddBookModelType = {
        title: string,
        description: string,
        image: UploadChangeParam<UploadFile>,
        authors: Array<DefaultOptionType>,
        categories: Array<DefaultOptionType>,
    }

    const handleSubmit = (addBookModel: AddBookModelType) => {
        const authorIds = addBookModel.authors.map(o => {
            return o.value as string
        })

        const categoryIds = addBookModel.categories.map(o => {
            return o.value as string
        })

        bookApi.addBook({ ...addBookModel, authorIds: authorIds, categoryIds: categoryIds, image: addBookModel.image.file.originFileObj as Blob })
            .then(isSuccess => {
                isSuccess ? message.success("Book added", 6) : message.error("Failed to add book. Try again", 6);
            });
    }

    const selectAuthrosProps: SelectProps<GetAuthorsByNameItem> = {
        fetchOptions: getAuthors,
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

    const selectCategoryProps: SelectProps<GetCategoriesByTitleItem> = {
        fetchOptions: getCategories,
        debounceTimeout: 800,
        rules: [{ required: true, message: "Please select categories!" }],
        fieldName: "categories",
        fieldLabel: "Categories",
        transformToOptions(items) {
            return items.map(c => {
                return {
                    value: c.id,
                    label: c.title
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
                    <Col span={11} style={{ marginLeft: "10%" }}>
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
                        <DebounceSelect {...selectAuthrosProps} />
                    </Col>
                    <Col span={8} style={{ marginLeft: "10%" }}>
                        <DebounceSelect {...selectCategoryProps} />
                    </Col>
                </Row>
                <Row>
                    <Col span={8} style={{ marginTop: "50px" }}>
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