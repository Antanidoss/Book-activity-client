import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { isBadStatusCode } from "../api/instanceAxios";
import { userNotificationApi } from "../api/userNotificationApi";
import { UserNotificationType } from "../types/userNotificationType"
import { AppStoreType } from "./redux-store";

export type InitialStateType = {
    notifications: Array<UserNotificationType>
}

const initialState: InitialStateType = {
    notifications: [] as Array<UserNotificationType>,
}

const SET_USER_NOTIFICATIONS = "SET_USER_NOTIFICATIONS";

const userNotificationReducer = (state = initialState, actions: ActionsTypes) => {
    switch (actions.type) {
        case SET_USER_NOTIFICATIONS:
            return {
                ...state,
                notifications: actions.notifications
            }
        default:
            return state;
    }
}

type SetUserNotificationsType = {
    type: typeof SET_USER_NOTIFICATIONS, notifications: Array<UserNotificationType>
}
export const setUserNotifications = (notifications: Array<UserNotificationType>): SetUserNotificationsType => ({
    type: SET_USER_NOTIFICATIONS, notifications: notifications
})

type ActionsTypes = SetUserNotificationsType;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>;

export const getUserNotificationsThunkCreator = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await userNotificationApi.getNotification();

        if (!isBadStatusCode(response.status)){
            dispatch(setUserNotifications(response.data))
        }
    }
}

export default userNotificationReducer;