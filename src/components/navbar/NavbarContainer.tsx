import { connect } from 'react-redux';
import React from 'react';
import { compose } from 'redux';
import { AppStoreType } from '../../redux/redux-store';
import { getAvatarImage, getIsAuthenticated, getUserName } from '../../redux/selectors/user-selectors';
import Navbar from './Navbar';

const NavbarContainer: React.FC<PropsType> = (props) => {
    return <Navbar {...props}></Navbar>
}

type MapStateToPropsType = {
    isAuthenticated: boolean,
    userName: string | undefined,
    avatarImage: ArrayBuffer | null
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    isAuthenticated: getIsAuthenticated(state),
    userName: getUserName(state),
    avatarImage: getAvatarImage(state)
})

export type PropsType = MapStateToPropsType;

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, null, null, AppStoreType>(mapStateToProps)
)(NavbarContainer)