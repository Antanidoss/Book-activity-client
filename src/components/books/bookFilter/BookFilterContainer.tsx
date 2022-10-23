import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppStoreType } from "../../../redux/redux-store";
import BookFilter from "./BookFilter";

const BookFilterContainer: React.FC<PropsType> = (props) => {
    return <BookFilter {...props} />
}

type MapStateToPropsType = {

}

type MapDispatchToPropsType = {

}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
   
})

const mapDispatchToProps = {

}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, mapDispatchToProps)
)(BookFilterContainer);