import { compose } from "@reduxjs/toolkit";
import React from "react";
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { AppStoreType } from "../../../redux/redux-store";
import { updateUserRequestThunkCreator } from "../../../redux/reducers/user-reducer";
import { getCurUser, getIsAuthenticated } from "../../../redux/selectors/user-selectors";
import { UserType } from "../../../types/userType";
import Profile from "./Profile";

const ProfileContainer: React.FC<PropsType> = (props) => {
    return <Profile {...props} />
}

type MapStateToPropsType = {
    curUser: UserType,
    isAuthenticated: boolean
}

type MapDispatchToPropsType = {
    updateUser: typeof updateUserRequestThunkCreator
}

const mapDispatchToProps = {
    updateUser: updateUserRequestThunkCreator
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    curUser: getCurUser(state) as UserType,
    isAuthenticated: getIsAuthenticated(state)
})

type OwnPropsType = {}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T;
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default compose<React.ComponentType>(connectStore, withAuthRedirect)(ProfileContainer);