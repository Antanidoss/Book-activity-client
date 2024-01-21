import React from "react";
import { BookOpinionForBookInfo } from "../../../../types/books/bookInfoType";
import { AppStoreType, ExtractConnectType } from "../../../../redux/redux-store";
import { connect } from "react-redux";
import BookComments from "./BookComments";
import { addBookOpinionDislikeThunkCreator, addBookOpinionLikeThunkCreator, removeBookOpinionDislikeThunkCreator, removeBookOpinionLikeThunkCreator } from "../../../../redux/reducers/book-reducer";
import { getIsAuthenticated } from "../../../../redux/selectors/user-selectors";

const BookCommentsContainer: React.FC<PropsType> = (props) => {
    return <BookComments {...props} />
}

type MapStateToPropsType = {
    bookOpinions: Array<BookOpinionForBookInfo>,
    bookId: string,
    isAuthenticated: boolean
}

type MapDispatchToPropsType = {
    addBookOpinionLike: typeof addBookOpinionLikeThunkCreator,
    addBookOpinionDislike: typeof addBookOpinionDislikeThunkCreator,
    removeBookOpinionDislike: typeof removeBookOpinionDislikeThunkCreator,
    removeBookOpinionLike: typeof removeBookOpinionLikeThunkCreator
}

const mapDispatchToProps = {
    addBookOpinionLike: addBookOpinionLikeThunkCreator,
    addBookOpinionDislike: addBookOpinionDislikeThunkCreator,
    removeBookOpinionDislike: removeBookOpinionDislikeThunkCreator,
    removeBookOpinionLike: removeBookOpinionLikeThunkCreator
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => ({
  bookOpinions: ownProps.bookOpinions,
  bookId: ownProps.bookId,
  isAuthenticated: getIsAuthenticated(state)
})

type OwnPropsType = {
    bookOpinions: Array<BookOpinionForBookInfo>,
    bookId: string
}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(BookCommentsContainer)