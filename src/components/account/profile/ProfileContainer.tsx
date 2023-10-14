import { compose } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { AppStoreType, ExtractConnectType } from "../../../redux/redux-store";
import { getUserProfileThunkCreator, subscribeToUserThunkCreator, unsubscribeUserThunkCreator, updateUserRequestThunkCreator } from "../../../redux/reducers/user-reducer";
import { getCurUser, getIsAuthenticated, getUserProfile } from "../../../redux/selectors/user-selectors";
import Profile from "./Profile";
import { ActiveBooksStatisticType } from "../../../types/activeBooks/activeBooksStatisticType";
import { getCurUserStatistics } from "../../../redux/selectors/activeBooksStatistic-selectors";
import { getActiveBooksStatisticThunkCreator } from "../../../redux/reducers/activeBooksStatistic-reducer";
import { Spin } from "antd";
import { UserProfileType } from "../../../types/users/userProfileType";
import { useQuery } from "../../../hoc/useQuery";

const ProfileContainer: React.FC<PropsType> = (props) => {
    const [loading, setLoading] = useState(true);
    const query = useQuery();

    useEffect(() => {
        let userId = query.get("userId") ?? "";
        let forCurrentUser: boolean = false

        if (userId === "") {
            forCurrentUser = true;
            userId = props.curUserId
        }

        Promise.all([
            props.getActiveBooksStatistic(userId),
            props.getUserProfile(userId, forCurrentUser)
        ]).then(() => setLoading(false))
    }, [])

    return loading ? <div style={{ textAlign: "center", marginTop: "20%" }}><Spin size="large" spinning={loading} /></div> : <Profile {...props} />
}

type MapStateToPropsType = {
    isAuthenticated: boolean,
    statistic: ActiveBooksStatisticType,
    userProfile: UserProfileType,
    curUserId: string
}

type MapDispatchToPropsType = {
    updateUser: typeof updateUserRequestThunkCreator,
    getActiveBooksStatistic: typeof getActiveBooksStatisticThunkCreator,
    getUserProfile: typeof getUserProfileThunkCreator,
    subscribeToUser: typeof subscribeToUserThunkCreator,
    unsubscribeUser: typeof unsubscribeUserThunkCreator
}

const mapDispatchToProps = {
    updateUser: updateUserRequestThunkCreator,
    getActiveBooksStatistic: getActiveBooksStatisticThunkCreator,
    getUserProfile: getUserProfileThunkCreator,
    subscribeToUser: subscribeToUserThunkCreator,
    unsubscribeUser: unsubscribeUserThunkCreator
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    isAuthenticated: getIsAuthenticated(state),
    statistic: getCurUserStatistics(state) as ActiveBooksStatisticType,
    userProfile: getUserProfile(state) as UserProfileType,
    curUserId: getCurUser(state)?.id as string
})

type OwnPropsType = {}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default compose<React.ComponentType>(connectStore, withAuthRedirect)(ProfileContainer);