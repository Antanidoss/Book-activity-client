import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { isBadStatusCode } from "../../api/instanceAxios";
import { userNotificationApi } from "../../api/userNotificationApi";
import { NotificationType as NotificationType } from "../../types/users/notificationType"
import { AppStoreType } from "../redux-store";

export type InitialStateType = {
    notifications: Array<NotificationType>
}

const initialState: InitialStateType = {
    notifications: [],
}

const SET_USER_NOTIFICATIONS = "SET_USER_NOTIFICATIONS";
const ADD_USER_NOTIFICATION = "ADD_USER_NOTIFICATION";
const REMOVE_USER_NOTIFICATION = "REMOVE_USER_NOTIFICATION";

const userNotificationReducer = (state = initialState, actions: ActionsTypes): InitialStateType => {
    switch (actions.type) {
        case SET_USER_NOTIFICATIONS:
            return {
                ...state,
                notifications: actions.notifications
            }
        case ADD_USER_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.concat(actions.notification)
            }
        case REMOVE_USER_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(n => n.id !== actions.notificationId)
            }
        default:
            return state;
    }
}

type SetUserNotificationsType = {
    type: typeof SET_USER_NOTIFICATIONS, notifications: Array<NotificationType>
}
export const setUserNotifications = (notifications: Array<NotificationType>): SetUserNotificationsType => ({
    type: SET_USER_NOTIFICATIONS, notifications: notifications
})

type AddNotificationType = {
    type: typeof ADD_USER_NOTIFICATION, notification: NotificationType
}
export const addNotification = (notification: NotificationType): AddNotificationType => ({
    type: ADD_USER_NOTIFICATION, notification: notification
})

type RemoveNotificationType = {
    type: typeof REMOVE_USER_NOTIFICATION, notificationId: string
}
export const removeNotification = (notificationId: string): RemoveNotificationType => ({
    type: REMOVE_USER_NOTIFICATION, notificationId
})

type ActionsTypes = SetUserNotificationsType | AddNotificationType | RemoveNotificationType;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>;

export const getUserNotificationsThunkCreator = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await userNotificationApi.getNotification();

        if (!isBadStatusCode(response.status)) {
            dispatch(setUserNotifications(response.data))
        }
    }
}

export const removeUserNotificationsThunkCreator = (notificationId: string): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await userNotificationApi.removeNotification(notificationId);

        if (!isBadStatusCode(response.status)) {
            dispatch(removeNotification(notificationId))
        }
    }
}

export default userNotificationReducer;