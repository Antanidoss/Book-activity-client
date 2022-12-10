import { Empty, Row } from 'antd';
import React from 'react'
import ActiveBookFilterContainer from './activeBookFilter/ActiveBookFilterContainer';
import ActiveBookForListContainer from './activeBookForList/ActiveBookForListContainer';
import ActiveBookPaginationContainer from './activeBookPagination/ActiveBookPaginationContainer';
import { PropsType } from './AllActiveBooksCurUserContainer'

const AllCurUserActiveBooks: React.FC<PropsType> = (props) => {
    if (!props.activeBooks.length) {
        return <Empty />
    }
    
    return (
        <>
            <ActiveBookFilterContainer />

            <Row justify="space-around" gutter={[24, 16]} style={{marginRight: "0px"}}>
                {props.activeBooks.map(a => <ActiveBookForListContainer key={a.id} activeBook={a} />)}
            </Row>

            <ActiveBookPaginationContainer />
        </>
    )
}

export default AllCurUserActiveBooks;