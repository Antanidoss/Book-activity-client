import { Empty, Row } from "antd";
import React, { useEffect, useState } from "react";
import BookOfList from "./item";
import BookPagination from "./pagination";
import { FrownOutlined } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/client";
import { GetBooks, GetBooksItem } from "../../../query/books/models";
import { GET_BOOKS } from "../../../query";
import BookFilter from "./filter";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalCount } from "../../../redux/books/slice";
import CustomSpin from "../../common/CustomSpin";
import { getBookFilter, getPageSize, getPaginationSkip } from "../../../redux/books/selectors";

const AllBooks: React.FC = () => {
    const bookFilter = useSelector(getBookFilter);
    const pageSize = useSelector(getPageSize);
    const paginationSkip = useSelector(getPaginationSkip);

    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<GetBooksItem[]>();

    const dispatch = useDispatch();

    const [getBooks] = useLazyQuery<GetBooks>(GET_BOOKS, {
        fetchPolicy: "network-only",
    });
    
    useEffect(() => {
        const variables = {
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
        }

        getBooks({variables}).then(res => {
            setBooks(res.data?.books.items);
            setLoading(false);
            dispatch(updateTotalCount(res.data?.books.totalCount ?? 0));
        })
    }, [getBooks, dispatch, bookFilter, pageSize, paginationSkip])

    if (loading) return <CustomSpin loading={loading} />

    if (!books?.length) return <Empty description="Can't find books" image={React.createElement(FrownOutlined)} imageStyle={{fontSize: "30px", display: "inline"}} />

    return (
        <>
            <BookFilter />

            <Row justify="space-around" gutter={[24, 16]} style={{marginRight: "0px"}} wrap={true}>
                {books?.map(b => <BookOfList key={b.id} {...b}></BookOfList>)}
            </Row>

            <BookPagination />
        </>
    );
}

export default AllBooks;