import React from "react";
import { connect } from "react-redux";
import { AppStoreType, ExtractConnectType } from "../../../../redux/redux-store";
import { getUsersByFilterThunkCreator, updateUserFilter } from "../../../../redux/reducers/user-reducer";
import { getUserFilter } from "../../../../redux/selectors/user-selectors";
import UserFilter from "./UserFilter";
import { UserFilterType } from "../../../../redux/types/users/userFilterType";

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

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, unknown, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(UserFilterContainer);