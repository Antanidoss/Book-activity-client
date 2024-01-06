import React from "react";
import { BookOpinionForBookInfo } from "../../../../types/books/bookInfoType";
import { AppStoreType, ExtractConnectType } from "../../../../redux/redux-store";
import { connect } from "react-redux";
import BookComments from "./BookComments";
import { addBookOpinionDislikeThunkCreator, addBookOpinionLikeThunkCreator } from "../../../../redux/reducers/book-reducer";

const BookCommentsContainer: React.FC<PropsType> = (props) => {
    return <BookComments {...props} />
}

type MapStateToPropsType = {
    bookOpinions: Array<BookOpinionForBookInfo>,
    bookId: string
}

type MapDispatchToPropsType = {
    addBookOpinionLike: typeof addBookOpinionLikeThunkCreator,
    addBookOpinionDislike: typeof addBookOpinionDislikeThunkCreator,

}

const mapDispatchToProps = {
    addBookOpinionLike: addBookOpinionLikeThunkCreator,
    addBookOpinionDislike: addBookOpinionDislikeThunkCreator
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => ({
  bookOpinions: ownProps.bookOpinions,
  bookId: ownProps.bookId
})

type OwnPropsType = {
    bookOpinions: Array<BookOpinionForBookInfo>,
    bookId: string
}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(BookCommentsContainer)