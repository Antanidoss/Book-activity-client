import { Button, Col, Form, Input, Row, Space, Typography, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { DebounceSelect, PropsType as SelectProps } from 'commonComponents/DebounceSelect';
import type { DefaultOptionType } from 'antd/es/select';
import { UploadImage } from 'commonComponents';
import { bookApi } from 'api';
import { useLazyQuery } from '@apollo/client';
import {
  GET_AUTHORS_BY_NAME,
  GET_CATEGORIES_BY_TITLE,
  GetAuthorsByName,
  GetAuthorsByNameItem,
  GetCategoriesByTitle,
  GetCategoriesByTitleItem,
} from 'query';

const { Paragraph, Title } = Typography;

const AddBook: React.FC = () => {
  const [getAuthorsByName] = useLazyQuery<GetAuthorsByName>(GET_AUTHORS_BY_NAME);
  const [getCategoriesByTitle] = useLazyQuery<GetCategoriesByTitle>(GET_CATEGORIES_BY_TITLE);

  const getAuthors = (authorName: string) => {
    return getAuthorsByName({
      variables: {
        take: 4,
        name: authorName,
      },
    }).then((res) => res.data?.authors.items ?? []);
  };

  const getCategories = (categoryTitle: string) => {
    return getCategoriesByTitle({
      variables: {
        take: 4,
        title: categoryTitle,
      },
    }).then((res) => res.data?.categories.items ?? []);
  };

  type AddBookModelType = {
    title: string;
    description: string;
    image: UploadChangeParam<UploadFile>;
    authors: Array<DefaultOptionType>;
    categories: Array<DefaultOptionType>;
  };

  const handleSubmit = (addBookModel: AddBookModelType) => {
    const authorIds = addBookModel.authors.map((o) => {
      return o.value as string;
    });

    const categoryIds = addBookModel.categories.map((o) => {
      return o.value as string;
    });

    bookApi
      .addBook({
        ...addBookModel,
        authorIds: authorIds,
        categoryIds: categoryIds,
        image: addBookModel.image.file.originFileObj as Blob,
      })
      .then((isSuccess) => {
        isSuccess
          ? message.success('Book added', 6)
          : message.error('Failed to add book. Try again', 6);
      });
  };

  const selectAuthrosProps: SelectProps<GetAuthorsByNameItem> = {
    fetchOptions: getAuthors,
    debounceTimeout: 800,
    rules: [{ required: true, message: 'Please select authors!' }],
    fieldName: 'authors',
    fieldLabel: 'Authors',
    transformToOptions(items) {
      return items.map((a) => {
        return {
          value: a.id,
          label: `${a.firstName} ${a.surname}`,
        };
      });
    },
  };

  const selectCategoryProps: SelectProps<GetCategoriesByTitleItem> = {
    fetchOptions: getCategories,
    debounceTimeout: 800,
    rules: [{ required: true, message: 'Please select categories!' }],
    fieldName: 'categories',
    fieldLabel: 'Categories',
    transformToOptions(items) {
      return items.map((c) => {
        return {
          value: c.id,
          label: c.title,
        };
      });
    },
  };

  return (
    <Space direction="vertical" size={20} style={{ width: '100%' }}>
      <div>
        <Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
          Add book
        </Title>
        <Paragraph style={{ marginBottom: 0 }}>
          Add a new book with authors, categories, cover image, and description.
        </Paragraph>
      </div>

      <Form onFinish={handleSubmit} layout="vertical">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={10}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input title!' }]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={14}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input description!' }]}
            >
              <TextArea rows={5} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={10}>
            <DebounceSelect {...selectAuthrosProps} />
          </Col>
          <Col xs={24} lg={10}>
            <DebounceSelect {...selectCategoryProps} />
          </Col>
        </Row>
        <Row gutter={[24, 24]} align="bottom">
          <Col xs={24} md={10}>
            <UploadImage
              fieldLabel="Image"
              fieldName="image"
              rules={[{ required: true, message: 'Please upload image!' }]}
              uploadListType="picture-card"
            />
          </Col>
          <Col xs={24} md={8}>
            <Button key="submit" type="primary" htmlType="submit" size="large" shape="round">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};

export default AddBook;
