import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppStoreType, ExtractConnectType } from "../../../redux/redux-store";
import { registrationUserRequestThunkCreator } from "../../../redux/reducers/user-reducer";
import { getIsAuthenticated } from "../../../redux/selectors/user-selectors";
import Registration from "./Registration";

const RegistrationContainer: React.FC<PropsType> = (props) => {
    return <Registration {...props} />
};

type MapStateToPropsType = {
    isAuthenticated: boolean
};

type MapDispatchToPropsType = {
    registration: typeof registrationUserRequestThunkCreator
};

const mapDispatchToProps = {
    registration: registrationUserRequestThunkCreator
};

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    isAuthenticated: getIsAuthenticated(state)
});

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, unknown, AppStoreType>(mapStateToProps, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default compose<React.ComponentType>(connectStore)(RegistrationContainer);