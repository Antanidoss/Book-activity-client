import React from "react";
import { BookNoteForProfileType } from "../../../../types/bookNote/bookNoteForProfile";
import { Col, Divider, Row } from "antd";
import { Link } from "react-router-dom";

const BookNotes: React.FC<{ bookNotes: Array<BookNoteForProfileType> }> = (props) => {
    if (props.bookNotes === undefined || props.bookNotes.length === 0){
        return null;
    }

    return (
        <Col style={{ marginTop: "50px" }}>
            <Divider orientation="center">Last notes</Divider>
            <Row justify="space-around" gutter={[24, 16]} style={{ marginRight: "0px" }}>
                {props.bookNotes.map(n => {
                    return (
                        <Col style={{
                            border: "3px solid rgb(8 68 124)",
                            borderRadius: "15px",
                            height: "300px",
                            width: "270px",
                            backgroundColor: n.noteColor,
                        }}>
                            <Link to="#" style={{ color: "white" }}>
                                <h4>{n.activeBook.book.title}</h4>
                            </Link>
                            {n.note}
                        </Col>
                    )
                })}
            </Row>
        </Col>
    )
}

export default BookNotes;