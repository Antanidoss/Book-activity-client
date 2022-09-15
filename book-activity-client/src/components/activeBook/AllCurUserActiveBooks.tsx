import { Empty, Pagination, Row } from 'antd';
import React from 'react'
import ActiveBookForListContainer from './activeBookForList/ActiveBookForListContainer';
import { PropsType } from './AllCurUserActiveBooksContainer'

const AllCurUserActiveBooks: React.FC<PropsType> = (props) => {
    if (!props.activeBooks.length) {
        return <Empty />
    }
    else {
        return (
            <>
                <Row style={{margin: "24px 16px 0"}} gutter={[24, 16]}>
                    {props.activeBooks.map(a => <ActiveBookForListContainer key={a.id} activeBook={a} />)}
                </Row>

                <Pagination style={{display: "flex", justifyContent: "center", marginTop: "100px"}} current={props.pageNumber} total={props.totalActiveBookCount} />
            </>
        )
    }
}

export default AllCurUserActiveBooks;