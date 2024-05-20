import { Empty, Row, Spin } from 'antd';
import React from 'react'
import { FrownOutlined } from '@ant-design/icons';
import { useTransformFilter } from './useTransformFilter';
import { GetActiveBooks } from '../../../query/activeBooks/models';
import { GET_ACTIVE_BOOKS } from '../../../query';
import { useQuery } from '@apollo/client';
import ActiveBookPagination from './pagination';
import ActiveBookFilter from './filter';
import ActiveBookForList from './item';

const AllCurUserActiveBooks: React.FC = () => {
    const variables = useTransformFilter();

    const {data: activeBooks, loading} = useQuery<GetActiveBooks>(GET_ACTIVE_BOOKS, {
        fetchPolicy: "cache-first",
        variables
    });

    if (loading) return <div style={{ textAlign: "center", marginTop: "20%" }}><Spin size="large" spinning={loading} /></div>

    if (!activeBooks?.activeBooks.items.length) return <Empty description="You don't have any active books" image={React.createElement(FrownOutlined)} imageStyle={{fontSize: "30px", display: "inline"}} />
    
    return (
        <>
            <ActiveBookFilter />

            <Row justify="space-around" gutter={[24, 16]} style={{marginRight: "0px"}}>
                { activeBooks.activeBooks.items.map(a => <ActiveBookForList key={a.id} {...a} />) }
            </Row>

            <ActiveBookPagination />
        </>
    )
}

export default AllCurUserActiveBooks;