import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppStoreType, ExtractConnectType } from "../../redux/redux-store";
import { addNotification, getUserNotificationsThunkCreator, removeUserNotificationsThunkCreator } from "../../redux/reducers/notification-reducer";
import { getNotifications, getNotificationsCount } from "../../redux/selectors/userNotification-selectors";
import { NotificationType } from "../../types/users/notificationType";
import Notifications from "./Notifications";
import { getInitialized } from "../../redux/selectors/app-selectors";
import { getIsAuthenticated, getUserId } from "../../redux/selectors/user-selectors";
import { Avatar, notification, Image } from "antd";
import signalRUtil from "../../utils/signalRUtil";

const NotificationsContainer: React.FC<PropsType> = (props) => {
    let notificationsBeingListened = false;

    useEffect(() => {
        if (!props.appInitialized || !props.isAuthenticated || notificationsBeingListened) {
            return;
        }

        signalRUtil.connectToUserNotificationHub(props.currentUserId as string, data => {
            props.addNotification({ id: data.NotificationId, description: data.MessageNotification, avatarDataBase64: data.AvatarDataBase64 });
            notification.open({
                message: <Avatar><Image preview={false} width={"32px"} src={("data:image/png;base64," + data.AvatarDataBase64)} /></Avatar>,
                description: data.MessageNotification,
            });
        });

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