import React, { useEffect, useState } from 'react';
import { Button, Card, Rate, Space, Tag, Typography } from 'antd';
import { CheckOutlined, CommentOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { ROUT_PAGE_NAME } from 'common';
import { useLazyQuery } from '@apollo/client';
import { useQuery as useLinkQuery } from '../../../hoc/useQuery';
import { GetBookInfo, GetBookInfoItem, GET_BOOK_INFO } from 'query';
import { updateBookFilter, bookSelectors, useAppDispatch, useAppSelector } from 'store';
import AddActiveBook from '../../activeBook/addActiveBook';
import BookOpinionView from '../../bookOpinion/bookOpinionView';
import AddBookOpinion from '../../bookOpinion/addBookOpinion';
import BookComments from './bookComments';
import { CustomSpin } from 'commonComponents';
import styles from './index.module.css';

const { Paragraph, Text, Title } = Typography;

const BookInfo: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const query = useLinkQuery();

  const bookFilter = useAppSelector(bookSelectors.filter);

  const [bookInfo, setBookInfo] = useState<GetBookInfoItem>();
  const [loading, setLoading] = useState(true);

  const bookId = query.get('bookId');

  const [getBookInfo] = useLazyQuery<GetBookInfo>(GET_BOOK_INFO, {
    fetchPolicy: 'cache-first',
    variables: {
      bookId,
    },
  });

  useEffect(() => {
    getBookInfo().then((res) => {
      setLoading(false);
      setBookInfo(res.data?.bookById[0]);
    });
  }, [getBookInfo]);

  if (loading) return <CustomSpin loading={loading} />;
  if (bookInfo === undefined) return null;

  const onTagClick = (categoryId: string, categoryTitle: string) => {
    dispatch(
      updateBookFilter({
        ...bookFilter,
        categories: [{ value: categoryId, label: categoryTitle }],
      }),
    );

    navigate(ROUT_PAGE_NAME.ALL_BOOKS);
  };

  const onAddActiveBookSuccess = () => {
    setBookInfo({ ...bookInfo, isActiveBook: true });
  };

  return (
    <div className={styles.page}>
      <Card className={`page-card ${styles.hero}`}>
        <div className={styles.coverWrap}>
          <img
            className={styles.cover}
            src={`data:image/png;base64,${bookInfo.imageDataBase64}`}
            alt={bookInfo.title}
          />
        </div>

        <div>
          <Space direction="vertical" size={14} style={{ width: '100%' }}>
            <div className={styles.metaTop}>
              <Rate value={bookInfo.averageRating} disabled allowHalf />
              <Link to="#">{bookInfo.bookOpinionsCount} community ratings</Link>
            </div>

            <div>
              <Title level={2} style={{ marginTop: 0, marginBottom: 8 }}>
                {bookInfo.title}
              </Title>
              <Text className={styles.authors}>
                {bookInfo.bookAuthors.map((a) => `${a.author.firstName} ${a.author.surname}`).join(', ')}
              </Text>
            </div>

            <Space size={[8, 8]} wrap>
              {bookInfo.bookCategories?.map((c) => (
                <Tag
                  key={c.category.id}
                  onClick={() => onTagClick(c.category.id, c.category.title)}
                  style={{ cursor: 'pointer', padding: '8px 12px', borderRadius: 999 }}
                >
                  {c.category.title}
                </Tag>
              ))}
            </Space>

            <div className={styles.actions}>
              {bookInfo.isActiveBook ? (
                <Button shape="round" type="primary" icon={<CheckOutlined />}>
                  Is active
                </Button>
              ) : (
                <AddActiveBook
                  bookId={bookInfo.id}
                  onAddActiveBookSuccess={onAddActiveBookSuccess}
                />
              )}

              {bookInfo.hasOpinion ? (
                <BookOpinionView
                  trigger={
                    <Button shape="round" type="primary" icon={<CommentOutlined />}>
                      Look review
                    </Button>
                  }
                  bookId={bookInfo.id}
                />
              ) : (
                <AddBookOpinion
                  trigger={
                    <Button shape="round" type="primary" icon={<CommentOutlined />}>
                      Add review
                    </Button>
                  }
                  bookId={bookInfo.id}
                />
              )}
            </div>
          </Space>
        </div>
      </Card>

      <Card className={`page-card ${styles.description}`}>
        <Title level={3} style={{ marginTop: 0 }}>
          Description
        </Title>
        <Paragraph style={{ whiteSpace: 'pre-line' }}>{bookInfo.description}</Paragraph>
        <BookComments bookId={bookInfo.id} />
      </Card>
    </div>
  );
};

export default BookInfo;
