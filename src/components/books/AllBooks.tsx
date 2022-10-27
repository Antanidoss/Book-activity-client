import { Empty, Pagination, Row } from "antd";
import React from "react";
import { PropsType } from "./AllBooksContainer";
import Book from "./bookForList/BookForList";
import BookFilterContainer from "./bookFilter/BookFilterContainer";

const AllBooks: React.FC<PropsType> = (props) => {
    if (!props.books.length) {
        return <Empty description="Can't find books" />
    }

    return (
        <>
            <Row justify="space-around" gutter={[24, 16]} style={{marginRight: "0px"}}>
                {props.books.map(b => <Book key={b.id} {...b}></Book>)}
            </Row>

            <Pagination style={{display: "flex", justifyContent: "center", marginTop: "100px"}} current={props.pageNumber} total={props.totalBookCount} />
        </>
    );
}

export default AllBooks;