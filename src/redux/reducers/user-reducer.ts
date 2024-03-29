import { UserOfListType } from './../types/users/userOfListType';
import { ThunkAction } from 'redux-thunk';
import { AppStoreType } from '../redux-store';
import { Dispatch } from "redux";
import { userApi } from "../../api/userApi";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { isBadStatusCode } from "../../api/instanceAxios";
import { calculateSkip } from "../../types/common/paginationType";
import { CurrentUserType } from "../types/users/currentUserType";
import { ThunkResponseType } from "../../types/common/thunkResponseType";
import { bookNoteApi } from "../../api/bookNoteApi";
import { BookNoteType, UserProfileType } from "../types/users/userProfile";
import { UserFilterType } from '../types/users/userFilterType';

export type InitialStateType = {
    currentUser?: CurrentUserType,
    isAuthenticated: boolean,
    allUsersPage: {
        pageNumber: number,
        totalUserCount: number,
        pageSize: number,
        userFilter: UserFilterType,
        users: Array<UserOfListType>,
    },
    userProfilePage: {
        userProfile?: UserProfileType,
        bookNotes?: Array<BookNoteType>
    }
}

const initialState: InitialStateType = {
    currentUser: undefined,
    isAuthenticated: false,
    allUsersPage: {
        pageNumber: 1,
        totalUserCount: 0,
        pageSize: 12,
        userFilter: { name: null },
        users: [] as Array<UserOfListType>,
    },
    userProfilePage: {
        userProfile: undefined
    }
}

const SET_CURRENT_USER_DATA = "SET_CURRENT_USER_DATA";
const SET_AUTHENTICATED_STATUS = "SET_AUTHENTICATED_STATUS";
const UPDATE_USER = "UPDATE_USER";
const SET_USERS = "SET_USERS";
const UPDATE_USER_FILTER = "UPDATE_USER_FILTER";
const SET_USER_SUBSCRIPTIONS = "SET_USER_SUBSCRIPTIONS";
const REMOVE_USER_SUBSCRIPTIONS = "REMOVE_USER_SUBSCRIPTIONS";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_BOOK_NOTES_PROFILE = "SET_BOOK_NOTES_PROFILE";

const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_CURRENT_USER_DATA:
            return {
                ...state,
                currentUser: {
                    id: action.id,
                    userName: action.userName,
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
                    ...state.currentUser as CurrentUserType,
                    userName: action.userName,
                    avatarImage: action.avatarImage
                }
            }
        case SET_USERS:
            return {
                ...state,
                allUsersPage: {
                    ...state.allUsersPage,
                    users: action.users
                }
            }
        case UPDATE_USER_FILTER:
            return {
                ...state,
                allUsersPage: {
                    ...state.allUsersPage,
                    userFilter: action.filter
                }
            }
        case SET_USER_SUBSCRIPTIONS:
            return {
                ...state,
                allUsersPage: {
                    ...state.allUsersPage,
                    users: state.allUsersPage.users.map(u => {
                        if (u.id === action.userId) {
                            u.isSubscription = true;
                        }

                        return u
                    }),
                },
                userProfilePage: {
                    ...state.userProfilePage,
                    userProfile: {
                        ...state.userProfilePage.userProfile as UserProfileType,
                        isSubscribed: action.userId === state.userProfilePage.userProfile?.id,
                        subscribersCount: state.userProfilePage.userProfile?.subscribersCount as number + 1
                    }
                }
            }
        case REMOVE_USER_SUBSCRIPTIONS:
            return {
                ...state,
                allUsersPage: {
                    ...state.allUsersPage,
                    users: state.allUsersPage.users.map(u => {
                        if (u.id === action.userId) {
                            u.isSubscription = false;
                        }

                        return u
                    }),
                },
                userProfilePage: {
                    ...state.userProfilePage,
                    userProfile: {
                        ...state.userProfilePage.userProfile as UserProfileType,
                        isSubscribed: action.userId !== state.userProfilePage.userProfile?.id,
                        subscribersCount: state.userProfilePage.userProfile?.subscribersCount as number - 1
                    }
                }
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfilePage: {
                    userProfile: action.userProfile
                }
            }
        case SET_BOOK_NOTES_PROFILE:
            return {
                ...state,
                userProfilePage: {
                    ...state.userProfilePage,
                    bookNotes: action.bookNotes
                }
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
    type: typeof SET_CURRENT_USER_DATA, id: string, userName: string, avatarImage: ArrayBuffer
}
export const setCurrentUserData = (id: string, userName: string, avatarImage: ArrayBuffer): SetCurrentUserDataType => ({
    type: SET_CURRENT_USER_DATA, id: id, userName: userName, avatarImage: avatarImage
})

type UpdateUserType = {
    type: typeof UPDATE_USER, userName: string, avatarImage: ArrayBuffer | null
}
export const updateUser = (userName: string, avatarImage: ArrayBuffer): UpdateUserType => ({
    type: UPDATE_USER, userName: userName, avatarImage: avatarImage
})

