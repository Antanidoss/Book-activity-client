import { AppStoreType } from "../redux-store";

export const getNotifications = (state: AppStoreType) => {
    return state.userNotificationStore.notifications;
}

export const getNotificationsCount = (state: AppStoreType) => {
    return state.userNotificationStore.notifications.length;
}