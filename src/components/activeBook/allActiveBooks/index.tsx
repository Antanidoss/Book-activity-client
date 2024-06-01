import { Empty, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { FrownOutlined } from '@ant-design/icons';
import { GetActiveBooks, GetActiveBooksItem } from '../../../query/activeBooks/models';
import { GET_ACTIVE_BOOKS } from '../../../query';
import { useLazyQuery } from '@apollo/client';
import ActiveBookPagination from './pagination';
import ActiveBookFilter from './filter';
import ActiveBookForList from './item';
import CustomSpin from '../../common/CustomSpin';
import { useSelector } from 'react-redux';
import { getFilter, getPageSize, getPaginationSkip } from '../../../redux/activeBooks/selectors';
import { SortBy } from '../../../common/models/activeBooks';
import { Order } from '../../../query/apolloClient';
import { useDispatch } from 'react-redux';
import { updateTotalCount } from '../../../redux/activeBooks/slice';

const AllCurUserActiveBooks: React.FC = () => {
    const activeBookFilter = useSelector(getFilter);
    const pageSize = useSelector(getPageSize);
    const paginationSkip = useSelector(getPaginationSkip);

    const [loading, setLoading] = useState(true);
    const [activeBooks, setActiveBooks] = useState<GetActiveBooksItem[]>();

    const dispatch = useDispatch();

    const [getActiveBooks] = useLazyQuery<GetActiveBooks>(GET_ACTIVE_BOOKS, {
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        let order = activeBookFilter.sortBy === SortBy.CreateDate
            ? { timeOfCreation: Order.ASC }
            : { timeOfCreation: Order.DESC };

        const variables = {
            skip: paginationSkip,
            take: pageSize,
            withFullRead: activeBookFilter.withFullRead,
            order,
            filter: activeBookFilter.bookTitle === undefined ? undefined : {
                and: [
                    {
                        book: { title: { contains: activeBookFilter.bookTitle } },
                    },
                ]
            }
        }

        getActiveBooks({ variables }).then(res => {
            setLoading(false);
            setActiveBooks(res.data?.activeBooks.items);
            dispatch(updateTotalCount(res.data?.activeBooks.totalCount ?? 0));
        })
    }, [activeBookFilter, pageSize, paginationSkip, getActiveBooks, dispatch]);

    if (loading) return <CustomSpin loading={loading} />

    if (!activeBooks?.length) return <Empty description="You don't have any active books" image={React.createElement(FrownOutlined)} imageStyle={{ fontSize: "30px", display: "inline" }} />

    const onRemoveActiveBook = (activeBook: GetActiveBooksItem) => {
        setActiveBooks(activeBooks.filter(a => a.id !== activeBook.id));
    }

    return (
        <>
            <ActiveBookFilter />

            <Row justify="space-around" gutter={[24, 16]} style={{ marginRight: "0px" }}>
                {activeBooks.map(a => <ActiveBookForList key={a.id} activeBook={a} onRemoveActiveBook={onRemoveActiveBook} />)}
            </Row>

            <ActiveBookPagination />
        </>
    )
}

export default AllCurUserActiveBooks;