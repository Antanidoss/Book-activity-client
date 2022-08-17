import { AppStoreType } from "./redux-store";

export const getUserName = (state: AppStoreType) => {
    return state.userStore.currentUser?.name;
}

export const getIsAuthenticated = (state: AppStoreType) => {
    return state.userStore.isAuthenticated;
}