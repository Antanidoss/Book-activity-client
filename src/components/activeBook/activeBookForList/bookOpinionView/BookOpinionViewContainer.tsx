import React from "react";
import { connect } from "react-redux";
import { updateBookRatingRequestThunkCreator } from "../../../../redux/reducers/book-reducer";
import { AppStoreType, ExtractConnectType } from "../../../../redux/redux-store";
import { getUserId } from "../../../../redux/selectors/user-selectors";
import { BookOpinionType } from "../../../../types/books/bookOpinionType";
import BookOpinionView from "./BookOpinionView";


const BookOpinionViewContainer: React.FC<PropsType> = (props) => {
    return <BookOpinionView {...props} />
}

type MapDispatchToPropsType = {
    updateRating: typeof updateBookRatingRequestThunkCreator,
}

const mapDispatchToProps =  {
    updateRating: updateBookRatingRequestThunkCreator,
}

type MapStateToPropsType = {
    bookId: string,
    bookRatingId: string,
    userId: string,
    bookOpinion: BookOpinionType | undefined
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => {
    const curUserId = getUserId(state) as string;

    return {
        bookId: ownProps.bookId,
        bookRatingId: ownProps.bookRatingId,
        bookOpinion: ownProps.bookOpinion,
        userId: curUserId
    }
}

type OwnPropsType = {
    bookId: string,
    bookRatingId: string,
    bookOpinion?: BookOpinionType
}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(BookOpinionViewContainer)