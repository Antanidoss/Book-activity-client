import { Row } from 'antd';
import React from 'react'
import ActiveBookForList from './activeBookForList/ActiveBookForList';
import { PropsType } from './AllCurUserActiveBooksContainer'

const AllCurUserActiveBooks: React.FC<PropsType> = (props) => {
    return (
        <Row gutter={[24, 16]}>
            {props.activeBooks.map(a => <ActiveBookForList {...a}></ActiveBookForList>)}
        </Row>
    )
}

export default AllCurUserActiveBooks;