import React, { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Badge, Button, Col, Form, Input, InputNumber, Row, Space, Typography } from 'antd';
import { CustomDrawer } from 'commonComponents';
import { BookFilterType, isBookDefaultFilter } from 'common';
import { DebounceSelect, PropsType as SelectProps } from 'commonComponents/DebounceSelect';
import { bookSelectors, clearBookFilter, updateBookFilter, useAppDispatch, useAppSelector } from 'store';
import { useLazyQuery } from '@apollo/client';
import { GetCategoriesByTitle, GET_CATEGORIES_BY_TITLE, GetCategoriesByTitleItem } from 'query';
import { BOOK_FILTER_FIELD_NAMES } from './constants';

const { Search } = Input;
const { Paragraph, Title } = Typography;

const BookFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const bookFilter = useAppSelector(bookSelectors.filter);
  const [open, setOpen] = useState(false);

  const [getCategories] = useLazyQuery<GetCategoriesByTitle>(GET_CATEGORIES_BY_TITLE, {
    fetchPolicy: 'network-only',
  });

  const getBookCategories = async (title: string) => {
    const categories = await getCategories({
      variables: {
        title,
        take: 5,
      },
    });

    return categories.data?.categories.items ?? [];
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (bookFilterModel: BookFilterType) => {
    dispatch(updateBookFilter(bookFilterModel));
    onClose();
  };

  const onClearFilter = () => {
    dispatch(clearBookFilter());
    onClose();
  };

  const selectCategoryProps: SelectProps<GetCategoriesByTitleItem> = {
    fetchOptions: getBookCategories,
    debounceTimeout: 800,
    fieldName: 'categories',
    placeholder: 'Input book categories',
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
    <>
      <Badge dot={!isBookDefaultFilter(bookFilter)}>
        <Button onClick={showDrawer} shape="round" type="primary" size="large" icon={<FilterOutlined />}>
          Filter books
        </Button>
      </Badge>

      <CustomDrawer
        open={open}
        direction="right"
        onClose={onClose}
        size={600}
        title="Book filters"
      >
        <Form
          onFinish={onFinish}
          initialValues={{
            [BOOK_FILTER_FIELD_NAMES.BOOK_TITLE]: bookFilter.bookTitle,
            [BOOK_FILTER_FIELD_NAMES.AVERAGE_RATING_FROM]: bookFilter.averageRatingFrom,
            [BOOK_FILTER_FIELD_NAMES.AVERAGE_RATING_TO]: bookFilter.averageRatingTo,
            [BOOK_FILTER_FIELD_NAMES.CATEGORIES]: bookFilter.categories,
          }}
        >
          <Space direction="vertical" size={20} style={{ width: '100%' }}>
            <div>
              <Title level={3} style={{ marginTop: 0 }}>
                Tune the catalogue
              </Title>
              <Paragraph>
                Search by title, category, or rating range to zero in on the books you want.
              </Paragraph>
            </div>

            <Form.Item name={BOOK_FILTER_FIELD_NAMES.BOOK_TITLE} style={{ marginBottom: 0 }}>
              <Search placeholder="Input book title" />
            </Form.Item>

            <Form.Item name={BOOK_FILTER_FIELD_NAMES.CATEGORIES} style={{ marginBottom: 0 }}>
              <DebounceSelect {...selectCategoryProps} />
            </Form.Item>

            <div>
              <Title level={5}>Rating</Title>
            </div>

            <Row gutter={16}>
              <Col xs={12}>
                <Form.Item label="From" name={BOOK_FILTER_FIELD_NAMES.AVERAGE_RATING_FROM}>
                  <InputNumber min={0} max={5} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label="To" name={BOOK_FILTER_FIELD_NAMES.AVERAGE_RATING_TO}>
                  <InputNumber min={0} max={5} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col xs={12}>
                <Button type="primary" htmlType="submit" shape="round" block size="large">
                  Search
                </Button>
              </Col>
              <Col xs={12}>
                <Button type="default" shape="round" htmlType="button" onClick={onClearFilter} block size="large">
                  Clear
                </Button>
              </Col>
            </Row>
          </Space>
        </Form>
      </CustomDrawer>
    </>
  );
};

export default BookFilter;
