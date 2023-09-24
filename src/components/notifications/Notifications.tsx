import React, { useState } from "react";
import { PropsType } from "./NotificationsContainer";
import { NotificationOutlined } from '@ant-design/icons';
import { Badge, Col, Row } from "antd";

const Notifications: React.FC<PropsType> = (props) => {
    const [isOpenNotificationsList, changeDisplayNotificationsList] = useState(false)
    const items = props.notifications.map(n => {
        return (
            <Row style={{ padding: "20px", borderBottom: "1px solid #d0d7de" }} key={n.id}>
                {n.description}
            </Row>
        )
    })

    return (
        <>
            <Col style={{ float: "right" }}>
                <Col>
                <Col style={{float: "right"}}>
                <Badge color="red" count={props.notificationCount} size="small" style={{ bottom: "15px" }}>
                        <NotificationOutlined rev style={{ color: "white", }} onMouseEnter={() => changeDisplayNotificationsList(!isOpenNotificationsList)} />
                    </Badge>
                </Col>
                </Col>
                <Col onMouseLeave={() => changeDisplayNotificationsList(!isOpenNotificationsList)} style={{ backgroundColor: "white", zIndex: "1", maxHeight: "600px", overflowY: "scroll", display: isOpenNotificationsList ? "block" : "none" }}>
                    {items}
                </Col>
            </Col>
        </>
    )
}

export default Notifications;