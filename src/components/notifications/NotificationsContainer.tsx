import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppStoreType, ExtractConnectType } from "../../redux/redux-store";
import { addNotification, getUserNotificationsThunkCreator, removeUserNotificationsThunkCreator } from "../../redux/reducers/userNotification-reducer";
import { getNotifications, getNotificationsCount } from "../../redux/selectors/userNotification-selectors";
import { UserNotificationType } from "../../types/users/userNotificationType";
import Notifications from "./Notifications";
import { getInitialized } from "../../redux/selectors/app-selectors";
import { getIsAuthenticated, getUserId } from "../../redux/selectors/user-selectors";
import { notification } from "antd";
import signalRUtil from "../../utils/signalRUtil";

const NotificationsContainer: React.FC<PropsType> = (props) => {
    let notificationsBeingListened = false;

    useEffect(() => {
        if (!props.appInitialized || !props.isAuthenticated || notificationsBeingListened) {
            return;
        }

        signalRUtil.connectToNotificationHub(props.currentUserId as string, data => {
            data = JSON.parse(data);
            props.addNotification({ id: data.NotificationId, description: data.MessageNotification });
            notification.open({
                message: data.MessageNotification,
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
    notifications: Array<UserNotificationType>,
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