import { Button, Col, Dropdown, Progress, Row, message } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    DeleteOutlined,
    EllipsisOutlined
} from "@ant-design/icons";
import { GetActiveBooksItem } from "../../../../query/activeBooks/models";
import { action, bookMain, bookTitle } from "../../../books/allBooks/item/styles";
import { activeBookApi } from "../../../../api";
import UpdateActiveBook from "./updateActiveBook";
import AddBookOpinion from "../../../bookOpinion/addBookOpinion";
import BookOpinionView from "../../../bookOpinion/bookOpinionView";
import AddBookNote from "./addBookNote";
import { isBadStatusCode } from "../../../../api/instanceAxios";
import { ROUT_PAGE_NAME } from "../../../../common/constants";

const ActiveBookForList: React.FC<{ activeBook: GetActiveBooksItem, onRemoveActiveBook: (activeBook: GetActiveBooksItem) => void }> = ({ activeBook, onRemoveActiveBook }) => {
    const [activeBookState, setActiveBook] = useState(activeBook);

    const onClickRemoveActiveBook = () => {
        activeBookApi.removeActiveBook(activeBook.id).then(res => {
            if (isBadStatusCode(res.status)) {
                message.error("The active book could not be deleted, please try again", 6);
            } else {
                onRemoveActiveBook(activeBook);
                message.success("Active book has been successfully deleted", 6);
            }
        });
    }

    const progressPercent: number = Math.round(activeBookState.numberPagesRead / activeBookState.totalNumberPages * 100);

    const actionItems = [
        {
            key: "1",
            label: <UpdateActiveBook activeBook={activeBookState} setActiveBook={setActiveBook} progressPercent={progressPercent} />,
        },
        {
            key: "2",
            label: <Col onClick={onClickRemoveActiveBook}><DeleteOutlined /> Remove</Col>,
        },
        activeBookState.book.hasOpinion ?
            {
                key: "3",
                label: <BookOpinionView bookId={activeBook.book.id} />,
            } : {
                key: "4",
                label: <AddBookOpinion bookId={activeBook.book.id} />,
            },
        {
            key: "5",
            label: <AddBookNote activeBookId={activeBookState.id} />,
        },
    ];
    const actionMenuProps = {
        items: actionItems,
    };

    return (
        <div className="book-list-block-main">
            <Col span={24} style={bookMain}>
                <Row>
                    <Col span={24} style={bookTitle} title={activeBookState.book.title}>
                        <Link to={`${ROUT_PAGE_NAME.BOOK_INFO}?bookId=${activeBookState.book.id}`} style={{ color: "black" }}>{activeBookState.book.title}</Link>
                    </Col>

                </Row>

                <Link to={`/${ROUT_PAGE_NAME.BOOK_INFO}?bookId=${activeBookState.book.id}`} style={{ textAlign: "center" }}>
                    <Col span={24} style={{ paddingBottom: "15px" }}>
                        <img height={250} style={{ width: "60%" }} src={"data:image/png;base64," + activeBookState.book.imageDataBase64} />
                    </Col>
                </Link>
                <Row>
                    <Col span={21}>
                        <Progress percent={progressPercent} />
                    </Col>
                    <Col>
                        <Dropdown menu={actionMenuProps} >
                            <Button icon={React.createElement(EllipsisOutlined)} style={{ marginLeft: "5px" }} type="primary"></Button>
                        </Dropdown>
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

export default ActiveBookForList;