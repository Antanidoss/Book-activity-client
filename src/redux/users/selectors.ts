import { RootState } from "../redux-store";

export const userSelectors = {
    userName: (state: RootState) => {
        return state.users.currentUser?.userName;
    },
    isAuthenticated: (state: RootState) => {
        return state.users.isAuthenticated;
    },
    userId: (state: RootState) => {
        return state.users.currentUser?.id;
    },
    curUser: (state: RootState) => {
        return state.users.currentUser;
    },
    userFilter: (state: RootState) => {
        return state.users.allUsersPage.userFilter;
    }
}