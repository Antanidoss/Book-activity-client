import { Col, Pagination, Row } from "antd";
import React from "react";
import { PropsType } from "./AllBooksContainer";
import Book from "./bookForList/BookForList";

const AllBooks: React.FC<PropsType> = (props) => {
    const books = props.books.map(b => <Book key={b.id} {...b}></Book>)
    return (
        <>
            <Row justify="space-around" gutter={[24, 16]}>
                {books}
            </Row>

            <Pagination style={{display: "flex", justifyContent: "center", marginTop: "100px"}} current={props.pageNumber} total={props.totalBookCount} />
        </>
    );
}

export default AllBooks;