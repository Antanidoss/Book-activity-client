import React, { useEffect } from "react";
import { InferableComponentEnhancerWithProps, connect } from "react-redux";
import { AppStoreType } from "../../../redux/redux-store";
import { getUsersByFilterThunkCreator } from "../../../redux/user-reducer";
import { getUsers } from "../../../redux/user-selectors";
import { UserType } from "../../../types/userType";
import AllUser from "./AllUsers";

const AllUsersContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.getUsers();
    }, [])

    return <AllUser {...props} />
}

type MapDispatchToPropsType = {
    getUsers: typeof getUsersByFilterThunkCreator
}
const mapDispatchToProps = {
    getUsers: getUsersByFilterThunkCreator
}

type MapStateToPropsType = {
   users: Array<UserType>
}
const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    users: getUsers(state)
})

type OwnPropsType = {}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(AllUsersContainer);