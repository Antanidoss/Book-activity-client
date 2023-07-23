import React from "react";
import { InferableComponentEnhancerWithProps, connect } from "react-redux";
import { AppStoreType } from "../../../../redux/redux-store";
import { getUsersByFilterThunkCreator, updateUserFilter } from "../../../../redux/reducers/user-reducer";
import { getUserFilter } from "../../../../redux/selectors/user-selectors";
import { UserFilterType } from "../../../../types/users/userFilterType";
import UserFilter from "./UserFilter";

const UserFilterContainer: React.FC<PropsType> = (props) => {
    return <UserFilter {...props} />
}

type MapDispatchToPropsType = {
    getUsers: typeof getUsersByFilterThunkCreator,
    updateUserFilter: typeof updateUserFilter
}
const mapDispatchToProps = {
    getUsers: getUsersByFilterThunkCreator,
    updateUserFilter: updateUserFilter
}

type MapStateToPropsType = {
    userFilter: UserFilterType
}
 const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    userFilter: getUserFilter(state)
 })

type OwnPropsType = {}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(UserFilterContainer);