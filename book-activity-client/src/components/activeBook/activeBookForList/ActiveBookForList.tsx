import { Col, Progress } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { ActiveBook } from "../../../types/activeBookType";
import { bookMain, bookTitle } from "../../books/bookForList/BookForListStyles";
import UpdateActiveBookContainer from "../updateActiveBook/UpdateActiveBookContainer";

const ActiveBookForList: React.FC<ActiveBook> = (props) => {
    let progressPercent: number = Math.round(props.numberPagesRead / props.totalNumberPages * 100);

    return (
        <Col span={5}>
            <Col span={24} style={bookMain}>
                <Link to={"#"} style={{ color: "black" }}>
                    <Col span={24} style={bookTitle}>{props.bookName}</Col>
                </Link>
                <Link to={"#"} style={{ textAlign: "center" }}>
                    <Col span={24} style={{ paddingBottom: "15px" }}>
                        <img height={250} style={{ width: "50%" }} src={"data:image/png;base64," + props.imageData} />
                    </Col>
                </Link>
                <Col span={24}>
                    <Progress percent={progressPercent} />
                </Col>
                <Col span={4} style={{marginTop: "20px"}}>
                    <UpdateActiveBookContainer activeBookId={props.id} />
                </Col>
            </Col>
        </Col>
    )
}

export default ActiveBookForList;