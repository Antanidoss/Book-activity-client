import { Button, Col, Dropdown, Progress, Row, message } from "antd";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
    CommentOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    PushpinOutlined
} from "@ant-design/icons";
import { GetActiveBooksItem } from "query";
import { bookMain, bookTitle } from "../../../books/allBooks/item/styles";
import { activeBookApi, isBadStatusCode } from "api";
import UpdateActiveBook from "./updateActiveBook";
import AddBookOpinion from "../../../bookOpinion/addBookOpinion";
import BookOpinionView from "../../../bookOpinion/bookOpinionView";
import AddBookNote from "./addBookNote";
import { ROUT_PAGE_NAME } from "common";

const ActiveBookForList: React.FC<{ activeBook: GetActiveBooksItem, onRemoveActiveBook: (activeBookId: string) => void }> = ({ activeBook, onRemoveActiveBook }) => {
    const [activeBookState, setActiveBook] = useState(activeBook);

    const onClickRemoveActiveBook = useCallback(() => {
        activeBookApi.removeActiveBook(activeBookState.id).then(res => {
            if (isBadStatusCode(res.status)) {
                message.error("The active book could not be deleted, please try again", 6);
            } else {
                onRemoveActiveBook(activeBookState.id);
                message.success("Active book has been successfully deleted", 6);
            }
        });
    }, [activeBookState.id, onRemoveActiveBook]);

    const onAddBookOpinion = () => {
        setActiveBook({
            ...activeBookState,
            book: {
                ...activeBookState.book,
                hasOpinion: true
            }
        })
    }

    const onUpdatenNumberPagesRead = (numberPagesRead: number) => {
        setActiveBook({...activeBookState, numberPagesRead})
    }

    const progressPercent: number = Math.round(activeBookState.numberPagesRead / activeBookState.totalNumberPages * 100);

    const actionItems = [
        {
            key: "1",
            label: <UpdateActiveBook
                trigger={<><EditOutlined /> Edit</>}
                activeBook={activeBookState}
                onUpdate={onUpdatenNumberPagesRead} />,
        },
        {
            key: "2",
            label: <Col onClick={onClickRemoveActiveBook}><DeleteOutlined /> Remove</Col>,
        },
        activeBookState.book.hasOpinion ?
            {
                key: "3",
                label: <BookOpinionView
                    trigger={<><CommentOutlined /> Look review</>}
                    bookId={activeBook.book.id} />,
            } : {
                key: "4",
                label: <AddBookOpinion
                    onAddBookOpinion={onAddBookOpinion}
                    trigger={<><CommentOutlined /> Add review</>}
                    bookId={activeBook.book.id} />,
            },
        {
            key: "5",
            label: <AddBookNote
                triger={<><PushpinOutlined /> Add note</>}
                activeBookId={activeBookState.id} />,
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

                <Link to={`${ROUT_PAGE_NAME.BOOK_INFO}?bookId=${activeBookState.book.id}`} style={{ textAlign: "center" }}>
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