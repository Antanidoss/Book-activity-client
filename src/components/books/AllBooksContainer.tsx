import React, { useEffect, useState } from "react";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import { getBooksByFilter } from "../../redux/reducers/book-reducer";
import { getBooks, getPageNumber, getPageSize, getTotalBookCount } from "../../redux/selectors/book-selectors";
import { AppStoreType } from "../../redux/redux-store";
import AllBooks from "./AllBooks";
import { BookType } from "../../types/bookType";
import { Spin } from "antd";
import BookFilterContainer from "./bookFilter/BookFilterContainer";

const AllBooksContainer: React.FC<PropsType> = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.getBooks().then(() => setLoading(false));
    }, [])

    if (loading) {
        return <div style={{ textAlign: "center", marginTop: "20%" }}><Spin size="large" spinning={loading} /></div>
    }

    return (
        <>
            <BookFilterContainer />
            
            <AllBooks {...props}></AllBooks>
        </>
    )
}

type MapStateToPropsType = {
    pageNumber: number,
    pageSize: number,
    books: Array<BookType>,
    totalBookCount: number
}

type MapDispatchToPropsType = {
    getBooks: typeof getBooksByFilter
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    pageNumber: getPageNumber(state),
    pageSize: getPageSize(state),
    books: getBooks(state),
    totalBookCount: getTotalBookCount(state)
})

const mapDispatchToProps = {
    getBooks: getBooksByFilter
}

type OwnPropsType = {}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(AllBooksContainer)