import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getActiveBooksByCurrentUserThunkCreator, removeActiveBookThunkCreator } from '../../redux/activeBook-reducer';
import { getActiveBooks, getPageNumber, getTotalActiveBookCount } from '../../redux/activeBook-selectors';
import { AppStoreType } from '../../redux/redux-store';
import { getIsAuthenticated } from '../../redux/user-selectors';
import { ActiveBook } from '../../types/activeBookType';
import AllCurUserActiveBooks from './AllCurUserActiveBooks';

const AllCurUserActiveBooksContainer: React.FC<PropsType> = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.getActiveBooks();
        setLoading(false);
    }, [])

    return loading ? <div style={{textAlign: "center", marginTop: "30%"}}><Spin size="large" spinning={loading} /></div> : <AllCurUserActiveBooks {...props} />
}

type MapDispatchToPropsType = {
    getActiveBooks: typeof getActiveBooksByCurrentUserThunkCreator,
    removeActiveBook: typeof removeActiveBookThunkCreator
}

const mapDispatchToProps = {
    getActiveBooks: getActiveBooksByCurrentUserThunkCreator,
    removeActiveBook: removeActiveBookThunkCreator,
}

type MapStateToPropsType = {
    activeBooks: Array<ActiveBook>,
    isAuthenticated: boolean,
    pageNumber: number,
    totalActiveBookCount: number
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    activeBooks: getActiveBooks(state),
    isAuthenticated: getIsAuthenticated(state),
    pageNumber: getPageNumber(state),
    totalActiveBookCount: getTotalActiveBookCount(state)
})

export type PropsType = MapStateToPropsType & MapDispatchToPropsType;

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(AllCurUserActiveBooksContainer)