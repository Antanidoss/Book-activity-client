import { Button, Col, message, Progress, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { ActiveBook } from "../../../types/activeBookType";
import { bookMain, bookTitle } from "../../books/bookForList/BookForListStyles";
import UpdateActiveBookContainer from "../updateActiveBook/UpdateActiveBookContainer";
import {
    DeleteOutlined
} from "@ant-design/icons";
import { removeActiveBookThunkCreator } from "../../../redux/activeBook-reducer";

const ActiveBookForList: React.FC<PropsType> = (props) => {
    const onClickRemoveActiveBook = () => {
        props.removeActiveBook(props.activeBook.id);
        message.success("The book has been successfully removed", 6);
    }

    let progressPercent: number = Math.round(props.activeBook.numberPagesRead / props.activeBook.totalNumberPages * 100);

    return (
        <Col span={5}>
            <Col span={24} style={bookMain}>
                <Link to={"#"} style={{ color: "black" }}>
                    <Col span={24} style={bookTitle}>{props.activeBook.bookName}</Col>
                </Link>
                <Link to={"#"} style={{ textAlign: "center" }}>
                    <Col span={24} style={{ paddingBottom: "15px" }}>
                        <img height={250} style={{ width: "50%" }} src={"data:image/png;base64," + props.activeBook.imageData} />
                    </Col>
                </Link>
                <Col span={24}>
                    <Progress percent={progressPercent} />
                </Col>
                <Row>
                    <Col span={4} style={{ marginTop: "20px" }}>
                        <UpdateActiveBookContainer activeBookId={props.activeBook.id} />
                    </Col>
                    <Col span={4} style={{ marginTop: "20px" }}>
                        <Button shape="round" type="primary" icon={React.createElement(DeleteOutlined)} onClick={onClickRemoveActiveBook} />
                    </Col>
                </Row>
            </Col>
        </Col>
    )
}

export type PropsType = { 
    activeBook: ActiveBook,
    removeActiveBook: typeof removeActiveBookThunkCreator
}

export default ActiveBookForList;