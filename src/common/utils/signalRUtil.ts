import * as signalR from "@microsoft/signalr";
import { SERVER_ADDRESS, setConnectionId } from "../../api/instanceAxios";
import { hubsApiConstants } from "../constants";
import { SignalRNotification } from "../models";

export const signalRUtil = {
    connectToUserNotificationHub: (currentUserId: string, onNotificationReceived: (notificationInfo: SignalRNotification) => void) => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${SERVER_ADDRESS}/${hubsApiConstants.NOTIFICATION_HUB_NAME}`)
            .build();

        connection.on(hubsApiConstants.GET_NOTIFICATION, (data) => onNotificationReceived(JSON.parse(data)));

        connection.start().then(() => {
            setConnectionId(connection.connectionId as string);
            connection.send(hubsApiConstants.SET_USER_INFO, connection.connectionId, currentUserId);
        });
    }
}