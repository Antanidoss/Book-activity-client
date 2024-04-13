import { connect } from 'react-redux';
import React from 'react';
import { compose } from 'redux';
import { AppStoreType } from '../../redux/redux-store';
import { getCurUser, getIsAuthenticated } from '../../redux/selectors/user-selectors';
import Navbar from './Navbar';
import { CurrentUserType } from '../../redux/types/users/currentUserType';

const NavbarContainer: React.FC<PropsType> = (props) => {
    return <Navbar {...props}></Navbar>
}

type MapStateToPropsType = {
    isAuthenticated: boolean,
    currentUser?: CurrentUserType
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    isAuthenticated: getIsAuthenticated(state),
    currentUser: getCurUser(state)
})

export type PropsType = MapStateToPropsType;

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, null, null, AppStoreType>(mapStateToProps)
)(NavbarContainer)