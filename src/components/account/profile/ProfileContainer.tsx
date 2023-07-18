import { compose } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { AppStoreType } from "../../../redux/redux-store";
import { updateUserRequestThunkCreator } from "../../../redux/reducers/user-reducer";
import { getCurUser, getIsAuthenticated } from "../../../redux/selectors/user-selectors";
import { UserType } from "../../../types/userType";
import Profile from "./Profile";
import { ActiveBooksStatisticType } from "../../../types/activeBooksStatisticType";
import { getCurUserStatistics } from "../../../redux/selectors/activeBooksStatistic-selectors";
import { getActiveBooksStatisticThunkCreator } from "../../../redux/reducers/activeBooksStatistic-reducer";
import { Spin } from "antd";

const ProfileContainer: React.FC<PropsType> = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.getActiveBooksStatistic().then(() => setLoading(false));
    }, [])

    return loading ? <div style={{textAlign: "center", marginTop: "20%"}}><Spin size="large" spinning={loading} /></div> : <Profile {...props} />
}

type MapStateToPropsType = {
    curUser: UserType,
    isAuthenticated: boolean,
    statistic: ActiveBooksStatisticType
}

type MapDispatchToPropsType = {
    updateUser: typeof updateUserRequestThunkCreator,
    getActiveBooksStatistic: typeof getActiveBooksStatisticThunkCreator
}

const mapDispatchToProps = {
    updateUser: updateUserRequestThunkCreator,
    getActiveBooksStatistic: getActiveBooksStatisticThunkCreator
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    curUser: getCurUser(state) as UserType,
    isAuthenticated: getIsAuthenticated(state),
    statistic: getCurUserStatistics(state) as ActiveBooksStatisticType
})

type OwnPropsType = {}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T;
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default compose<React.ComponentType>(connectStore, withAuthRedirect)(ProfileContainer);