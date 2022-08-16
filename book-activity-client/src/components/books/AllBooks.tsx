import { Row } from "antd";
import React from "react";
import { PropsType } from "./AllBooksContainer";
import Book from "./bookForList/BookForList";

const AllBooks: React.FC<PropsType> = (props) => {
    let books = props.books.map(b => <Book key={b.id} {...b}></Book>)
    return (
        <Row gutter={[24, 16]}>
            { books }
        </Row>
    );
}

export default AllBooks;