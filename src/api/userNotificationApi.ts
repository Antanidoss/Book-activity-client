import { UserNotificationType } from "../types/userNotificationType";
import instanceAxios from "./instanceAxios";

export const userNotificationApi = {
    getNotification() {
        return instanceAxios.get<Array<UserNotificationType>>("/userNotification/get").then(r => r);
    }
}