import React from "react";
import { PropsType } from "./BookCommentsContainer";
import { Col, List, Image, Rate, Row, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LikeTwoTone, DislikeTwoTone, LikeOutlined, DislikeOutlined } from '@ant-design/icons';

const BookComments: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();

    if (!props.bookOpinions.length) {
        return <></>;
    }

    const checkIsAuthenticated = () => {
        if (!props.isAuthenticated) {
            navigate("/login");
        }
    }

    const removeBookOpinionLike = (userId: string) => {
        props.removeBookOpinionLike(userId, props.bookId)
    }

    const addBookOpinionLike = (userId: string, hasDislike: boolean) => {
        checkIsAuthenticated();

        props.addBookOpinionLike(userId, props.bookId, hasDislike)
    }

    const removeBookOpinionDislike = (userId: string) => {
        props.removeBookOpinionDislike(userId, props.bookId)
    }

    const addBookOpinionDislike = (userId: string, hasLike: boolean) => {
        checkIsAuthenticated();

        props.addBookOpinionDislike(userId, props.bookId, hasLike);
    }


    const data = props.bookOpinions.map(o => ({
        title: <Link to={`/profile?userId=${o.user.id}`}>{o.user.userName}</Link>,
        avatar: <Link to={`/profile?userId=${o.user.id}`}><Image preview={false} style={{ width: "40px", maxHeight: "40px", borderRadius: "10px" }} src={("data:image/png;base64," + o.user.avatarDataBase64)} /></Link>,
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
                renderItem={(item) => (
                    <List.Item key={Math.random().toString(16).slice(2)}>
                        <List.Item.Meta avatar={item.avatar} title={item.title}>
                        </List.Item.Meta>
                            {item.description}
                            <Row>
                                <Col>{item.grade}</Col>
                                <Col style={{marginLeft: "10px"}}>{item.likes}</Col>
                                <Col>{item.dislikes}</Col>
                            </Row>
                    </List.Item>
                )}>

            </List>
        </Col>
    )
}

export default BookComments;