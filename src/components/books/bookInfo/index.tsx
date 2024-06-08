import React, { useEffect, useState } from "react";
import { Button, Col, Rate, Row, Tag } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { ROUT_PAGE_NAME } from "common";
import { useLazyQuery } from "@apollo/client";
import { useQuery as useLinkQuery } from "../../../hoc/useQuery";
import { GetBookInfo, GetBookInfoItem, GET_BOOK_INFO } from "query";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateBookFilter, bookSelectors, userSelectors } from "reduxStore";
import AddActiveBook from "../../activeBook/addActiveBook";
import BookOpinionView from "../../bookOpinion/bookOpinionView";
import AddBookOpinion from "../../bookOpinion/addBookOpinion";
import BookComments from "./bookComments";
import { CustomSpin } from "commonComponents";

const BookInfo: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const query = useLinkQuery();

    const currentUser = useSelector(userSelectors.curUser);
    const bookFilter = useSelector(bookSelectors.filter);
    

    const [bookInfo, setBookInfo] = useState<GetBookInfoItem>();
    const [loading, setLoading] = useState(true);

    const bookId = query.get("bookId");

    const [getBookInfo] = useLazyQuery<GetBookInfo>(GET_BOOK_INFO, {
        fetchPolicy: "cache-first",
        variables: {
            bookId
        }
    })

    const onAddBookOpinion = (grade: number, description: string) => {
        //TODO: 
    }

    useEffect(() => {
        getBookInfo().then(res => {
            setLoading(false);
            setBookInfo(res.data?.bookById[0]);
        })
    }, [getBookInfo])

    if (loading) return <CustomSpin loading={loading} /> 

    if (bookInfo === undefined) {
        return <></>
    }

    const onTagClick = (categoryId: string, categoryTitle: string) => {
        dispatch(updateBookFilter({ ...bookFilter, categories: [{ value: categoryId, label: categoryTitle }] }));

        navigate(ROUT_PAGE_NAME.ALL_BOOKS);
    }

    const onAddActiveBookSuccess = () => {
        setBookInfo({...bookInfo, isActiveBook: true});
    }

    const tags = bookInfo.bookCategories?.map(c => {
        const category = c.category;
        return (
            <Tag key={category.id} onClick={() => onTagClick(category.id, category.title)} style={{"cursor": "pointer"}}>
                {category.title}
            </Tag>
        )
    })

    return (
        <Col>
            <Row style={{ width: "80%", margin: "0 auto", marginTop: "100px" }}>
                <Col style={{ width: "50%" }}>
                    <img height={350} width={250} style={{ float: "right", marginRight: "100px" }} src={"data:image/png;base64," + bookInfo?.imageDataBase64} />
                </Col>
                <Col style={{ fontFamily: "Inter,sans-serif" }}>
                    <Row>
                        <Col>
                            <Rate value={bookInfo.averageRating} disabled allowHalf></Rate>
                        </Col>
                        <Col style={{ marginLeft: "20px", alignSelf: "self-end" }}>
                            <Link to="#">
                                {bookInfo.bookOpinionsCount} users rated
                            </Link>
                        </Col>
                    </Row>
                    <Col style={{ marginTop: "10px", fontSize: "22px" }}>{bookInfo.title}</Col>
                    <Col style={{ marginTop: "10px", fontSize: "15px" }}>
                        {
                            bookInfo.bookAuthors.map(a => `${a.author.firstName} ${a.author.surname}`).join(",")
                        }
                    </Col>
                    <Row style={{ marginTop: "15px" }}>{tags}</Row>
                    <Row style={{ marginTop: "15px" }}>
                        <Col>
                            {
                                bookInfo.isActiveBook
                                    ? <Button shape="round" type="primary" icon={React.createElement(CheckOutlined)}>Is active</Button>
                                    : <AddActiveBook bookId={bookInfo.id} onAddActiveBookSuccess={onAddActiveBookSuccess} />
                            }
                        </Col>
                        <Col>
                            {
                                bookInfo.hasOpinion
                                    ? <BookOpinionView
                                        bookId={bookInfo.id} />
                                    : <AddBookOpinion
                                        bookId={bookInfo.id} />
                            }
                        </Col>
                    </Row>
                </Col>
                <Col style={{ paddingTop: "50px", margin: "0 auto", width: "50%", fontSize: "15px" }}>
                    {bookInfo.description}
                    <BookComments bookId={bookInfo.id} />
                </Col>
            </Row>
        </Col>
    )
}

export default BookInfo;