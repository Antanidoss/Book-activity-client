import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getActiveBooksByCurrentUserThunkCreator } from '../../redux/activeBook-reducer';
import { getActiveBooks } from '../../redux/activeBook-selectors';
import { AppStoreType } from '../../redux/redux-store';
import { getIsAuthenticated } from '../../redux/user-selectors';
import { ActiveBook } from '../../types/activeBookType';
import AllCurUserActiveBooks from './AllCurUserActiveBooks';

const AllCurUserActiveBooksContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.getActiveBooks();
    }, [props.activeBooks])
    return <AllCurUserActiveBooks {...props} />
}

type MapDispatchToPropsType = {
    getActiveBooks: typeof getActiveBooksByCurrentUserThunkCreator
}

const mapDispatchToProps = {
    getActiveBooks: getActiveBooksByCurrentUserThunkCreator
}

type MapStateToPropsType = {
    activeBooks: Array<ActiveBook>,
    isAuthenticated: boolean
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    activeBooks: getActiveBooks(state),
    isAuthenticated: getIsAuthenticated(state)
})

export type PropsType = MapStateToPropsType & MapDispatchToPropsType;

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(AllCurUserActiveBooksContainer)