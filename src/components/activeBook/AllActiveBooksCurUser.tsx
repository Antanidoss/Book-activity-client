import { Empty, Row } from 'antd';
import React from 'react'
import ActiveBookFilterContainer from './activeBookFilter/ActiveBookFilterContainer';
import ActiveBookForListContainer from './activeBookForList/ActiveBookForListContainer';
import ActiveBookPaginationContainer from './activeBookPagination/ActiveBookPaginationContainer';
import { PropsType } from './AllActiveBooksCurUserContainer'
import { FrownOutlined } from '@ant-design/icons';

const AllCurUserActiveBooks: React.FC<PropsType> = (props) => {
    if (!props.activeBooks.length) {
        return (
            <>
                <ActiveBookFilterContainer />
                <Empty description="You don't have any active books" image={React.createElement(FrownOutlined)} imageStyle={{fontSize: "30px", display: "inline"}} />
            </>
        )
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