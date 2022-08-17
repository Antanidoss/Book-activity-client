import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { authRequestThunkCreator } from '../../../redux/user-reducer';
import { AppStoreType } from '../../../redux/redux-store';
import Login from './Login';

const LoginContainer: React.FC<PropsType> = (props) => {
    return <Login {...props}></Login>
}

type MapDispatchToPropsType = {
    auth: typeof authRequestThunkCreator
}

const mapDispatchToProps = {
    auth: authRequestThunkCreator
}

export type PropsType = MapDispatchToPropsType;

export default compose<React.ComponentType>(
    connect<null, MapDispatchToPropsType, null, AppStoreType>(null, mapDispatchToProps)
)(LoginContainer)