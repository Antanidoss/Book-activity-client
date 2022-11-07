import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getBooksByFilter, updateBookFilter, updateCurrentPage } from "../../../redux/book-reducer";
import { getBookFilter } from "../../../redux/book-selectors";
import { AppStoreType } from "../../../redux/redux-store";
import { BookFilterType } from "../../../types/bookFilterType";
import BookFilter from "./BookFilter";

const BookFilterContainer: React.FC<PropsType> = (props) => {
    return <BookFilter {...props} />
}

type MapStateToPropsType = {
    bookFilter: BookFilterType
}

type MapDispatchToPropsType = {
    getBooksByFilter: typeof getBooksByFilter
    updateBookFilter: typeof updateBookFilter
    updateCurrentPage: typeof updateCurrentPage
}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
   bookFilter: getBookFilter(state)
})

const mapDispatchToProps: MapDispatchToPropsType = {
    getBooksByFilter: getBooksByFilter,
    updateBookFilter: updateBookFilter,
    updateCurrentPage: updateCurrentPage
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, mapDispatchToProps)
)(BookFilterContainer);