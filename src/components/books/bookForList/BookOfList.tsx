import React from 'react';
import { BookOfListType } from '../../../types/books/bookOfListType';
import { Button, Col, Rate, Row, Statistic } from 'antd'
import { Link } from 'react-router-dom';
import { bookMain, bookTitle } from './BookForListStyles';
import AddActiveBookContainer from '../../activeBook/addActiveBook/AddActiveBookContainer';
import {
    CheckOutlined
} from "@ant-design/icons";
import { arrayBufferToBase64 } from '../../../utils/imageUtil';

const BookOfList: React.FC<BookOfListType> = (book) => {
    return (
        <div className="book-list-block-main">
            <Col span={24} style={bookMain}>
                <Link to={"#"} style={{ color: "black" }}>
                    <Col span={24} style={bookTitle}>{book.title}</Col>
                </Link>
                <Link to={"#"} style={{ textAlign: "center" }}>
                    <Col span={24} style={{ paddingBottom: "15px" }}>
                        <img height={250} style={{ width: "60%" }} src={"data:image/png;base64," + book.imageDataBase64} />
                    </Col>
                </Link>
                <Col span={24} style={{top: "40px"}}>
                    <Statistic prefix="Users rated:" style={{float: "right", marginRight: "12px"}} valueStyle={{fontSize: "11px"}} value={book.bookOpinionsCount} />
                </Col>
                <Row style={{marginTop: "55px"}}>
                    <Col span={12} style={{ left: "10px"}}>
                        {
                            book.isActiveBook
                                ? <Button shape="round" type="primary" icon={React.createElement(CheckOutlined)}>Is active</Button>
                                : <AddActiveBookContainer bookId={book.id} />
                        }
                    </Col>
                    <Col span={12}>
                        <Rate style={{ float: "right", marginRight: "15px" }} value={book.bookRating.averageRating} disabled allowHalf></Rate>
                    </Col>
                </Row>
            </Col>
        </div>
    );
}

export default BookOfList;