import { Pagination, PaginationProps } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bookSelectors, updateBookPageNumber } from 'store';

const BookPagination: React.FC = () => {
  const dispatch = useDispatch();
  const totalBookCount = useSelector(bookSelectors.totalCount);
  const currentPage = useSelector(bookSelectors.pageNumber);
  const pageSize = useSelector(bookSelectors.pageSize);

  const onPaginationChange: PaginationProps['onChange'] = (page) => {
    dispatch(updateBookPageNumber(page));
  };

  return (
    <Pagination
      style={{ display: 'flex', justifyContent: 'center', marginTop: '80px', marginBottom: '20px' }}
      current={currentPage}
      total={totalBookCount}
      defaultPageSize={pageSize}
      onChange={onPaginationChange}
    />
  );
};

export default BookPagination;
