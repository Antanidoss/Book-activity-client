import React from "react";
import { InferableComponentEnhancerWithProps, connect } from "react-redux";
import { updateBookRatingRequestThunkCreator } from "../../../redux/book-reducer";
import { getBookById } from "../../../redux/book-selectors";
import { AppStoreType } from "../../../redux/redux-store";
import { getUserId } from "../../../redux/user-selectors";
import { BookOpinionType } from "../../../types/bookOpinionType";
import { BookRatingType } from "../../../types/bookRatingType";
import AddBookOpinion from "./AddBookOpinion";

const AddBookOpinionContainer: React.FC<PropsType> = (props) => {
    return <AddBookOpinion {...props} />
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
    userHasOpinion: boolean,
    userId: string,
    bookOpinion: BookOpinionType | null
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => {
    const curUserId = getUserId(state) as string;
    const bookRating = getBookById(state, ownProps.bookId)?.bookRating as BookRatingType;
    const bookOpinion = bookRating?.bookOpinions.find(o => o.userId == curUserId) as BookOpinionType;

    return {
        bookId: ownProps.bookId,
        bookRatingId: bookRating.id as string,
        userHasOpinion: bookOpinion !== null,
        bookOpinion: bookOpinion,
        userId: curUserId
    }
}

type OwnPropsType = {
    bookId: string,
}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(AddBookOpinionContainer)