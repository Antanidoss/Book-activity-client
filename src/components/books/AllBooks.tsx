import { Empty, Row } from "antd";
import React from "react";
import { PropsType } from "./AllBooksContainer";
import BookOfList from "./bookForList/BookOfList";
import BookPaginationContainer from "./bookPagination/BookPaginationContainer";
import { FrownOutlined } from "@ant-design/icons";

const AllBooks: React.FC<PropsType> = (props) => {
    if (!props.books.length) {
        return <Empty description="Can't find books" image={React.createElement(FrownOutlined)} imageStyle={{fontSize: "30px", display: "inline"}} />
    }

    return (
        <>
            <Row justify="space-around" gutter={[24, 16]} style={{marginRight: "0px"}} wrap={true}>
                {props.books.map(b => <BookOfList key={b.id} {...b}></BookOfList>)}
            </Row>

            <BookPaginationContainer />
        </>
    );
}

export default AllBooks;