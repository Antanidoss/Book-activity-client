import { AppStoreType } from "../redux-store";

export const getUserName = (state: AppStoreType) => {
    return state.userStore.currentUser?.userName;
}

export const getIsAuthenticated = (state: AppStoreType) => {
    return state.userStore.isAuthenticated;
}

export const getAvatarImage = (state: AppStoreType) => {
    return state.userStore.currentUser?.avatarImage ?? null;
}

export const getUserId = (state: AppStoreType) => {
    return state.userStore.currentUser?.id;
}

export const getCurUser = (state: AppStoreType) => {
    return state.userStore.currentUser;
}

export const getUsers = (state: AppStoreType) => {
    return state.userStore.allUsersPage.users;
}

export const getUserFilter = (state: AppStoreType) => {
    return state.userStore.allUsersPage.userFilter;
}

export const getUserProfile = (state: AppStoreType) => {
    return state.userStore.userProfilePage.userProfile;
}