import { Empty, Row, Space, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FrownOutlined } from '@ant-design/icons';
import { GetActiveBooks, GetActiveBooksItem, GET_ACTIVE_BOOKS, Order } from 'query';
import { useLazyQuery } from '@apollo/client';
import ActiveBookPagination from './pagination';
import ActiveBookFilter from './filter';
import ActiveBookForList from './item';
import { CustomSpin } from 'commonComponents';
import { activeBookSelectors, updateActiveBookTotalCount, useAppDispatch, useAppSelector } from 'store';
import { SortBy } from 'common';

const { Paragraph, Title } = Typography;

const AllCurUserActiveBooks: React.FC = () => {
  const activeBookFilter = useAppSelector(activeBookSelectors.filter);
  const pageSize = useAppSelector(activeBookSelectors.pageSize);
  const paginationSkip = useAppSelector(activeBookSelectors.paginationSkip);

  const [loading, setLoading] = useState(true);
  const [activeBooks, setActiveBooks] = useState<GetActiveBooksItem[]>();

  const dispatch = useAppDispatch();

  const [getActiveBooks] = useLazyQuery<GetActiveBooks>(GET_ACTIVE_BOOKS, {
    fetchPolicy: 'network-only',
  });

  const variables = useMemo(() => {
    const order =
      activeBookFilter.sortBy === SortBy.CreateDate
        ? { timeOfCreation: Order.ASC }
        : { timeOfCreation: Order.DESC };

    return {
      skip: paginationSkip,
      take: pageSize,
      withFullRead: activeBookFilter.withFullRead,
      order,
      filter:
        activeBookFilter.bookTitle === undefined
          ? undefined
          : {
              and: [
                {
                  book: { title: { contains: activeBookFilter.bookTitle } },
                },
              ],
            },
    };
  }, [activeBookFilter, pageSize, paginationSkip]);

  useEffect(() => {
    getActiveBooks({ variables }).then((res) => {
      setLoading(false);
      setActiveBooks(res.data?.activeBooks.items);
      dispatch(updateActiveBookTotalCount(res.data?.activeBooks.totalCount ?? 0));
    });
  }, [variables, getActiveBooks, dispatch]);

  const onRemoveActiveBook = useCallback(
    (activeBookId: string) => {
      setActiveBooks(activeBooks?.filter((a) => a.id !== activeBookId));
    },
    [activeBooks],
  );

  if (loading) return <CustomSpin loading={loading} />;

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <div className="page-card" style={{ padding: 28 }}>
        <Title level={2} style={{ marginTop: 0, marginBottom: 8 }}>
          Active reading flow
        </Title>
        <Paragraph style={{ marginBottom: 0 }}>
          Stay close to what you are reading now, adjust filters quickly, and manage ongoing progress.
        </Paragraph>
      </div>

      <ActiveBookFilter />

      {activeBooks?.length ? (
        <>
          <Row gutter={[24, 24]}>
            {activeBooks.map((a) => (
              <ActiveBookForList
                key={a.id}
                activeBook={a}
                onRemoveActiveBook={onRemoveActiveBook}
              />
            ))}
          </Row>
          <ActiveBookPagination />
        </>
      ) : (
        <Empty
          description="You don't have any active books"
          image={React.createElement(FrownOutlined)}
          imageStyle={{ fontSize: '30px', display: 'inline' }}
          />
      )}
    </Space>
  );
};

export default AllCurUserActiveBooks;
