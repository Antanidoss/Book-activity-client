import { Empty, Row } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FrownOutlined } from '@ant-design/icons';
import { GetActiveBooks, GetActiveBooksItem, GET_ACTIVE_BOOKS, Order } from 'query';
import { useLazyQuery } from '@apollo/client';
import ActiveBookPagination from './pagination';
import ActiveBookFilter from './filter';
import ActiveBookForList from './item';
import { CustomSpin } from 'commonComponents';
import { useSelector, useDispatch } from 'react-redux';
import { activeBookSelectors, updateActiveBookTotalCount } from 'reduxStore';
import { SortBy } from 'common';

const AllCurUserActiveBooks: React.FC = () => {
  const activeBookFilter = useSelector(activeBookSelectors.filter);
  const pageSize = useSelector(activeBookSelectors.pageSize);
  const paginationSkip = useSelector(activeBookSelectors.paginationSkip);

  const [loading, setLoading] = useState(true);
  const [activeBooks, setActiveBooks] = useState<GetActiveBooksItem[]>();

  const dispatch = useDispatch();

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
    <>
      <ActiveBookFilter />

      {activeBooks?.length ? (
        <>
          <Row justify="space-around" gutter={[24, 16]} style={{ marginRight: '0px' }}>
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
    </>
  );
};

export default AllCurUserActiveBooks;
