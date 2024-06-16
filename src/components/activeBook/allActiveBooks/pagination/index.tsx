import { Pagination, PaginationProps } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateActiveBookPageNumber, activeBookSelectors } from 'reduxStore';

const ActiveBookPagination: React.FC = () => {
  const dispatch = useDispatch();
  const totalBookCount = useSelector(activeBookSelectors.totalCount);
  const currentPage = useSelector(activeBookSelectors.pageNumber);
  const pageSize = useSelector(activeBookSelectors.pageSize);

  const onPaginationChange: PaginationProps['onChange'] = (page) => {
    dispatch(updateActiveBookPageNumber(page));
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

export default ActiveBookPagination;
