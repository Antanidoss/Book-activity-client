import React, { useEffect, useState } from "react";
import { Col, List, Image, Rate, Row, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LikeTwoTone, DislikeTwoTone, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { useLazyQuery } from "@apollo/client";
import { GetBookOpinions, GetBookOpinionsItem, GET_BOOK_OPINIONS } from "query";
import { useSelector } from "react-redux";
import { userSelectors } from "reduxStore";
import { bookOpinionApi, isBadStatusCode } from "api";
import CustomSpin from "../../../common/CustomSpin";
import { ROUT_PAGE_NAME } from "../../../../common/constants";

const BookComments: React.FC<{bookId: string}> = ({bookId}) => {
    const navigate = useNavigate();

    const isAuthenticated = useSelector(userSelectors.isAuthenticated);

    const [bookOpinions, setBookOpinions] = useState<GetBookOpinionsItem[]>();
    const [loading, setLoading] = useState(true);

    const [getBookOpinions] = useLazyQuery<GetBookOpinions>(GET_BOOK_OPINIONS);

    useEffect(() => {
        getBookOpinions({
            variables: {
                bookId: bookId,
                skip: 0,
                take: 8
            }
        }).then(res => {
            setBookOpinions(res.data?.bookOpinions.items);
            setLoading(false);
        })
    }, [getBookOpinions, bookId]);

    if (loading) return <CustomSpin loading={loading} />

    if (!bookOpinions?.length) return <></>;

    const checkIsAuthenticated = () => {
        if (!isAuthenticated) {
            navigate(ROUT_PAGE_NAME.USER_LOGIN);
        }
    }

    const removeBookOpinionLike = (userId: string) => {
        bookOpinionApi.removeDislike(bookId, userId).then(res => {
            if (isBadStatusCode(res.status)) return;

            setBookOpinions([...bookOpinions].map(o => {
                const opinion = {...o};
                if (opinion.user.id === userId) {
                    opinion.dislikesCount--;
                    opinion.hasDislike = false;
                }

                return opinion;
            }));
        })
    }

    const addBookOpinionLike = (userId: string, hasDislike: boolean) => {
        checkIsAuthenticated();

        bookOpinionApi.addLike(bookId, userId).then(res => {
            if (isBadStatusCode(res.status)) return;

            setBookOpinions(bookOpinions.map(o => {
                const opinion = {...o};
                if (opinion.user.id === userId) {
                    if (hasDislike) {
                        opinion.dislikesCount--;
                        opinion.hasDislike = false;
                    }

                    opinion.hasLike = true;
                    opinion.likesCount++;
                }

                return opinion;
            }));
        });
    }

    const removeBookOpinionDislike = (userId: string) => {
        bookOpinionApi.removeDislike(bookId, userId).then(res => {
            if (isBadStatusCode(res.status)) return;

            setBookOpinions([...bookOpinions].map(o => {
                const opinion = {...o};
                if (opinion.user.id === userId) {
                    opinion.likesCount--;
                    opinion.hasLike = false;
                }

                return opinion;
            }));
        })
    }

    const addBookOpinionDislike = (userId: string, hasLike: boolean) => {
        checkIsAuthenticated();

        bookOpinionApi.addDislike(bookId, userId).then(res => {
            if (isBadStatusCode(res.status)) return;

            setBookOpinions([...bookOpinions].map(o => {
                const opinion = {...o};
                if (opinion.user.id === userId) {
                    if (hasLike) {
                        opinion.likesCount--;
                        opinion.hasLike = false;
                    }

                    opinion.hasDislike = true;
                    opinion.dislikesCount++;
                }

                return opinion;
            }));
        });
    }


    const data = bookOpinions.map(o => ({
        title: <Link to={`${ROUT_PAGE_NAME.USER_PROFILE}?userId=${o.user.id}`}>{o.user.userName}</Link>,
        avatar: <Link to={`${ROUT_PAGE_NAME.USER_PROFILE}?userId=${o.user.id}`}>
            <Image preview={false} style={{ width: "40px", maxHeight: "40px", borderRadius: "10px" }} src={("data:image/png;base64," + o.user.avatarDataBase64)} />
        </Link>,
        description: o.description,
        grade: <Rate value={o.grade} disabled />,
        likes: o.hasLike
            ? <Button onClick={() => removeBookOpinionLike(o.user.id)}><LikeTwoTone /> {o.likesCount}</Button>
            : <Button onClick={() => addBookOpinionLike(o.user.id, o.hasDislike)}><LikeOutlined /> {o.likesCount}</Button>,
        dislikes: o.hasDislike
            ? <Button onClick={() => removeBookOpinionDislike(o.user.id)}><DislikeTwoTone /> {o.dislikesCount}</Button>
            : <Button onClick={() => addBookOpinionDislike(o.user.id, o.hasLike)}><DislikeOutlined /> {o.dislikesCount}</Button>
    }));

    return (
        <Col style={{marginTop: "50px", alignItems: "center"}}>
            <List
            header={"Comments"}
            bordered
                itemLayout="vertical"
                dataSource={data}
                renderItem={(opinion) => (
                    <List.Item key={Math.random().toString(16).slice(2)}>
                        <List.Item.Meta avatar={opinion.avatar} title={opinion.title}>
                        </List.Item.Meta>
                            {opinion.description}
                            <Row>
                                <Col>{opinion.grade}</Col>
                                <Col style={{marginLeft: "10px"}}>{opinion.likes}</Col>
                                <Col>{opinion.dislikes}</Col>
                            </Row>
                    </List.Item>
                )}>

            </List>
        </Col>
    )
}

export default BookComments;