import React, { useEffect } from "react";
import { InferableComponentEnhancerWithProps, connect } from "react-redux";
import { AppStoreType } from "../../../redux/redux-store";
import { getUsersByFilterThunkCreator, subscribeToUserThunkCreator, unsubscribeUserThunkCreator } from "../../../redux/reducers/user-reducer";
import { getUserId, getUsers } from "../../../redux/selectors/user-selectors";
import { UserOfListType } from "../../../types/users/userOfListType";
import AllUser from "./AllUsers";
import UserFilterContainer from "./userFilter/UserFilterContainer";
import { getIsAuthenticated } from "../../../redux/selectors/user-selectors";

const AllUsersContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.getUsers();
    }, [])

    return (
        <>
            <UserFilterContainer />

            <AllUser {...props} />
        </>
    )
}

type MapDispatchToPropsType = {
    getUsers: typeof getUsersByFilterThunkCreator,
    subscribeToUser: typeof subscribeToUserThunkCreator,
    unsubscribeUser: typeof unsubscribeUserThunkCreator
}
const mapDispatchToProps = {
    getUsers: getUsersByFilterThunkCreator,
    subscribeToUser: subscribeToUserThunkCreator,
    unsubscribeUser: unsubscribeUserThunkCreator
}

type MapStateToPropsType = {
    users: Array<UserOfListType>,
    currentUserId?: string,
    isAuthenticated: boolean
}
const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    users: getUsers(state),
    currentUserId: getUserId(state),
    isAuthenticated: getIsAuthenticated(state)
})

type OwnPropsType = {}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(AllUsersContainer);