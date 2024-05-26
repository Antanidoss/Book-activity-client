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
    const [activeBookState, setActiveBook] = useState(activeBook);

    const onClickRemoveActiveBook = () => {
        setRemoveActiveBookButtonLoading(true);

        activeBookApi.removeActiveBook(activeBook.id).then(_ => {
            //TODO
        });
    }

    const progressPercent: number = Math.round(activeBookState.numberPagesRead / activeBookState.totalNumberPages * 100);

    return (
        <div className="book-list-block-main">
            <Col span={24} style={bookMain}>
                <Col span={24} style={bookTitle} title={activeBookState.book.title}>
                    <Link to={`${ROUT_PAGE_NAME.BOOK_INFO}?bookId=${activeBookState.book.id}`} style={{ color: "black" }}>{activeBookState.book.title}</Link>
                </Col>
                <Link to={`/book?bookId=${activeBookState.book.id}`} style={{ textAlign: "center" }}>
                    <Col span={24} style={{ paddingBottom: "15px" }}>
                        <img height={250} style={{ width: "60%" }} src={"data:image/png;base64," + activeBookState.book.imageDataBase64} />
                    </Col>
                </Link>
                <Col span={24}>
                    <Progress percent={progressPercent} />
                </Col>
                <Row>
                    <Col span={17} style={{ marginTop: "10px" }}>
                        <UpdateActiveBook activeBook={activeBookState} setActiveBook={setActiveBook} progressPercent={progressPercent} />
                    </Col>
                    <Col span={4} style={{ marginTop: "10px" }}>
                        <ResizableButton shape="round" type="primary" icon={React.createElement(DeleteOutlined)} onClick={onClickRemoveActiveBook} titleOnResize={"Delete"} loading={removeActiveBookButtonLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col span={17} style={{ marginTop: "10px" }}>
                        {
                            !activeBookState.book.hasOpinion
                                ? <AddBookOpinion bookId={activeBook.book.id} />
                                : <BookOpinionView bookId={activeBook.book.id} />
                        }
                    </Col>
                    <Col span={4} style={{ marginTop: "10px" }}>
                        <AddBookNote activeBookId={activeBookState.id} />
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

export default ActiveBookForList;