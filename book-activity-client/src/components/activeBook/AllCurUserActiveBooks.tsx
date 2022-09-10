import { Empty, Row } from 'antd';
import React from 'react'
import ActiveBookForListContainer from './activeBookForList/ActiveBookForListContainer';
import { PropsType } from './AllCurUserActiveBooksContainer'

const AllCurUserActiveBooks: React.FC<PropsType> = (props) => {
    if (!props.activeBooks.length) {
        return <Empty />
    }
    else {
        return (
            <Row gutter={[24, 16]}>
                {props.activeBooks.map(a => <ActiveBookForListContainer key={a.id} activeBook={a} />)}
            </Row>
        )
    }
}

export default AllCurUserActiveBooks;