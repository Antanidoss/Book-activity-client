import { Empty, Row } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import BookOfList from "./item";
import BookPagination from "./pagination";
import { FrownOutlined } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/client";
import { GetBooks, GetBooksItem, GET_BOOKS } from "query";
import BookFilter from "./filter";
import { useDispatch, useSelector } from "react-redux";
import { updateBookTotalCount, bookSelectors } from "reduxStore";
import { CustomSpin } from "commonComponents";

const AllBooks: React.FC = () => {
    const bookFilter = useSelector(bookSelectors.filter);
    const pageSize = useSelector(bookSelectors.pageSize);
    const paginationSkip = useSelector(bookSelectors.paginationSkip);

    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<GetBooksItem[]>();

    const dispatch = useDispatch();

    const [getBooks] = useLazyQuery<GetBooks>(GET_BOOKS, {
        fetchPolicy: "network-only",
    });

    const variables = useMemo(() => ({
        skip: paginationSkip,
        take: pageSize,
        averageRatingFrom: bookFilter.averageRatingFrom,
        averageRatingTo: bookFilter.averageRatingTo,
        filter: {
            and: [
                {
                    title: bookFilter.bookTitle === undefined ? undefined : { contains: bookFilter.bookTitle },
                },
                {
                    bookCategories: !bookFilter.categories.length ? undefined : {
                        some: {
                            category: {
                                or: bookFilter.categories.map(c => ({ id: { eq: c.value } }))
                            }
                        }
                    }
                }
            ]
        }
    }), [paginationSkip, pageSize, bookFilter])

    useEffect(() => {
        getBooks({ variables }).then(res => {
            setBooks(res.data?.books.items);
            setLoading(false);
            dispatch(updateBookTotalCount(res.data?.books.totalCount ?? 0));
        })
    }, [getBooks, dispatch, variables])

    if (loading) return <CustomSpin loading={loading} />

    if (!books?.length) return <Empty description="Can't find books" image={React.createElement(FrownOutlined)} imageStyle={{ fontSize: "30px", display: "inline" }} />

    return (
        <>
            <BookFilter />

            <Row justify="space-around" gutter={[24, 16]} style={{ marginRight: "0px" }} wrap={true}>
                {books?.map(b => <BookOfList key={b.id} {...b}></BookOfList>)}
            </Row>

            <BookPagination />
        </>
    );
}

export default AllBooks;