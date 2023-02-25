import { Col, message, Progress, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { bookMain, bookTitle } from "../../books/bookForList/BookForListStyles";
import UpdateActiveBookContainer from "../updateActiveBook/UpdateActiveBookContainer";
import {
    DeleteOutlined
} from "@ant-design/icons";
import { PropsType } from "./ActiveBookForListContainer";
import AddBookOpinionContainer from "../addBookOpinion/AddBookOpinionContainer";
import ResizableButton from "../../common/ResizableButton";
import AddBookNoteContainer from "../addBookNote/AddBookNoteContainer";

const ActiveBookForList: React.FC<PropsType> = (props) => {
    const onClickRemoveActiveBook = () => {
        props.removeActiveBook(props.activeBook.id)
            .then(isSuccess => {
                isSuccess ?  message.success("The book has been successfully removed.", 6) : message.error("Failed to delete active workbook. Try again.", 6)
        });
    }

    const progressPercent: number = Math.round(props.activeBook.numberPagesRead / props.activeBook.totalNumberPages * 100);

    return (
        <div className="book-list-block-main">
            <Col span={24} style={bookMain}>
                <Link to={"#"} style={{ color: "black" }}>
                    <Col span={24} style={bookTitle}>{props.activeBook.bookTitle}</Col>
                </Link>
                <Link to={"#"} style={{ textAlign: "center" }}>
                    <Col span={24} style={{ paddingBottom: "15px" }}>
                        <img height={250} style={{ width: "60%" }} src={"data:image/png;base64," + props.activeBook.imageData} />
                    </Col>
                </Link>
                <Col span={24}>
                    <Progress percent={progressPercent} />
                </Col>
                <Row>
                    <Col span={17} style={{ marginTop: "10px" }}>
                        <UpdateActiveBookContainer totalNumberPages={props.activeBook.totalNumberPages} numberPagesRead={props.activeBook.numberPagesRead} activeBookId={props.activeBook.id} />
                    </Col>
                    <Col span={4} style={{ marginTop: "10px" }}>
                        <ResizableButton shape="round" type="primary" icon={React.createElement(DeleteOutlined)} onClick={onClickRemoveActiveBook} titleOnResize={"Delete"} />
                    </Col>
                </Row>
                <Row>
                    <Col span={17} style={{ marginTop: "10px" }}>
                        <AddBookOpinionContainer
                            bookId={props.activeBook.bookId}
                            bookRatingId={props.activeBook.bookRatingId as string}
                            bookOpinion={props.activeBook.bookOpinion} />
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