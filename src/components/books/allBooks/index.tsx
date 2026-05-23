import { Empty, Row, Space, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import BookOfList from './item';
import BookPagination from './pagination';
import { FrownOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/client';
import { GetBooks, GetBooksItem, GET_BOOKS } from 'query';
import BookFilter from './filter';
import { updateBookTotalCount, bookSelectors, useAppDispatch, useAppSelector } from 'store';
import { CustomSpin } from 'commonComponents';

const { Paragraph, Title } = Typography;

const AllBooks: React.FC = () => {
  const bookFilter = useAppSelector(bookSelectors.filter);
  const pageSize = useAppSelector(bookSelectors.pageSize);
  const paginationSkip = useAppSelector(bookSelectors.paginationSkip);

  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<GetBooksItem[]>();

  const dispatch = useAppDispatch();

  const [getBooks] = useLazyQuery<GetBooks>(GET_BOOKS, {
    fetchPolicy: 'network-only',
  });

  const variables = useMemo(
    () => ({
      skip: paginationSkip,
      take: pageSize,
      averageRatingFrom: bookFilter.averageRatingFrom,
      averageRatingTo: bookFilter.averageRatingTo,
      filter: {
        and: [
          {
            title:
              bookFilter.bookTitle === undefined ? undefined : { contains: bookFilter.bookTitle },
          },
          {
            bookCategories: !bookFilter.categories.length
              ? undefined
              : {
                  some: {
                    category: {
                      or: bookFilter.categories.map((c: any) => ({ id: { eq: c.value } })),
                    },
                  },
                },
          },
        ],
      },
    }),
    [paginationSkip, pageSize, bookFilter],
  );

  useEffect(() => {
    getBooks({ variables }).then((res) => {
      setBooks(res.data?.books.items);
      setLoading(false);
      dispatch(updateBookTotalCount(res.data?.books.totalCount ?? 0));
    });
  }, [getBooks, dispatch, variables]);

  if (loading) return <CustomSpin loading={loading} />;

  if (!books?.length)
    return (
      <Empty
        description="Can't find books"
        image={React.createElement(FrownOutlined)}
        imageStyle={{ fontSize: '30px', display: 'inline' }}
      />
    );

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <div className="page-card" style={{ padding: 28 }}>
        <Title level={2} style={{ marginTop: 0, marginBottom: 8 }}>
          Explore the library
        </Title>
        <Paragraph style={{ marginBottom: 0 }}>
          Find your next book, narrow the catalogue with filters, and jump straight into details.
        </Paragraph>
      </div>

      <BookFilter />

      <Row gutter={[24, 24]} align="stretch">
        {books?.map((b) => <BookOfList key={b.id} {...b} />)}
      </Row>

      <BookPagination />
    </Space>
  );
};

export default AllBooks;
