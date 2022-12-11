import { UserType } from "../types/userType"
import { ThunkAction } from 'redux-thunk';
import { AppStoreType } from './redux-store';
import { Dispatch } from "redux";
import { userApi } from "../api/userApi";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { isBadStatusCode } from "../api/instanceAxios";
import { UserFilterType } from "../types/api/userFilterType";
import { calculateSkip } from "../types/api/paginationType";

export type InitialStateType = {
    currentUser: UserType | null,
    isAuthenticated: boolean,
    pageNumber: number,
    totalUserCount: number,
    pageSize: number,
    userFilter: UserFilterType,
    users: Array<UserType>
}

const initialState: InitialStateType = {
    currentUser: null,
    isAuthenticated: false,
    pageNumber: 1,
    totalUserCount: 0,
    pageSize: 12,
    userFilter: { name: null },
    users: [] as Array<UserType>
}

const SET_CURRENT_USER_DATA = "SET_CURRENT_USER_DATA";
const SET_AUTHENTICATED_STATUS = "SET_AUTHENTICATED_STATUS";
const UPDATE_USER = "UPDATE_USER";
const SET_USERS = "SET_USERS";

const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_CURRENT_USER_DATA:
            return {
                ...state,
                currentUser: {
                    id: action.id,
                    email: action.email,
                    name: action.name,
                    avatarImage: action.avatarImage
                }
            }
        case SET_AUTHENTICATED_STATUS:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            }
        case UPDATE_USER:
            return {
                ...state,
                currentUser: {
                    id: state.currentUser?.id as string,
                    email: state.currentUser?.email as string,
                    name: action.userName,
                    avatarImage: action.avatarImage
                }
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        default:
            return state;
    }
}

type SetAuthenticatedStatusType = {
    type: typeof SET_AUTHENTICATED_STATUS, isAuthenticated: boolean
}
export const setAuthenticatedStatus = (isAuthenticated: boolean): SetAuthenticatedStatusType => ({
    type: SET_AUTHENTICATED_STATUS, isAuthenticated: isAuthenticated
})

type SetCurrentUserDataType = {
    type: typeof SET_CURRENT_USER_DATA, id: string, name: string, email: string, avatarImage: ArrayBuffer
}
export const setCurrentUserData = (id: string, userName: string, email: string, avatarImage: ArrayBuffer): SetCurrentUserDataType => ({
    type: SET_CURRENT_USER_DATA, id: id, name: userName, email: email, avatarImage: avatarImage
})

type UpdateUserType = {
    type: typeof UPDATE_USER, userName: string, avatarImage: ArrayBuffer | null
}
export const updateUser = (userName: string, avatarImage: ArrayBuffer): UpdateUserType => ({
    type: UPDATE_USER, userName: userName, avatarImage: avatarImage
})

type SetUsersType = {
    type: typeof SET_USERS, users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({
    type: SET_USERS, users: users
})

type ActionsTypes = SetCurrentUserDataType | SetAuthenticatedStatusType | UpdateUserType | SetUsersType;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const authRequestThunkCreator = (email: string, password: string, rememberMe: boolean): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await userApi.auth(email, password, rememberMe);
        if (response.success) {
            dispatch(setAuthenticatedStatus(true));
            const result = response.result;
            dispatch(setCurrentUserData(result.id, result.userName, result.email, result.avatarImage));
        }
        else {
            // Отправка сообщение на офрму
        }
    }
}

export const getCurrentUserRequestThunkCreator = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await userApi.getCurrentUser();
        if (response.success && response.result !== null) {
            dispatch(setAuthenticatedStatus(true));
            const result = response.result;
            dispatch(setCurrentUserData(result.id, result.userName, result.email, result.avatarImage));
        }
    }
}

export const registrationUserRequestThunkCreator = (userName: string, email: string, password: string, avatarImage: UploadChangeParam<UploadFile>): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await userApi.addUser(userName, email, password, avatarImage);
        if (!isBadStatusCode(response.status)) {
            const authResponse = await userApi.auth(email, password, true);
            dispatch(setAuthenticatedStatus(true));
            dispatch(setCurrentUserData(authResponse.result.id, authResponse.result.userName, authResponse.result.email, authResponse.result.avatarImage));
        }
    }
}

export const updateUserRequestThunkCreator = (userId: string, userName: string, avatarImage: UploadChangeParam<UploadFile>): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await userApi.updateUser(userId, userName, avatarImage);
        if (!isBadStatusCode(response.status)) {
            dispatch(updateUser(userName, await (avatarImage.file.originFileObj as Blob).arrayBuffer()));
        }
    }
}

export const getUsersByFilterThunkCreator = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const state = getState().userStore;
        const skip = calculateSkip(state.pageNumber, state.pageSize);
        const response = await userApi.getUsersByFilter(state.userFilter, skip, state.pageSize);
        const users = response.entities.map(u => {
            const user: UserType = {
                id: u.id,
                name: u.userName,
                avatarImage: u.avatarImage
            }
            return user;
        });

        dispatch(setUsers(users));
    }
}

export default userReducer;