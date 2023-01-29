import React, { useEffect } from "react";
import { InferableComponentEnhancerWithProps, connect } from "react-redux";
import { AppStoreType } from "../../../redux/redux-store";
import { getUsersByFilterThunkCreator, subscribeToUserThunkCreator, unsubscribeUserThunkCreator } from "../../../redux/user-reducer";
import { getUserId, getUsers } from "../../../redux/user-selectors";
import { UserType } from "../../../types/userType";
import AllUser from "./AllUsers";
import UserFilterContainer from "./userFilter/UserFilterContainer";

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
    users: Array<UserType>,
    currentUserId?: string
}
const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    users: getUsers(state),
    currentUserId: getUserId(state)
})

type OwnPropsType = {}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(AllUsersContainer);