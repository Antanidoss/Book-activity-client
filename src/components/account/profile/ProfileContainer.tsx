import { compose } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { AppStoreType } from "../../../redux/redux-store";
import { getUserProfileThunkCreator, updateUserRequestThunkCreator } from "../../../redux/reducers/user-reducer";
import { getCurUser, getIsAuthenticated, getUserProfile } from "../../../redux/selectors/user-selectors";
import Profile from "./Profile";
import { ActiveBooksStatisticType } from "../../../types/activeBooksStatisticType";
import { getCurUserStatistics } from "../../../redux/selectors/activeBooksStatistic-selectors";
import { getActiveBooksStatisticThunkCreator } from "../../../redux/reducers/activeBooksStatistic-reducer";
import { Spin } from "antd";
import { UserProfileType } from "../../../types/api/userProfileType";
import { useQuery } from "../../../hoc/useQuery";

const ProfileContainer: React.FC<PropsType> = (props) => {
    const [loading, setLoading] = useState(true);
    let query = useQuery();

    useEffect(() => {
        const userId = query.get("userId") ?? props.curUserId;
        props.getActiveBooksStatistic(userId).then(() => setLoading(false));
        props.getUserProfile(userId)
    }, [])

    return loading ? <div style={{textAlign: "center", marginTop: "20%"}}><Spin size="large" spinning={loading} /></div> : <Profile {...props} />
}

type MapStateToPropsType = {
    isAuthenticated: boolean,
    statistic: ActiveBooksStatisticType,
    userProfile: UserProfileType,
    curUserId: string,
}

type MapDispatchToPropsType = {
    updateUser: typeof updateUserRequestThunkCreator,
    getActiveBooksStatistic: typeof getActiveBooksStatisticThunkCreator,
    getUserProfile: typeof getUserProfileThunkCreator
}

const mapDispatchToProps = {
    updateUser: updateUserRequestThunkCreator,
    getActiveBooksStatistic: getActiveBooksStatisticThunkCreator,
    getUserProfile: getUserProfileThunkCreator
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => {
    return {
        isAuthenticated: getIsAuthenticated(state),
        statistic: getCurUserStatistics(state) as ActiveBooksStatisticType,
        userProfile: getUserProfile(state) as UserProfileType,
        curUserId: getCurUser(state)?.id as string
    }
}

type OwnPropsType = {}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T;
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default compose<React.ComponentType>(connectStore, withAuthRedirect)(ProfileContainer);