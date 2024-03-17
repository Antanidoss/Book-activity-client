import { Col, message, Progress, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { bookMain, bookTitle } from "../../books/bookForList/BookForListStyles";
import UpdateActiveBookContainer from "./updateActiveBook/UpdateActiveBookContainer";
import {
    DeleteOutlined
} from "@ant-design/icons";
import { PropsType } from "./ActiveBookForListContainer";
import AddBookOpinionContainer from "./addBookOpinion/AddBookOpinionContainer";
import ResizableButton from "../../common/ResizableButton";
import AddBookNoteContainer from "./addBookNote/AddBookNoteContainer";
import BookOpinionViewContainer from "./bookOpinionView/BookOpinionViewContainer";
import { ROUT_PAGE_NAME } from "../../../types/constants";

const ActiveBookForList: React.FC<PropsType> = (props) => {
    const [removeActiveBookButtonLoading, setRemoveActiveBookButtonLoading] = useState(false);

    const onClickRemoveActiveBook = () => {
        setRemoveActiveBookButtonLoading(true);

        props.removeActiveBook(props.activeBook.id)
            .then(isSuccess => {
                isSuccess ? message.success("The book has been successfully removed.", 6) : message.error("Failed to delete active workbook. Try again.", 6)
                setRemoveActiveBookButtonLoading(false);
            });
    }

    const progressPercent: number = Math.round(props.activeBook.numberPagesRead / props.activeBook.totalNumberPages * 100);

    return (
        <div className="book-list-block-main">
            <Col span={24} style={bookMain}>
                <Col span={24} style={bookTitle} title={props.activeBook.book.title}>
                    <Link to={`${ROUT_PAGE_NAME.BOOK_INFO}?bookId=${props.activeBook.book.id}`} style={{ color: "black" }}>{props.activeBook.book.title}</Link>
                </Col>
                <Link to={`/book?bookId=${props.activeBook.book.id}`} style={{ textAlign: "center" }}>
                    <Col span={24} style={{ paddingBottom: "15px" }}>
                        <img height={250} style={{ width: "60%" }} src={"data:image/png;base64," + props.activeBook.book.imageDataBase64} />
                    </Col>
                </Link>
                <Col span={24}>
                    <Progress percent={progressPercent} />
                </Col>
                <Row>
                    <Col span={17} style={{ marginTop: "10px" }}>
                        <UpdateActiveBookContainer totalNumberPages={props.activeBook.totalNumberPages} numberPagesRead={props.activeBook.numberPagesRead} activeBookId={props.activeBook.id} disableButton={progressPercent == 100} />
                    </Col>
                    <Col span={4} style={{ marginTop: "10px" }}>
                        <ResizableButton shape="round" type="primary" icon={React.createElement(DeleteOutlined)} onClick={onClickRemoveActiveBook} titleOnResize={"Delete"} loading={removeActiveBookButtonLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col span={17} style={{ marginTop: "10px" }}>
                        {
                            !props.activeBook.book.hasOpinion
                                ? <AddBookOpinionContainer bookId={props.activeBook.book.id} />
                                : <BookOpinionViewContainer bookId={props.activeBook.book.id} />
                        }
                    </Col>
                    <Col span={4} style={{ marginTop: "10px" }}>
                        <AddBookNoteContainer activeBookId={props.activeBook.id} />
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

export default ActiveBookForList;