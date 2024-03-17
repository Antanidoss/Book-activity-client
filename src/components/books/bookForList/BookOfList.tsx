import React from 'react';
import { Button, Col, Rate, Row, Statistic } from 'antd'
import { Link } from 'react-router-dom';
import { bookMain, bookTitle } from './BookForListStyles';
import AddActiveBookContainer from '../../activeBook/addActiveBook/AddActiveBookContainer';
import {
    CheckOutlined
} from "@ant-design/icons";
import { BookOfListType } from '../../../redux/types/books/bookOfListType';
import { ROUT_PAGE_NAME } from '../../../types/constants';

const BookOfList: React.FC<BookOfListType> = (book) => {
    return (
        <div className="book-list-block-main">
            <Col span={24} style={bookMain}>
                <Col span={24} style={bookTitle} title={book.title}>
                    <Link to={`${ROUT_PAGE_NAME.BOOK_INFO}?bookId=${book.id}`} style={{ color: "black" }}>{book.title}</Link>
                </Col>
                <Link to={`/book?bookId=${book.id}`} style={{ textAlign: "center" }}>
                    <Col span={24} style={{ paddingBottom: "15px" }}>
                        <img height={250} style={{ width: "60%" }} src={"data:image/png;base64," + book.imageDataBase64} />
                    </Col>
                </Link>
                <Col span={24} style={{ top: "40px" }}>
                    <Statistic prefix="Users rated:" style={{ float: "right", marginRight: "12px" }} valueStyle={{ fontSize: "11px" }} value={book?.bookOpinions?.totalCount ?? 0} />
                </Col>
                <Row style={{ marginTop: "55px" }}>
                    <Col span={12} style={{ left: "10px" }}>
                        {
                            book.isActiveBook
                                ? <Button shape="round" type="primary" icon={React.createElement(CheckOutlined)}>Is active</Button>
                                : <AddActiveBookContainer bookId={book.id} />
                        }
                    </Col>
                    <Col span={12}>
                        <Rate style={{ float: "right", marginRight: "15px" }} value={book.averageRating} disabled allowHalf></Rate>
                    </Col>
                </Row>
            </Col>
        </div>
    );
}

export default BookOfList;