import { Pagination, PaginationProps } from 'antd';
import React from 'react';
import { bookSelectors, updateBookPageNumber, useAppDispatch, useAppSelector } from 'store';

const BookPagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const totalBookCount = useAppSelector(bookSelectors.totalCount);
  const currentPage = useAppSelector(bookSelectors.pageNumber);
  const pageSize = useAppSelector(bookSelectors.pageSize);

  const onPaginationChange: PaginationProps['onChange'] = (page) => {
    dispatch(updateBookPageNumber(page));
  };

  return (
    <Pagination
      style={{ display: 'flex', justifyContent: 'center', marginTop: '8px', marginBottom: '12px' }}
      current={currentPage}
      total={totalBookCount}
      defaultPageSize={pageSize}
      onChange={onPaginationChange}
    />
  );
};

export default BookPagination;
