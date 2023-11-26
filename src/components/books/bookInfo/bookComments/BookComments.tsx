import React from "react";
import { PropsType } from "./BookCommentsContainer";
import { Col, List, Image, Rate } from "antd";
import { Link } from "react-router-dom";

const BookComments: React.FC<PropsType> = (props) => {
    if (!props.bookOpinions.length) {
        return <></>;
    }

    const data = props.bookOpinions.map(o => ({
        title: <Link to={`/profile?userId=${o.user.id}`}>{o.user.userName}</Link>,
        avatar: <Link to={`/profile?userId=${o.user.id}`}><Image preview={false} style={{ width: "40px", maxHeight: "40px", borderRadius: "10px" }} src={("data:image/png;base64," + o.user.avatarDataBase64)} /></Link>,
        description: o.description,
        grade: <Rate value={o.grade} disabled />,
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
                            <Col>{item.grade}</Col>
                    </List.Item>
                )}>

            </List>
        </Col>
    )
}

export default BookComments;