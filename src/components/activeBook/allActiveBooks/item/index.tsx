import { Col, Progress, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    DeleteOutlined
} from "@ant-design/icons";
import { GetActiveBooksItem } from "../../../../query/activeBooks/models";
import { bookMain, bookTitle } from "../../../books/allBooks/item/styles";
import { ROUT_PAGE_NAME } from "../../../../types/constants";
import ResizableButton from "../../../common/ResizableButton";
import { activeBookApi } from "../../../../api";
import UpdateActiveBook from "./updateActiveBook";
import AddBookOpinion from "../../../bookOpinion/addBookOpinion";
import BookOpinionView from "../../../bookOpinion/bookOpinionView";
import AddBookNote from "./addBookNote";

const ActiveBookForList: React.FC<GetActiveBooksItem> = (activeBook) => {
    const [removeActiveBookButtonLoading, setRemoveActiveBookButtonLoading] = useState(false);

    const onClickRemoveActiveBook = () => {
        setRemoveActiveBookButtonLoading(true);

        activeBookApi.removeActiveBook(activeBook.id).then(_ => {
            //TODO
        });
    }

    const progressPercent: number = Math.round(activeBook.numberPagesRead / activeBook.totalNumberPages * 100);

    return (
        <div className="book-list-block-main">
            <Col span={24} style={bookMain}>
                <Col span={24} style={bookTitle} title={activeBook.book.title}>
                    <Link to={`${ROUT_PAGE_NAME.BOOK_INFO}?bookId=${activeBook.book.id}`} style={{ color: "black" }}>{activeBook.book.title}</Link>
                </Col>
                <Link to={`/book?bookId=${activeBook.book.id}`} style={{ textAlign: "center" }}>
                    <Col span={24} style={{ paddingBottom: "15px" }}>
                        <img height={250} style={{ width: "60%" }} src={"data:image/png;base64," + activeBook.book.imageDataBase64} />
                    </Col>
                </Link>
                <Col span={24}>
                    <Progress percent={progressPercent} />
                </Col>
                <Row>
                    <Col span={17} style={{ marginTop: "10px" }}>
                        <UpdateActiveBook totalNumberPages={activeBook.totalNumberPages} numberPagesRead={activeBook.numberPagesRead} activeBookId={activeBook.id} progressPercent={progressPercent} />
                    </Col>
                    <Col span={4} style={{ marginTop: "10px" }}>
                        <ResizableButton shape="round" type="primary" icon={React.createElement(DeleteOutlined)} onClick={onClickRemoveActiveBook} titleOnResize={"Delete"} loading={removeActiveBookButtonLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col span={17} style={{ marginTop: "10px" }}>
                        {
                            !activeBook.book.hasOpinion
                                ? <AddBookOpinion bookId={activeBook.book.id} />
                                : <BookOpinionView bookId={activeBook.book.id} />
                        }
                    </Col>
                    <Col span={4} style={{ marginTop: "10px" }}>
                        <AddBookNote activeBookId={activeBook.id} />
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

export default ActiveBookForList;