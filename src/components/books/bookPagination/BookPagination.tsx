import { Pagination, PaginationProps } from 'antd';
import React from 'react';
import { PropsType } from './BookPaginationContainer';

const BookPagination: React.FC<PropsType> = (props) => {
    const onPaginationChange: PaginationProps['onChange'] = page => {
        props.updateCurrentPage(page);
        props.getBooksByFilter();
      };

    return (
        <Pagination style={{display: "flex", justifyContent: "center", marginTop: "100px"}}
            current={props.currentPage}
            total={props.totalBookCount}
            defaultPageSize={props.pageSize}
            onChange={onPaginationChange} />
    )
}

export default BookPagination;