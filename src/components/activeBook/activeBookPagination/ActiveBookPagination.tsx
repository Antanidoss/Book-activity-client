import { Pagination, PaginationProps } from "antd";
import React from "react";
import { PropsType } from "./ActiveBookPaginationContainer";

const ActiveBookPagination: React.FC<PropsType> = (props) => {
    const onPaginationChange: PaginationProps['onChange'] = page => {
        props.updateCurrentPage(page);
        props.getActiveBooksByFilter();
      };

    return (
        <Pagination style={{display: "flex", justifyContent: "center", marginTop: "80px", marginBottom: "20px"}}
            current={props.currentPage}
            total={props.totalActiveBookCount}
            defaultPageSize={props.pageSize}
            onChange={onPaginationChange} />
    )
}

export default ActiveBookPagination;