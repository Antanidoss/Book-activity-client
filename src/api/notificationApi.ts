import instanceAxios, { GraphqlResponseType } from "./instanceAxios";
import { GetNotificationsType } from "./types/notifications/getNotificationsType";

export const notificationApi = {
    getNotification() {
        const query = `query {
            notifications {
              items {
                id
                description
                fromUser {
                  id
                  avatarDataBase64
                }
              }
            }
          }`

        return instanceAxios.post<GraphqlResponseType<GetNotificationsType>>(`/graphql`, { query }).then(res => res);
    },
    removeNotification(notificationId: string) {
        return instanceAxios.delete(`/userNotification/remove?notificationId=${notificationId}`);
    }
}