import React, { useEffect, useState } from "react";
import { NotificationOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Row, Image, notification } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { notificationApi, isBadStatusCode } from "api";
import { GetNotifications, GetNotificationsItem, GET_NOTIFICATIONS } from "query";
import { useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { userSelectors, commonSelectors } from "reduxStore";
import { SignalRNotification, signalRUtil } from "../../common";

const Notifications: React.FC = () => {
    const [isOpenNotificationsList, changeDisplayNotificationsList] = useState(false)
    const [notificationsBeingListened, setNotificationsBeingListened] = useState(false);
    const [notifications, setNotifications] = useState<GetNotificationsItem[]>();

    const currentUserId = useSelector(userSelectors.userId);
    const appInitialized = useSelector(commonSelectors.initialized);
    const isAuthenticated = useSelector(userSelectors.isAuthenticated);

    const [getNotifications] = useLazyQuery<GetNotifications>(GET_NOTIFICATIONS);
    const navigate = useNavigate();

    useEffect(() => {
        if (!appInitialized || !isAuthenticated || notificationsBeingListened) {
            return;
        }

        const onNotificationReceived = (data: SignalRNotification) => {
            setNotifications(notifications?.concat([{
                id: data.NotificationId,
                description: data.MessageNotification,
                fromUser: data.FromUserId !== undefined ? { id: data.FromUserId, avatarDataBase64: data.FromUserAvatarDataBase64 } : undefined
            }]));

            notification.open({
                message: <Avatar><Image style={{cursor: "pointer"}} preview={false} width={"32px"} src={("data:image/png;base64," + data.FromUserAvatarDataBase64)} onClick={() => navigate(`/profile?userId=${data.FromUserId}`)} /></Avatar>,
                description: data.MessageNotification,
            });
        }

        signalRUtil.connectToUserNotificationHub(currentUserId as string, onNotificationReceived);

        getNotifications().then(res => setNotifications(res.data?.notifications.items));

        setNotificationsBeingListened(true);
    }, [notificationsBeingListened, navigate])

    const removeNotification = (notificationId: string) => {
        notificationApi.removeNotification(notificationId).then(res => {
            if (!isBadStatusCode(res.status)) {
                    setNotifications(notifications?.filter(n => n.id !== notificationId));
                }
        })
    }

    const items = notifications?.map(n => {
        return (
            <Row style={{ padding: "20px", borderBottom: "1px solid #d0d7de", width: "100%" }} key={n.id}>
                <Col style={{ width: "85%" }}>
                    <Link style={{ cursor: "pointer", marginLeft: "20px" }} to={`/profile?userId=${n.fromUser?.id}`}>
                        <Avatar><Image preview={false} width={"32px"} src={("data:image/png;base64," + n.fromUser?.avatarDataBase64)} /></Avatar>
                    </Link>
                </Col>
                <Col style={{ width: "85%" }}>
                    {n.description}
                </Col>
                <Col style={{ float: "right" }}>
                    <Button onClick={() => removeNotification(n.id)} size="small" type="primary" shape="round" aria-label="Close" icon={React.createElement(CloseOutlined)} />
                </Col>
            </Row>
        )
    })

    return (
        <Col style={{ float: "right" }}>
            <Col>
                <Col style={{ float: "right" }} onMouseEnter={() => changeDisplayNotificationsList(!isOpenNotificationsList)}>
                    <Badge color="red" count={notifications?.length} size="small" style={{ bottom: "15px", cursor: "pointer" }}>
                        <NotificationOutlined style={{ color: "white" }} />
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
    )
}

export default Notifications;