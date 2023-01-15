import React, { useEffect, useState } from "react";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import { compose } from "redux";
import { AppStoreType } from "../../redux/redux-store";
import { addNotification, getUserNotificationsThunkCreator, setUserNotifications } from "../../redux/userNotification-reducer";
import { getNotifications, getNotificationsCount } from "../../redux/userNotification-selectors";
import { UserNotificationType } from "../../types/userNotificationType";
import Notifications from "./Notifications";
import * as signalR from "@microsoft/signalr";
import { getInitialized } from "../../redux/app-selectors";
import { getIsAuthenticated, getUserId } from "../../redux/user-selectors";
import { SERVER_ADDRESS, setConnectionId } from "../../api/instanceAxios";
import { hubsApiConstants } from "../../types/api/hubsApiConstants";

const NotificationsContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        if (!props.appInitialized) {
            return;
        }

        props.getNotifications();

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${SERVER_ADDRESS}/${hubsApiConstants.USER_NOTIFICATION_HUB_NAME}`)
            .build();

        connection.on(hubsApiConstants.GET_NOTIFICATION, data => {
            data = JSON.parse(data);
            props.addNotification({ id: data.NotificationId, description: data.MessageNotification });
        });

        connection.start().then(() => {
            setConnectionId(connection.connectionId as string);
            connection.send(hubsApiConstants.SET_USER_INFO, connection.connectionId, props.currentUserId);
        });
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

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default compose<React.ComponentType>(connectStore)(NotificationsContainer);