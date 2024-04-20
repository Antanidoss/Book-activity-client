import React from "react";
import { PropsType } from "./BookInfoContainer";
import { Button, Col, Rate, Row, Tag } from "antd";
import AddActiveBookContainer from "../../activeBook/addActiveBook/AddActiveBookContainer";
import { CheckOutlined } from "@ant-design/icons";
import AddBookOpinionContainer from "../../activeBook/activeBookForList/addBookOpinion/AddBookOpinionContainer";
import BookOpinionViewContainer from "../../activeBook/activeBookForList/bookOpinionView/BookOpinionViewContainer";
import { Link, useNavigate } from "react-router-dom";
import BookCommentsContainer from "./bookComments/BookCommentsContainer";
import { ROUT_PAGE_NAME } from "../../../types/constants";

const BookInfo: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();

    const onTagClick = (categoryId: string, categoryTitle: string) => {
        props.updateBookFilter({ ...props.bookFilter, categories: props.bookFilter.categories.concat({ value: categoryId, label: categoryTitle }) });
        props.updateCurrentPageNumber(1);

        navigate(ROUT_PAGE_NAME.ALL_BOOKS);
    }

    const tags = props.bookInfo.categories.map(c => {
        return (
            <Tag key={c.id} onClick={() => onTagClick(c.id, c.title)} style={{"cursor": "pointer"}}>
                {c.title}
            </Tag>
        )
    })

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
                    <Row style={{ marginTop: "15px" }}>{tags}</Row>
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
                    <BookCommentsContainer bookOpinions={props.bookInfo.bookOpinions} bookId={props.bookInfo.id} />
                </Col>
            </Row>
        </Col>
    )
}

export default BookInfo;