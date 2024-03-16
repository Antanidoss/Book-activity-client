import React from "react";
import { connect } from "react-redux";
import { getBooksByFilter, getCategoriesByTitleRequestThunkCreator, updateBookFilter, updateCurrentPage } from "../../../redux/reducers/book-reducer";
import { getBookFilter } from "../../../redux/selectors/book-selectors";
import { AppStoreType, ExtractConnectType } from "../../../redux/redux-store";
import BookFilter from "./BookFilter";
import { BookFilterType } from "../../../redux/types/books/bookFilter";

const BookFilterContainer: React.FC<PropsType> = (props) => {
    return <BookFilter {...props} />
}

type MapStateToPropsType = {
    bookFilter: BookFilterType,
    setLoading: (value: React.SetStateAction<boolean>) => void
}

type MapDispatchToPropsType = {
    getBooksByFilter: typeof getBooksByFilter
    updateBookFilter: typeof updateBookFilter
    updateCurrentPage: typeof updateCurrentPage
    getCategories: typeof getCategoriesByTitleRequestThunkCreator
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnProps): MapStateToPropsType => ({
   bookFilter: getBookFilter(state),
   setLoading: ownProps.setLoading
})

const mapDispatchToProps: MapDispatchToPropsType = {
    getBooksByFilter: getBooksByFilter,
    updateBookFilter: updateBookFilter,
    updateCurrentPage: updateCurrentPage,
    getCategories: getCategoriesByTitleRequestThunkCreator
}

type OwnProps = {
    setLoading: (value: React.SetStateAction<boolean>) => void
}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStoreType>(mapStateToProps, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default connectStore(BookFilterContainer);