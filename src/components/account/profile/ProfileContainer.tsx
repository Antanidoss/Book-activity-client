import { compose } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { AppStoreType, ExtractConnectType } from "../../../redux/redux-store";
import { getBookNotesProfileThunkCreator, getUserProfileThunkCreator, subscribeToUserThunkCreator, unsubscribeUserThunkCreator, updateUserRequestThunkCreator } from "../../../redux/reducers/user-reducer";
import { getCurUser, getIsAuthenticated, getUserProfile, getBookNotesProfile } from "../../../redux/selectors/user-selectors";
import Profile from "./Profile";
import { getCurUserStatistics } from "../../../redux/selectors/activeBooksStatistic-selectors";
import { getActiveBooksStatisticThunkCreator } from "../../../redux/reducers/activeBooksStatistic-reducer";
import { Spin } from "antd";
import { useQuery } from "../../../hoc/useQuery";
import { ActiveBooksStatisticType } from "../../../redux/types/activeBooks/activeBooksStatisticType";
import { BookNoteType, UserProfileType } from "../../../redux/types/users/userProfile";

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
            props.getUserProfile(userId, forCurrentUser),
        ]).then(() => {
            Promise.all([
                props.getBookNotes(userId)
            ]).then(() => {
                setLoading(false)
            })
        })
    }, [])

    return loading ? <div style={{ textAlign: "center", marginTop: "20%" }}><Spin size="large" spinning={loading} /></div> : <Profile {...props} />
}

type MapStateToPropsType = {
    isAuthenticated: boolean,
    statistic: ActiveBooksStatisticType,
    userProfile: UserProfileType,
    curUserId: string,
    bookNotes: Array<BookNoteType>
}

type MapDispatchToPropsType = {
    updateUser: typeof updateUserRequestThunkCreator,
    getActiveBooksStatistic: typeof getActiveBooksStatisticThunkCreator,
    getUserProfile: typeof getUserProfileThunkCreator,
    subscribeToUser: typeof subscribeToUserThunkCreator,
    unsubscribeUser: typeof unsubscribeUserThunkCreator,
    getBookNotes: typeof getBookNotesProfileThunkCreator
}

const mapDispatchToProps = {
    updateUser: updateUserRequestThunkCreator,
    getActiveBooksStatistic: getActiveBooksStatisticThunkCreator,
    getUserProfile: getUserProfileThunkCreator,
    subscribeToUser: subscribeToUserThunkCreator,
    unsubscribeUser: unsubscribeUserThunkCreator,
    getBookNotes: getBookNotesProfileThunkCreator
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    isAuthenticated: getIsAuthenticated(state),
    statistic: getCurUserStatistics(state) as ActiveBooksStatisticType,
    userProfile: getUserProfile(state) as UserProfileType,
    curUserId: getCurUser(state)?.id as string,
    bookNotes: getBookNotesProfile(state) as Array<BookNoteType>
})

type OwnPropsType = {}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default compose<React.ComponentType>(connectStore, withAuthRedirect)(ProfileContainer);