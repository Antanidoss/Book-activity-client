import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppStoreType, ExtractConnectType } from "../../redux/redux-store";
import { addNotification, getUserNotificationsThunkCreator } from "../../redux/reducers/userNotification-reducer";
import { getNotifications, getNotificationsCount } from "../../redux/selectors/userNotification-selectors";
import { UserNotificationType } from "../../types/users/userNotificationType";
import Notifications from "./Notifications";
import * as signalR from "@microsoft/signalr";
import { getInitialized } from "../../redux/selectors/app-selectors";
import { getIsAuthenticated, getUserId } from "../../redux/selectors/user-selectors";
import { SERVER_ADDRESS, setConnectionId } from "../../api/instanceAxios";
import { hubsApiConstants } from "../../types/common/hubsApiConstants";
import { notification } from "antd";

const NotificationsContainer: React.FC<PropsType> = (props) => {
    let notificationsBeingListened = false;

    useEffect(() => {
        if (!props.appInitialized || !props.isAuthenticated || notificationsBeingListened) {
            return;
        }

        props.getNotifications();

        notification.config({
            placement: 'topRight',
            duration: 3,
            maxCount: 4
          });

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${SERVER_ADDRESS}/${hubsApiConstants.USER_NOTIFICATION_HUB_NAME}`)
            .build();

        connection.on(hubsApiConstants.GET_NOTIFICATION, data => {
            data = JSON.parse(data);
            props.addNotification({ id: data.NotificationId, description: data.MessageNotification });
            notification.open({
                message: data.MessageNotification,
            });
        });

        connection.start().then(() => {
            setConnectionId(connection.connectionId as string);
            connection.send(hubsApiConstants.SET_USER_INFO, connection.connectionId, props.currentUserId);
        });

        notificationsBeingListened = true;
    }, [props.appInitialized, props.isAuthenticated])

    return <Notifications {...props} />
}

type MapDispatchToPropsType = {
    getNotifications: typeof getUserNotificationsThunkCreator,
    addNotification: typeof addNotification
}

const mapDispatchToProps = {
    getNotifications: getUserNotificationsThunkCreator,
    addNotification: addNotification
}

type MapStateToPropsType = {
    notifications: Array<UserNotificationType>,
    notificationCount: number,
    appInitialized: boolean,
    currentUserId: string | undefined,
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