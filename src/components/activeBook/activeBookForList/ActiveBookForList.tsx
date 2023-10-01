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
                <Link to={"#"} style={{ color: "black" }}>
                    <Col span={24} style={bookTitle}>{props.activeBook.book.title}</Col>
                </Link>
                <Link to={"#"} style={{ textAlign: "center" }}>
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
                            !props.activeBook.hasOpinion
                                ? <AddBookOpinionContainer
                                    bookId={props.activeBook.book.id}
                                    bookRatingId={props.activeBook.book.bookRatingId as string} />
                                : <BookOpinionViewContainer
                                    bookId={props.activeBook.book.id}
                                    bookRatingId={props.activeBook.book.bookRatingId as string} />
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