import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { getBooksRequestThunkCreator } from "../../redux/book-reducer";
import { getBooks, getPageNumber, getPageSize, getTotalBookCount } from "../../redux/book-selectors";
import { AppStoreType } from "../../redux/redux-store";
import AllBooks from "./AllBooks";
import { BookType } from "../../types/bookType";
import { Spin } from "antd";

const AllBooksContainer: React.FC<PropsType> = (props, bookId: string) => {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        props.getBooks();
        setLoading(false);
    }, [])

    return loading ? <div style={{textAlign: "center", marginTop: "30%"}}><Spin size="large" spinning={loading} /></div> : <AllBooks {...props}></AllBooks>
}

type MapStateToPropsType = {
    pageNumber: number,
    pageSize: number,
    books: Array<BookType>,
    totalBookCount: number
}

type MapDispatchToPropsType = {
    getBooks: typeof getBooksRequestThunkCreator
}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    pageNumber: getPageNumber(state),
    pageSize: getPageSize(state),
    books: getBooks(state),
    totalBookCount: getTotalBookCount(state)
})

const mapDispatchToProps = {
    getBooks: getBooksRequestThunkCreator
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, mapDispatchToProps)
)(AllBooksContainer);