import { Badge, Button, Checkbox, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { clearActiveBookFilter, updateActiveBookFilter, activeBookSelectors, useAppDispatch, useAppSelector } from 'store';
import { ActiveBookFilterType, isActiveBookDefaultFilter } from 'common';
import { CustomDrawer } from 'commonComponents';
import { ACTIVE_BOOK_FILTER_FIELD_NAMES } from './constants';

const { Search } = Input;
const { Paragraph, Title } = Typography;

const ActiveBookFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeBookFilter = useAppSelector(activeBookSelectors.filter);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (activeBookFilterModel: ActiveBookFilterType) => {
    dispatch(updateActiveBookFilter(activeBookFilterModel));
    onClose();
  };

  const onClearFilter = () => {
    dispatch(clearActiveBookFilter());
    onClose();
  };

  const sortByOptions = [
    {
      value: 0,
      label: 'Creation time descending',
    },
    {
      value: 1,
      label: 'By ascending time of creation',
    },
    {
      value: 2,
      label: 'Descending update time',
    },
  ];

  return (
    <>
      <Badge dot={!isActiveBookDefaultFilter(activeBookFilter)}>
        <Button onClick={showDrawer} shape="round" type="primary" size="large" icon={<FilterOutlined />}>
          Filter active books
        </Button>
      </Badge>

      <CustomDrawer
        open={open}
        direction="right"
        onClose={onClose}
        size={600}
        title="Active book filters"
      >
        <Form
          onFinish={onFinish}
          initialValues={{
            [ACTIVE_BOOK_FILTER_FIELD_NAMES.BOOK_TITLE]: activeBookFilter.bookTitle,
            [ACTIVE_BOOK_FILTER_FIELD_NAMES.SORT_BY]: activeBookFilter.sortBy,
            [ACTIVE_BOOK_FILTER_FIELD_NAMES.WITH_FULL_READ]: activeBookFilter.withFullRead,
          }}
        >
          <Space direction="vertical" size={20} style={{ width: '100%' }}>
            <div>
              <Title level={3} style={{ marginTop: 0 }}>
                Focus your current reads
              </Title>
              <Paragraph>
                Sort recent activity, filter by title, and include fully finished reads only when needed.
              </Paragraph>
            </div>

            <Form.Item name={ACTIVE_BOOK_FILTER_FIELD_NAMES.BOOK_TITLE} style={{ marginBottom: 0 }}>
              <Search placeholder="Input book title" />
            </Form.Item>

            <Form.Item label="Sort by" name={ACTIVE_BOOK_FILTER_FIELD_NAMES.SORT_BY} style={{ marginBottom: 0 }}>
              <Select options={sortByOptions} />
            </Form.Item>

            <Form.Item label="With full read" valuePropName="checked" name={ACTIVE_BOOK_FILTER_FIELD_NAMES.WITH_FULL_READ} style={{ marginBottom: 0 }}>
              <Checkbox />
            </Form.Item>

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

export default ActiveBookFilter;
