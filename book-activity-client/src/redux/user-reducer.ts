import { UserType } from "../types/userType"
import { ThunkAction } from 'redux-thunk';
import { AppStoreType } from './redux-store';
import { Dispatch } from "redux";
import { userApi } from "../api/userApi";

export type InitialStateType = {
    currentUser: UserType | null,
    isAuthenticated: boolean
}

let initialState: InitialStateType = {
    currentUser: null,
    isAuthenticated: false
}

const SET_CURRENT_USER_DATA = "SET_CURRENT_USER_DATA";

const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_CURRENT_USER_DATA:
            return {
                ...state,
                currentUser: {
                    email: action.email,
                    name: action.name
                }
            }
            default:
                return state;
    }
}

type SetCurrentUserDataType = {
    type: typeof SET_CURRENT_USER_DATA, name: string, email: string
}

export const setCurrentUserData = (userName: string, email: string): SetCurrentUserDataType => ({
    type: SET_CURRENT_USER_DATA, name: userName, email: email
})

type ActionsTypes = SetCurrentUserDataType;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const authRequestThunkCreator = (email: string, paswword: string, rememberMe: boolean): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let response = await userApi.auth(email, paswword, rememberMe);
        dispatch(setCurrentUserData(response.result.userName, response.result.email));
    }
}

export default userReducer;