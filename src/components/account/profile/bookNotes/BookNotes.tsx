import React from "react";
import { BookNoteForProfileType } from "../../../../types/bookNote/bookNoteForProfile";
import { Col, Divider, Row } from "antd";
import { Link } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { getuid } from "process";

const BookNotes: React.FC<{ bookNotes: Array<BookNoteForProfileType> }> = (props) => {
    if (props.bookNotes === undefined || props.bookNotes.length === 0) {
        return null;
    }

    return (
        <Col style={{ marginTop: "50px" }}>
            <Divider orientation="center">Last notes</Divider>
            <Row justify="space-around" gutter={[24, 16]} style={{ marginRight: "0px", flexGrow: 2 }}>
                {props.bookNotes.map(n => {
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
                                    <Link to="#">
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
                                borderRadius: "10px"
                            }}>
                                {n.note}
                            </Col>
                        </Col>
                    )
                })}
            </Row>
        </Col>
    )
}

export default BookNotes;