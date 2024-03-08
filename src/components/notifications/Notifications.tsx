import React, { useState } from "react";
import { PropsType } from "./NotificationsContainer";
import { NotificationOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Row, Image } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const Notifications: React.FC<PropsType> = (props) => {
    const [isOpenNotificationsList, changeDisplayNotificationsList] = useState(false)
    const items = props.notifications.map(n => {
        return (
            <Row style={{ padding: "20px", borderBottom: "1px solid #d0d7de", width: "100%" }} key={n.id}>
                <Col style={{ width: "85%" }}>
                    <Avatar><Image preview={false} width={"32px"} src={("data:image/png;base64," + n.fromUser?.avatarDataBase64)} /></Avatar>
                </Col>
                <Col style={{ width: "85%" }}>
                    {n.description}
                </Col>
                <Col style={{ float: "right" }}>
                    <Button onClick={() => props.removeNotification(n.id)} size="small" type="primary" shape="round" aria-label="Close" icon={React.createElement(CloseOutlined)} />
                </Col>
            </Row>
        )
    })

    return (
        <>
            <Col style={{ float: "right" }}>
                <Col>
                    <Col style={{ float: "right" }} onMouseEnter={() => changeDisplayNotificationsList(!isOpenNotificationsList)}>
                        <Badge color="red" count={props.notificationCount} size="small" style={{ bottom: "15px", cursor: "pointer" }}>
                            <NotificationOutlined  style={{ color: "white" }} />
                        </Badge>
                    </Col>
                </Col>
                <Col onMouseLeave={() => changeDisplayNotificationsList(!isOpenNotificationsList)} style={{
                    width: "450px",
                    border: "1px solid #d0d7de",
                    backgroundColor: "whitesmoke",
                    zIndex: "1",
                    maxHeight: "600px",
                    overflowY: "scroll",
                    overflowX: "hidden",
                    borderRadius: "10px",
                    display: isOpenNotificationsList ? "block" : "none"
                }}>
                    {items}
                </Col>
            </Col>
        </>
    )
}

export default Notifications;