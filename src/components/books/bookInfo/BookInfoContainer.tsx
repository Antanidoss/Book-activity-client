import React, { useEffect, useState } from "react";
import { BookInfoType } from "../../../types/books/bookInfoType";
import { getBookInfoThunkCreator } from "../../../redux/reducers/book-reducer";
import { getBookInfo } from "../../../redux/selectors/book-selectors";
import { AppStoreType, ExtractConnectType } from "../../../redux/redux-store";
import { compose } from "redux";
import { connect } from 'react-redux';
import { useQuery } from "../../../hoc/useQuery";
import BookInfo from "./BookInfo";
import { Spin } from "antd";

const BookInfoContainer: React.FC<PropsType> = (props) => {
    const [loading, setLoading] = useState(true);
    const query = useQuery();
    let bookId = query.get("bookId");

    useEffect(() => {
        if (bookId != null) {
            props.getBookInfo(bookId as string).then(() => setLoading(false));
        }
    }, [bookId])

    return loading
        ? <div style={{ textAlign: "center", marginTop: "20%" }}><Spin size="large" spinning={loading} /></div>
        : <BookInfo {...props} />
}

type MapStateToPropsType = {
    bookInfo: BookInfoType
}

type MapDispatchToPropsType = {
    getBookInfo: typeof getBookInfoThunkCreator
}

const mapDispatchToProps = {
    getBookInfo: getBookInfoThunkCreator
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    bookInfo: getBookInfo(state) as BookInfoType
})

type OwnPropsType = {}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default compose<React.ComponentType>(connectStore)(BookInfoContainer);