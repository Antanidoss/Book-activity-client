import { List, Image, Row, Col } from "antd";
import React from "react";
import { PropsType } from "./AllUsersContainer";
import { Link } from "react-router-dom";
import {
    BookOutlined,
    CommentOutlined
} from "@ant-design/icons";
import SubUnsubButton from "../../common/SubUnsubButton";

const AllUser: React.FC<PropsType> = (props) => {
    return (
        <List
            style={{ padding: "50px 150px 150px 150px", alignItems: "center" }}
            dataSource={props.currentUserId !== null ? props.users.filter(u => u.id !== props.currentUserId) : props.users}
            renderItem={(user) => (
                <List.Item style={{ border: "1px solid rgb(8 68 124)", borderRadius: "10px", marginTop: "50px", backgroundColor: "white" }}>
                    <List.Item.Meta
                        style={{ alignItems: "center" }}
                        avatar={
                            <Link style={{ cursor: "pointer", marginLeft: "20px" }} to={`/profile?userId=${user.id}`}>
                                <Image preview={false} style={{ width: "50px", maxHeight: "60px", borderRadius: "15px" }} src={("data:image/png;base64," + user.avatarImage)} />
                            </Link>}
                        title={<Link style={{ cursor: "pointer" }} to={`/profile?userId=${user.id}`}>{user.name}</Link>}
                        description=
                        {
                            <Row>
                                <Col>{React.createElement(BookOutlined)}: {user.activeBookCount}</Col>
                                <Col style={{ marginLeft: "10px" }}>{React.createElement(CommentOutlined)}: {user.bookOpinionCount}</Col>
                            </Row>
                        } />
                    {
                        <SubUnsubButton
                            userId={user.id}
                            style={{"marginRight": "20px"}}
                            unsubscribeUser={props.unsubscribeUser}
                            subscribeToUser={props.subscribeToUser}
                            isSubscribed={user.isSubscription as boolean}
                            isAuthenticated={props.isAuthenticated} />
                    }
                </List.Item>
            )} />
    )
}

export default AllUser;