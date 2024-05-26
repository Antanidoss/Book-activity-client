import { Empty, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import BookOfList from "./item";
import BookPagination from "./pagination";
import { FrownOutlined } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/client";
import { GetBooks, GetBooksItem } from "../../../query/books/models";
import { GET_BOOKS } from "../../../query";
import { useTransformFilter } from "./useTransformFilter";
import BookFilter from "./filter";
import { useDispatch } from "react-redux";
import { updateTotalCount } from "../../../redux/books/slice";

const AllBooks: React.FC = () => {
    const variables = useTransformFilter();
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<GetBooksItem[]>();

    const dispatch = useDispatch();

    const [getBooks] = useLazyQuery<GetBooks>(GET_BOOKS, {
        fetchPolicy: "cache-first",
        variables
    });

    useEffect(() => {
        getBooks().then(res => {
            setBooks(res.data?.books.items);
            setLoading(false);
            dispatch(updateTotalCount(res.data?.books.totalCount ?? 0));
        })
    }, [getBooks, dispatch])

    if (loading) return <div style={{ textAlign: "center", marginTop: "20%" }}><Spin size="large" spinning={loading} /></div>

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