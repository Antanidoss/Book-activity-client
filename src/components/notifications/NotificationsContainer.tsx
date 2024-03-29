import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppStoreType, ExtractConnectType } from "../../redux/redux-store";
import { addNotification, getUserNotificationsThunkCreator, removeUserNotificationsThunkCreator } from "../../redux/reducers/notification-reducer";
import { getNotifications, getNotificationsCount } from "../../redux/selectors/notification-selectors";
import Notifications from "./Notifications";
import { getInitialized } from "../../redux/selectors/app-selectors";
import { getIsAuthenticated, getUserId } from "../../redux/selectors/user-selectors";
import { Avatar, notification, Image } from "antd";
import signalRUtil from "../../utils/signalRUtil";
import { SignalRNotification } from "../../types/signalR/signalRNotificationType";
import { NotificationType } from "../../redux/types/notifications/notificationType";
import { BrowserRouter, Link, useNavigate } from "react-router-dom";

const NotificationsContainer: React.FC<PropsType> = (props) => {
    let notificationsBeingListened = false;

    const navigate = useNavigate();

    useEffect(() => {
        if (!props.appInitialized || !props.isAuthenticated || notificationsBeingListened) {
            return;
        }

        const onNotificationReceived = (data: SignalRNotification) => {
            props.addNotification({
                notificationId: data.NotificationId,
                messageNotification: data.MessageNotification,
                fromUser: data.FromUserId !== undefined ? { userId: data.FromUserId, avatarImage: data.FromUserAvatarDataBase64 } : undefined
            });

            notification.open({
                message: <Avatar><Image style={{cursor: "pointer"}} preview={false} width={"32px"} src={("data:image/png;base64," + data.FromUserAvatarDataBase64)} onClick={() => navigate(`/profile?userId=${data.FromUserId}`)} /></Avatar>,
                description: data.MessageNotification,
            });
        }

        signalRUtil.connectToUserNotificationHub(props.currentUserId as string, onNotificationReceived);

        props.getNotifications();

        notificationsBeingListened = true;
    }, [props.appInitialized, props.isAuthenticated])

    return <Notifications {...props} />
}

type MapDispatchToPropsType = {
    getNotifications: typeof getUserNotificationsThunkCreator,
    removeNotification: typeof removeUserNotificationsThunkCreator,
    addNotification: typeof addNotification
}

const mapDispatchToProps = {
    getNotifications: getUserNotificationsThunkCreator,
    removeNotification: removeUserNotificationsThunkCreator,
    addNotification: addNotification
}

type MapStateToPropsType = {
    notifications: Array<NotificationType>,
    notificationCount: number,
    appInitialized: boolean,
    currentUserId?: string,
    isAuthenticated: boolean
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    notifications: getNotifications(state),
    notificationCount: getNotificationsCount(state),
    appInitialized: getInitialized(state),
    currentUserId: getUserId(state),
    isAuthenticated: getIsAuthenticated(state)
})

type OwnPropsType = {}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default compose<React.ComponentType>(connectStore)(NotificationsContainer);