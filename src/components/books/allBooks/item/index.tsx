import React, { useState } from 'react';
import { Button, Card, Col, Rate, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';
import { ROUT_PAGE_NAME } from 'common';
import { GetBooksItem } from 'query';
import AddActiveBook from '../../../activeBook/addActiveBook';
import styles from './index.module.css';

const { Paragraph, Text, Title } = Typography;

const BookOfList: React.FC<GetBooksItem> = (book) => {
  const [bookState, setBook] = useState(book);

  return (
    <Col xs={24} sm={12} xl={8}>
      <Card
        className={styles.card}
        cover={
          <Link
            to={`${ROUT_PAGE_NAME.BOOK_INFO}?bookId=${bookState.id}`}
            className={styles.coverLink}
          >
            <img
              className={styles.cover}
              src={`data:image/png;base64,${bookState.imageDataBase64}`}
              alt={bookState.title}
            />
          </Link>
        }
      >
        <Space direction="vertical" size={18} style={{ width: '100%' }}>
          <Link
            to={`${ROUT_PAGE_NAME.BOOK_INFO}?bookId=${bookState.id}`}
            className={styles.titleLink}
          >
            <Title level={4} ellipsis={{ rows: 2 }} className={styles.title}>
              {bookState.title}
            </Title>
          </Link>

          <div className={styles.metaRow}>
            <div>
              <Text strong>{bookState.bookOpinionsCount ?? 0}</Text>
              <Paragraph className={styles.statLabel}>community ratings</Paragraph>
            </div>
            <Rate value={bookState.averageRating} disabled allowHalf />
          </div>

          <div className={styles.footer}>
            {bookState.isActiveBook ? (
              <Button shape="round" type="primary" icon={React.createElement(CheckOutlined)}>
                Is active
              </Button>
            ) : (
              <AddActiveBook
                bookId={bookState.id}
                onAddActiveBookSuccess={() => setBook({ ...bookState, isActiveBook: true })}
              />
            )}
            <Text type="secondary">Avg. {bookState.averageRating?.toFixed(1) ?? '0.0'}</Text>
          </div>
        </Space>
      </Card>
    </Col>
  );
};

export default BookOfList;
