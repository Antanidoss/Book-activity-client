import { RootState } from "../redux-store";

export const getUserName = (state: RootState) => {
    return state.users.currentUser?.userName;
}

export const getIsAuthenticated = (state: RootState) => {
    return state.users.isAuthenticated;
}

export const getUserId = (state: RootState) => {
    return state.users.currentUser?.id;
}

export const getCurUser = (state: RootState) => {
    return state.users.currentUser;
}

export const getUserFilter = (state: RootState) => {
    return state.users.allUsersPage.userFilter;
}