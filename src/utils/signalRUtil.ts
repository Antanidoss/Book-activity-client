import * as signalR from "@microsoft/signalr";
import { SERVER_ADDRESS, setConnectionId } from "../api/instanceAxios";
import { hubsApiConstants } from "../types/common/hubsApiConstants";
import { SignalRUserNotification } from "../types/signalR/signalRuserNotificationType";
import { SignalRNotification } from "../types/signalR/signalRnotificationType";

const signalRUtil = {
    connectToUserNotificationHub: (currentUserId: string, onUserNotificationReceived: (notificationInfo: SignalRUserNotification) => void, onNotificationReceived: (notificationInfo: SignalRNotification) => void) => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${SERVER_ADDRESS}/${hubsApiConstants.USER_NOTIFICATION_HUB_NAME}`)
            .withUrl(`${SERVER_ADDRESS}/${hubsApiConstants.NOTIFICATION_HUB_NAME}`)
            .build();

        connection.on(hubsApiConstants.GET_USER_NOTIFICATION, (data) => onUserNotificationReceived(JSON.parse(data)));
        connection.on(hubsApiConstants.GET_NOTIFICATION, (data) => onNotificationReceived(JSON.parse(data)));

        connection.start().then(() => {
            setConnectionId(connection.connectionId as string);
            connection.send(hubsApiConstants.SET_USER_INFO, connection.connectionId, currentUserId);
        });
    }
}

export default signalRUtil;