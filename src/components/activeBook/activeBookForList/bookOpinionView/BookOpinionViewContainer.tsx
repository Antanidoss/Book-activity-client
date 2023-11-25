import React from "react";
import { connect } from "react-redux";
import { getBookOpinionThunkCreator, updateBookRatingRequestThunkCreator } from "../../../../redux/reducers/book-reducer";
import { AppStoreType, ExtractConnectType } from "../../../../redux/redux-store";
import { getUserId } from "../../../../redux/selectors/user-selectors";
import { BookOpinionType } from "../../../../types/books/bookOpinionType";
import BookOpinionView from "./BookOpinionView";
import { getBookOpinion } from "../../../../redux/selectors/book-selectors";

const BookOpinionViewContainer: React.FC<PropsType> = (props) => {
    return <BookOpinionView {...props} />
}

type MapDispatchToPropsType = {
    updateRating: typeof updateBookRatingRequestThunkCreator,
    getBookOpinion: typeof getBookOpinionThunkCreator
}

const mapDispatchToProps = {
    updateRating: updateBookRatingRequestThunkCreator,
    getBookOpinion: getBookOpinionThunkCreator
}

type MapStateToPropsType = {
    bookId: string,
    bookRatingId: string,
    userId: string,
    bookOpinion: BookOpinionType | undefined,
    resizableButton?: boolean
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => ({
    bookId: ownProps.bookId,
    bookRatingId: ownProps.bookRatingId,
    bookOpinion: getBookOpinion(state),
    userId: getUserId(state) as string,
    resizableButton: ownProps.resizableButton
})

type OwnPropsType = {
    bookId: string,
    bookRatingId: string,
    resizableButton?: boolean
}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(BookOpinionViewContainer)