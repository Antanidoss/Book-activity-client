import { UserType } from "../types/userType"
import { ThunkAction } from 'redux-thunk';
import { AppStoreType } from './redux-store';
import { Dispatch } from "redux";
import { userApi } from "../api/userApi";

export type InitialStateType = {
    currentUser: UserType | null,
    isAuthenticated: boolean,
}

const initialState: InitialStateType = {
    currentUser: null,
    isAuthenticated: false
}

const SET_CURRENT_USER_DATA = "SET_CURRENT_USER_DATA";
const SET_AUTHENTICATED_STATUS = "SET_AUTHENTICATED_STATUS";

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
            default:
                return state;
    }
}

type SetAuthenticatedStatus = {
    type: typeof SET_AUTHENTICATED_STATUS, isAuthenticated: boolean
}
export const setAuthenticatedStatus = (isAuthenticated: boolean): SetAuthenticatedStatus => ({
    type: SET_AUTHENTICATED_STATUS, isAuthenticated: isAuthenticated
})

type SetCurrentUserDataType = {
    type: typeof SET_CURRENT_USER_DATA, id: string, name: string, email: string, avatarImage: ArrayBuffer
}
export const setCurrentUserData = (id: string, userName: string, email: string, avatarImage: ArrayBuffer): SetCurrentUserDataType => ({
    type: SET_CURRENT_USER_DATA, id: id, name: userName, email: email, avatarImage: avatarImage
})

type ActionsTypes = SetCurrentUserDataType | SetAuthenticatedStatus;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const authRequestThunkCreator = (email: string, paswword: string, rememberMe: boolean): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await userApi.auth(email, paswword, rememberMe);
        if (response.success) {
            dispatch(setAuthenticatedStatus(true));
            const result = response.result;
            dispatch(setCurrentUserData(result.userId, result.userName, result.email, result.avatarImage));
        }
        else {
            // Отправка сообщение на офрму
        }
    }
}

export const getCurrentUserRequestThunkCreator = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await userApi.getCurrentUser();
        if (response.success) {
            dispatch(setAuthenticatedStatus(true));
            const result = response.result;
            dispatch(setCurrentUserData(result.userId, result.userName, result.email, result.avatarImage));
        }
    }
}

export default userReducer;