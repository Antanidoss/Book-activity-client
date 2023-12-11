import * as signalR from "@microsoft/signalr";
import { SERVER_ADDRESS, setConnectionId } from "../api/instanceAxios";
import { hubsApiConstants } from "../types/common/hubsApiConstants";

const signalRUtil = {
    connectToNotificationHub: (currentUserId: string, onNotificationReceived: (...args: any[]) => any) => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${SERVER_ADDRESS}/${hubsApiConstants.USER_NOTIFICATION_HUB_NAME}`)
            .build();

        connection.on(hubsApiConstants.GET_NOTIFICATION, onNotificationReceived);

        connection.start().then(() => {
            setConnectionId(connection.connectionId as string);
            connection.send(hubsApiConstants.SET_USER_INFO, connection.connectionId, currentUserId);
        });
    }
}

export default signalRUtil;