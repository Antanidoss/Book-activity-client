import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppStoreType } from "../../../redux/redux-store";
import { registrationUserRequestThunkCreator } from "../../../redux/user-reducer";
import { getIsAuthenticated } from "../../../redux/user-selectors";
import Registration from "./Registration";

const RegistrationContainer: React.FC<PropsType> = (props) => {
    return <Registration {...props} />
}

type MapStateToPropsType = {
    isAuthenticated: boolean
}

type MapDispatchToPropsType = {
    registration: typeof registrationUserRequestThunkCreator
}

const mapDispatchToProps = {
    registration: registrationUserRequestThunkCreator
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    isAuthenticated: getIsAuthenticated(state)
})

export type PropsType = MapDispatchToPropsType & MapStateToPropsType;

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, mapDispatchToProps)
)(RegistrationContainer)