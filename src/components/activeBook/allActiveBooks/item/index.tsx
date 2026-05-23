import { Button, Card, Col, Dropdown, Progress, Space, Typography, message } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
import { GetActiveBooksItem } from 'query';
import { activeBookApi, isBadStatusCode } from 'api';
import UpdateActiveBook from './updateActiveBook';
import AddBookOpinion from '../../../bookOpinion/addBookOpinion';
import BookOpinionView from '../../../bookOpinion/bookOpinionView';
import AddBookNote from './addBookNote';
import { ROUT_PAGE_NAME } from 'common';
import styles from './index.module.css';

const { Text, Title } = Typography;

const ActiveBookForList: React.FC<{
  activeBook: GetActiveBooksItem;
  onRemoveActiveBook: (activeBookId: string) => void;
}> = ({ activeBook, onRemoveActiveBook }) => {
  const [activeBookState, setActiveBook] = useState(activeBook);

  const onClickRemoveActiveBook = useCallback(() => {
    activeBookApi.removeActiveBook(activeBookState.id).then((res) => {
      if (isBadStatusCode(res.status)) {
        message.error('The active book could not be deleted, please try again', 6);
      } else {
        onRemoveActiveBook(activeBookState.id);
        message.success('Active book has been successfully deleted', 6);
      }
    });
  }, [activeBookState.id, onRemoveActiveBook]);

  const onAddBookOpinion = () => {
    setActiveBook({
      ...activeBookState,
      book: {
        ...activeBookState.book,
        hasOpinion: true,
      },
    });
  };

  const onUpdateNumberPagesRead = useCallback(
    (numberPagesRead: number) => {
      setActiveBook({ ...activeBookState, numberPagesRead });
    },
    [activeBookState],
  );

  const progressPercent = Math.round(
    (activeBookState.numberPagesRead / activeBookState.totalNumberPages) * 100,
  );

  const updateActiveBookTrigger = useMemo(
    () => (
      <>
        <EditOutlined /> Edit
      </>
    ),
    [],
  );

  const actionItems = [
    {
      key: '1',
      label: (
        <UpdateActiveBook
          trigger={updateActiveBookTrigger}
          activeBook={activeBookState}
          onUpdate={onUpdateNumberPagesRead}
        />
      ),
    },
    {
      key: '2',
      label: (
        <Col onClick={onClickRemoveActiveBook}>
          <DeleteOutlined /> Remove
        </Col>
      ),
    },
    activeBookState.book.hasOpinion
      ? {
          key: '3',
          label: (
            <BookOpinionView
              trigger={
                <>
                  <CommentOutlined /> Look review
                </>
              }
              bookId={activeBook.book.id}
            />
          ),
        }
      : {
          key: '4',
          label: (
            <AddBookOpinion
              onAddBookOpinion={onAddBookOpinion}
              trigger={
                <>
                  <CommentOutlined /> Add review
                </>
              }
              bookId={activeBook.book.id}
            />
          ),
        },
    {
      key: '5',
      label: (
        <AddBookNote
          trigger={
            <>
              <PushpinOutlined /> Add note
            </>
          }
          activeBookId={activeBookState.id}
        />
      ),
    },
  ];

  return (
    <Col xs={24} sm={12} xl={8}>
      <Card
        className={styles.card}
        cover={
          <Link
            to={`${ROUT_PAGE_NAME.BOOK_INFO}?bookId=${activeBookState.book.id}`}
            className={styles.coverLink}
          >
            <img
              className={styles.cover}
              src={`data:image/png;base64,${activeBookState.book.imageDataBase64}`}
              alt={activeBookState.book.title}
            />
          </Link>
        }
      >
        <Space direction="vertical" size={18} style={{ width: '100%' }}>
          <Link to={`${ROUT_PAGE_NAME.BOOK_INFO}?bookId=${activeBookState.book.id}`}>
            <Title level={4} ellipsis={{ rows: 2 }} className={styles.title}>
              {activeBookState.book.title}
            </Title>
          </Link>

          <div className={styles.progressRow}>
            <Progress percent={progressPercent} style={{ flex: 1, marginBottom: 0 }} />
            <Dropdown menu={{ items: actionItems }} trigger={['click']}>
              <Button icon={<EllipsisOutlined />} type="primary" />
            </Dropdown>
          </div>

          <Text type="secondary">
            {activeBookState.numberPagesRead} of {activeBookState.totalNumberPages} pages read
          </Text>
        </Space>
      </Card>
    </Col>
  );
};

export default ActiveBookForList;
