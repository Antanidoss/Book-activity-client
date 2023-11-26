import React from "react";
import { PropsType } from "./BookInfoContainer";
import { Button, Col, Rate, Row } from "antd";
import AddActiveBookContainer from "../../activeBook/addActiveBook/AddActiveBookContainer";
import { CheckOutlined } from "@ant-design/icons";
import AddBookOpinionContainer from "../../activeBook/activeBookForList/addBookOpinion/AddBookOpinionContainer";
import BookOpinionViewContainer from "../../activeBook/activeBookForList/bookOpinionView/BookOpinionViewContainer";
import { Link } from "react-router-dom";
import BookCommentsContainer from "./bookComments/BookCommentsContainer";

const BookInfo: React.FC<PropsType> = (props) => {
    return (
        <Col>
            <Row style={{ width: "80%", margin: "0 auto", marginTop: "100px" }}>
                <Col style={{ width: "50%" }}>
                    <img height={350} width={250} style={{ float: "right", marginRight: "100px" }} src={"data:image/png;base64," + props.bookInfo?.imageDataBase64} />
                </Col>
                <Col style={{ fontFamily: "Inter,sans-serif" }}>
                    <Row>
                        <Col>
                            <Rate value={props.bookInfo.averageRating} disabled allowHalf></Rate>
                        </Col>
                        <Col style={{ marginLeft: "20px", alignSelf: "self-end" }}>
                            <Link to="#">
                                {props.bookInfo?.bookOpinionsCount} users rated
                            </Link>
                        </Col>
                    </Row>
                    <Col style={{ marginTop: "10px", fontSize: "22px" }}>{props.bookInfo.title}</Col>
                    <Col style={{ marginTop: "10px", fontSize: "15px" }}>{props.bookInfo.bookAuthorNames.join(",")}</Col>
                    <Row style={{ marginTop: "15px" }}>
                        <Col>
                            {
                                props.bookInfo?.isActiveBook
                                    ? <Button shape="round" type="primary" icon={React.createElement(CheckOutlined)}>Is active</Button>
                                    : <AddActiveBookContainer bookId={props.bookInfo.id} />
                            }
                        </Col>
                        <Col>
                            {
                                props.bookInfo.hasOpinion
                                    ? <BookOpinionViewContainer
                                        bookId={props.bookInfo.id}
                                        resizableButton={false} />
                                    : <AddBookOpinionContainer
                                        bookId={props.bookInfo.id}
                                        resizableButton={false}
                                        onAddedOpinion={() => props.getBookInfo(props.bookInfo.id)} />
                            }
                        </Col>
                    </Row>
                </Col>
                <Col style={{ paddingTop: "50px", margin: "0 auto", width: "50%", fontSize: "15px" }}>
                    {props.bookInfo.description}
                    <BookCommentsContainer bookOpinions={props.bookInfo.bookOpinions} />
                </Col>
            </Row>
        </Col>
    )
}

export default BookInfo;