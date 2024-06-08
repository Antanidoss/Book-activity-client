import React, { useState } from 'react';
import { Button, Col, Rate, Row, Statistic } from 'antd'
import { Link } from 'react-router-dom';
import { bookMain, bookTitle } from './styles';
import {
    CheckOutlined
} from "@ant-design/icons";
import { ROUT_PAGE_NAME } from '../../../../common/constants';
import { GetBooksItem } from 'query';
import AddActiveBook from '../../../activeBook/addActiveBook';

const BookOfList: React.FC<GetBooksItem> = (book) => {
    const [bookState, setBook] = useState(book);

    return (
        <div className="book-list-block-main">
            <Col span={24} style={bookMain}>
                <Col span={24} style={bookTitle} title={bookState.title}>
                    <Link to={`${ROUT_PAGE_NAME.BOOK_INFO}?bookId=${bookState.id}`} style={{ color: "black" }}>{bookState.title}</Link>
                </Col>
                <Link to={`/book?bookId=${bookState.id}`} style={{ textAlign: "center" }}>
                    <Col span={24} style={{ paddingBottom: "15px" }}>
                        <img height={250} style={{ width: "60%" }} src={"data:image/png;base64," + bookState.imageDataBase64} />
                    </Col>
                </Link>
                <Col span={24} style={{ top: "40px" }}>
                    <Statistic prefix="Users rated:" style={{ float: "right", marginRight: "12px" }} valueStyle={{ fontSize: "11px" }} value={bookState.bookOpinionsCount ?? 0} />
                </Col>
                <Row style={{ marginTop: "55px" }}>
                    <Col span={12} style={{ left: "10px" }}>
                        {
                            bookState.isActiveBook
                                ? <Button shape="round" type="primary" icon={React.createElement(CheckOutlined)}>Is active</Button>
                                : <AddActiveBook bookId={bookState.id} onAddActiveBookSuccess={() => setBook({...bookState, isActiveBook: true})} />
                        }
                    </Col>
                    <Col span={12}>
                        <Rate style={{ float: "right", marginRight: "15px" }} value={bookState.averageRating} disabled allowHalf></Rate>
                    </Col>
                </Row>
            </Col>
        </div>
    );
}

export default BookOfList;