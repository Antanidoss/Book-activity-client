import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { authRequestThunkCreator } from '../../../redux/reducers/user-reducer';
import { AppStoreType } from '../../../redux/redux-store';
import Login from './Login';
import { getIsAuthenticated } from '../../../redux/selectors/user-selectors';

const LoginContainer: React.FC<PropsType> = (props) => {
    return <Login {...props}></Login>
}

type MapStateToPropsType = {
    isAuthenticated: boolean
}

type MapDispatchToPropsType = {
    auth: typeof authRequestThunkCreator
}

const mapDispatchToProps = {
    auth: authRequestThunkCreator
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    isAuthenticated: getIsAuthenticated(state)
})

export type PropsType = MapDispatchToPropsType & MapStateToPropsType;

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, mapDispatchToProps)
)(LoginContainer)