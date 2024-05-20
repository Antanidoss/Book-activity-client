import React from "react";
import { Col, Divider, Row } from "antd";
import { Link } from "react-router-dom";
import { GetLastBookNotesType } from "../../../../query/bookNotes/models";

const BookNotes: React.FC<{ getLastBookNotes: GetLastBookNotesType }> = (props) => {
    const bookNotes = props.getLastBookNotes.bookNotes.items;

    if (bookNotes === undefined || bookNotes.length === 0) {
        return null;
    }

    return (
        <Col style={{ marginTop: "50px" }}>
            <Divider orientation="center">Last notes</Divider>
            <Row justify="space-around" gutter={[24, 16]} style={{ marginRight: "0px", flexGrow: 2 }}>
                {bookNotes.map(n => {
                    return (
                        <Col key={n.id} style={{
                            border: "3px solid rgb(8 68 124)",
                            borderRadius: "15px",
                            height: "500px",
                            width: "450px",
                            marginLeft: "20px",
                        }}>
                            <Col>
                                <Divider orientation="center">
                                    <Link to={`/book?bookId=${n.activeBook.book.id}`}>
                                        {n.activeBook.book.title}
                                    </Link>
                                </Divider>
                            </Col>
                            <Col style={{
                                overflowY: "scroll",
                                backgroundColor: n.noteColor,
                                height: "400px",
                                fontSize: "17px",
                                maxHeight: "400px",
                                color: n.noteTextColor,
                                whiteSpace: "pre-line",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                „{n.note}“
                            </Col>
                        </Col>
                    )
                })}
            </Row>
        </Col>
    )
}

export default BookNotes;