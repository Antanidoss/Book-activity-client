import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { getBooksRequestThunkCreator } from "../../redux/book-reducer";
import { getBooks, getPageNumber, getPageSize } from "../../redux/book-selectors";
import { AppStoreType } from "../../redux/redux-store";
import AllBooks from "./AllBooks";
import { BookType } from "../../types/bookType";

const AllBooksContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.getBooks();
    }, [])
    return <AllBooks {...props}></AllBooks>
}

type MapStateToPropsType = {
    pageNumber: number,
    pageSize: number,
    books: Array<BookType>
}

type MapDispatchToPropsType = {
    getBooks: typeof getBooksRequestThunkCreator
}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    pageNumber: getPageNumber(state),
    pageSize: getPageSize(state),
    books: getBooks(state)
})

const mapDispatchToProps = {
    getBooks: getBooksRequestThunkCreator
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, mapDispatchToProps)
)(AllBooksContainer);