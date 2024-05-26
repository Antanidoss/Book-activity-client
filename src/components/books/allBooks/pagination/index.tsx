import { Pagination, PaginationProps } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPageNumber, getPageSize, getTotalBookCount } from '../../../../redux/books/selectors';
import { updatePageNumber } from '../../../../redux/books/slice';

const BookPagination: React.FC = () => {
    const dispatch = useDispatch();
    const totalBookCount = useSelector(getTotalBookCount);
    const currentPage = useSelector(getPageNumber);
    const pageSize = useSelector(getPageSize);

    const onPaginationChange: PaginationProps['onChange'] = page => {
        dispatch(updatePageNumber(page));
    };

    return (
        <Pagination style={{display: "flex", justifyContent: "center", marginTop: "80px", marginBottom: "20px"}}
            current={currentPage}
            total={totalBookCount}
            defaultPageSize={pageSize}
            onChange={onPaginationChange} />
    )
}

export default BookPagination;