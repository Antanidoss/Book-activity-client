import { Pagination, PaginationProps } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageNumber, getPageSize, getTotalActiveBookCount } from "../../../../redux/activeBooks/selectors";
import { updatePageNumber } from "../../../../redux/activeBooks/slice";

const ActiveBookPagination: React.FC = () => {
    const dispatch = useDispatch();
    const totalBookCount = useSelector(getTotalActiveBookCount);
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

export default ActiveBookPagination;