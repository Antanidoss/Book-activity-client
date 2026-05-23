import { Pagination, PaginationProps } from 'antd';
import React from 'react';
import { updateActiveBookPageNumber, activeBookSelectors, useAppDispatch, useAppSelector } from 'store';

const ActiveBookPagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const totalBookCount = useAppSelector(activeBookSelectors.totalCount);
  const currentPage = useAppSelector(activeBookSelectors.pageNumber);
  const pageSize = useAppSelector(activeBookSelectors.pageSize);

  const onPaginationChange: PaginationProps['onChange'] = (page) => {
    dispatch(updateActiveBookPageNumber(page));
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

export default ActiveBookPagination;
