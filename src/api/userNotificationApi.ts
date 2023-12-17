import { NotificationType } from "../types/users/notificationType";
import instanceAxios from "./instanceAxios";

export const userNotificationApi = {
    getNotification() {
        return instanceAxios.get<Array<NotificationType>>("/userNotification/get").then(r => r);
    },
    removeNotification(notificationId: string) {
        return instanceAxios.delete(`/userNotification/remove?notificationId=${notificationId}`);
    }
}