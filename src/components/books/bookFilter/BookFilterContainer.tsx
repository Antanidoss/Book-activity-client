import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getBooksByFilter, getCategoriesByTitleRequestThunkCreator, updateBookFilter, updateCurrentPage } from "../../../redux/reducers/book-reducer";
import { getBookFilter } from "../../../redux/selectors/book-selectors";
import { AppStoreType, ExtractConnectType } from "../../../redux/redux-store";
import BookFilter from "./BookFilter";
import { BookFilterType } from "../../../redux/types/books/bookFilter";

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
    getCategories: typeof getCategoriesByTitleRequestThunkCreator
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
   bookFilter: getBookFilter(state)
})

const mapDispatchToProps: MapDispatchToPropsType = {
    getBooksByFilter: getBooksByFilter,
    updateBookFilter: updateBookFilter,
    updateCurrentPage: updateCurrentPage,
    getCategories: getCategoriesByTitleRequestThunkCreator
}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, unknown, AppStoreType>(mapStateToProps, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default connectStore(BookFilterContainer);