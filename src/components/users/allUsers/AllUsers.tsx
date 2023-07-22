import { List, Image, Button, message, Row, Col } from "antd";
import React from "react";
import { PropsType } from "./AllUsersContainer";
import { Link, useNavigate } from "react-router-dom";
import {
    BookOutlined,
    CommentOutlined
} from "@ant-design/icons";

const AllUser: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();

    const subscribeToUser = (userId: string) => {
        if (!props.isAuthenticated) {
            return navigate("/login");
        }

        props.subscribeToUser(userId).then(isSuccess => {
            return isSuccess ? message.success("You have successfully subscribed", 6) : message.error("Failed to subscribe", 6)
        });
    }

    const unsubscribeUser = (userId: string) => {
        if (!props.isAuthenticated) {
            return navigate("/login");
        }
            
        props.unsubscribeUser(userId).then(isSuccess => {
            return isSuccess ? message.success("You have successfully subscribed", 6) : message.error("Failed to subscribe", 6)
        });
    }

    return (
        <List
            style={{padding: "50px 150px 150px 150px", alignItems: "center"}}
            dataSource={ props.currentUserId !== null ? props.users.filter(u => u.id !== props.currentUserId) : props.users}
            renderItem={(user) => (
                <List.Item style={{ border: "1px solid rgb(8 68 124)", borderRadius: "10px", marginTop: "50px", backgroundColor: "white" }}>
                    <List.Item.Meta
                        style={{alignItems: "center"}}
                        avatar={<Image style={{width: "50px", maxHeight: "60px", borderRadius: "15px"}} src={("data:image/png;base64," + user.avatarImage)} />}
                        title={<Link to={`/profile?userId=${user.id}`}>user.name</Link>} 
                        description=
                        {
                            <Row>
                                <Col>{React.createElement(BookOutlined)}: {user.activeBookCount}</Col>
                                <Col style={{marginLeft: "10px"}}>{React.createElement(CommentOutlined)}: {user.bookOpinionCount}</Col>
                            </Row>
                        } />
                     {
                        user.isSubscription
                            ? <Button shape="round" onClick={() => unsubscribeUser(user.id)} type="primary">Unsubscribe</Button>
                            : <Button shape="round" onClick={() => subscribeToUser(user.id)} type="primary">Subscribe</Button>
                     }
                </List.Item>
            )} />
    )
}

export default AllUser;