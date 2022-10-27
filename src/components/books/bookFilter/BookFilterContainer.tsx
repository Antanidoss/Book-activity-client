import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getBooksByFilter } from "../../../redux/book-reducer";
import { AppStoreType } from "../../../redux/redux-store";
import BookFilter from "./BookFilter";

const BookFilterContainer: React.FC<PropsType> = (props) => {
    return <BookFilter {...props} />
}

type MapStateToPropsType = {

}

type MapDispatchToPropsType = {
    getBooksByFilter: typeof getBooksByFilter
}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
   
})

const mapDispatchToProps: MapDispatchToPropsType = {
    getBooksByFilter: getBooksByFilter
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, mapDispatchToProps)
)(BookFilterContainer);