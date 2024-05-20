import { Empty, Row, Spin } from "antd";
import React from "react";
import BookOfList from "./item";
import BookPagination from "./pagination";
import { FrownOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { GetBooks } from "../../../query/books/models";
import { GET_BOOKS } from "../../../query";
import { useTransformFilter } from "./useTransformFilter";
import BookFilter from "./filter";

const AllBooks: React.FC = () => {
    const variables = useTransformFilter();

    const {data: books, loading} = useQuery<GetBooks>(GET_BOOKS, {
        fetchPolicy: "cache-first",
        variables
    });

    if (loading) return <div style={{ textAlign: "center", marginTop: "20%" }}><Spin size="large" spinning={loading} /></div>

    if (!books?.books.items.length) return <Empty description="Can't find books" image={React.createElement(FrownOutlined)} imageStyle={{fontSize: "30px", display: "inline"}} />

    return (
        <>
            <BookFilter />

            <Row justify="space-around" gutter={[24, 16]} style={{marginRight: "0px"}} wrap={true}>
                {books?.books.items.map(b => <BookOfList key={b.id} {...b}></BookOfList>)}
            </Row>

            <BookPagination />
        </>
    );
}

export default AllBooks;