type SetUsersType = {
    type: typeof SET_USERS, users: Array<UserOfListType>
}
export const setUsers = (users: Array<UserOfListType>): SetUsersType => ({
    type: SET_USERS, users: users
})

type UpdateUserFilterType = {
    type: typeof UPDATE_USER_FILTER, filter: UserFilterType
}
export const updateUserFilter = (filter: UserFilterType): UpdateUserFilterType => ({
    type: UPDATE_USER_FILTER, filter: filter
})

type SetUserSubscriptionsType = {
    type: typeof SET_USER_SUBSCRIPTIONS, userId: string
}
export const setUserSubscriptions = (userId: string): SetUserSubscriptionsType => ({
    type: SET_USER_SUBSCRIPTIONS, userId: userId
})

type RemoveUserSubscriptionsType = {
    type: typeof REMOVE_USER_SUBSCRIPTIONS, userId: string
}
export const removeUserSubscriptions = (userId: string): RemoveUserSubscriptionsType => ({
    type: REMOVE_USER_SUBSCRIPTIONS, userId: userId
})

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE, userProfile: UserProfileType
}
export const setUserProfile = (userProfile: UserProfileType): SetUserProfileType => ({
    type: SET_USER_PROFILE, userProfile: userProfile
})

type SetBookNotesProfileType = {
    type: typeof SET_BOOK_NOTES_PROFILE, bookNotes: Array<BookNoteType>
}
export const setBookNotesProfile = (bookNotes: Array<BookNoteType>): SetBookNotesProfileType => ({
    type: SET_BOOK_NOTES_PROFILE, bookNotes: bookNotes
})

type ActionsTypes = SetCurrentUserDataType | SetAuthenticatedStatusType | UpdateUserType | SetUsersType | UpdateUserFilterType | SetUserSubscriptionsType | RemoveUserSubscriptionsType | SetUserProfileType | SetBookNotesProfileType;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const authRequestThunkCreator = (email: string, password: string, rememberMe: boolean): ThunkAction<Promise<ThunkResponseType>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await userApi.auth(email, password, rememberMe);
        if (response.success) {
            dispatch(setAuthenticatedStatus(true));
            const result = response.result;
            dispatch(setCurrentUserData(result.userId, result.userName, result.avatarImage));
        }

        return { isSuccess: response.success, errorMessage: response.errorMessage };
    }
}

export const getCurrentUserRequestThunkCreator = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await userApi.getCurrentUser();
        if (response.success && response.result !== null) {
            dispatch(setAuthenticatedStatus(true));
            const result = response.result;
            dispatch(setCurrentUserData(result.id, result.userName, result.avatarImage));
        }
    }
}

export const registrationUserRequestThunkCreator = (userName: string, email: string, password: string, avatarImage: UploadChangeParam<UploadFile>): ThunkAction<Promise<ThunkResponseType>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await userApi.addUser(userName, email, password, avatarImage);

        if (response.success) {
            const authResponse = await userApi.auth(email, password, true);
            dispatch(setAuthenticatedStatus(true));
            dispatch(setCurrentUserData(authResponse.result.userId, authResponse.result.userName, authResponse.result.avatarImage));
        }

        return { isSuccess: response.success, errorMessage: response.errorMessage };
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
        const skip = calculateSkip(state.allUsersPage.pageNumber, state.allUsersPage.pageSize);
        const response = await userApi.getUsersByFilter(state.allUsersPage.userFilter, skip, state.allUsersPage.pageSize);

        const users = response.data.users.items.map(u => {
            const user: UserOfListType = {
                id: u.id,
                name: u.userName,
                avatarImage: u.avatarDataBase64,
                isSubscriber: u.isSubscriber,
                isSubscription: u.isSubscription,
                activeBookCount: u.activeBookCount,
                bookOpinionCount: u.bookOpinionCount
            }
            return user;
        });

        dispatch(setUsers(users));
    }
}

export const subscribeToUserThunkCreator = (userId: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await userApi.subscribeToUser(userId);
        const success = !isBadStatusCode(response.status);
        if (success) {
            dispatch(setUserSubscriptions(userId));
        }

        return success;
    }
}

export const unsubscribeUserThunkCreator = (userId: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await userApi.unsubscribeUser(userId);
        const success = !isBadStatusCode(response.status);
        if (success) {
            dispatch(removeUserSubscriptions(userId));
        }

        return success;
    }
}

export const getUserProfileThunkCreator = (userId: string, forCurrentUser: boolean): ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const userProfile = await userApi.getUserProfile(userId, forCurrentUser);

        dispatch(setUserProfile(userProfile))
    }
}

export const getBookNotesProfileThunkCreator = (userId: string): ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const bookNotes = await bookNoteApi.getLastBookNotes(4, userId);

        dispatch(setBookNotesProfile(bookNotes))
    }
}

export default userReducer;