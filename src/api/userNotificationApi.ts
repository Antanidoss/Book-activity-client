import { UserNotificationType } from "../types/users/userNotificationType";
import instanceAxios from "./instanceAxios";

export const userNotificationApi = {
    getNotification() {
        return instanceAxios.get<Array<UserNotificationType>>("/userNotification/get").then(r => r);
    },
    removeNotification(notificationId: string) {
        return instanceAxios.delete(`/userNotification/remove?notificationId=${notificationId}`);
    }
}