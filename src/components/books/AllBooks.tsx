import { Empty, Pagination, Row } from "antd";
import React from "react";
import { PropsType } from "./AllBooksContainer";
import Book from "./bookForList/BookForList";
import BookPaginationContainer from "./bookPagination/BookPaginationContainer";

const AllBooks: React.FC<PropsType> = (props) => {
    if (!props.books.length) {
        return <Empty description="Can't find books" />
    }

    return (
        <>
            <Row justify="space-around" gutter={[24, 16]} style={{marginRight: "0px"}} wrap={true}>
                {props.books.map(b => <Book key={b.id} {...b}></Book>)}
            </Row>

            <BookPaginationContainer />
        </>
    );
}

export default AllBooks;