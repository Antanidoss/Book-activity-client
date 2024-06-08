import { instanceAxios } from "../instanceAxios";

export const notificationApi = {
    removeNotification(notificationId: string) {
        return instanceAxios.delete(`/userNotification/remove?notificationId=${notificationId}`);
    }
}