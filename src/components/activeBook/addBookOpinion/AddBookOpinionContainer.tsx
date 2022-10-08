import React from "react";
import { InferableComponentEnhancerWithProps, connect } from "react-redux";
import { updateBookRatingRequestThunkCreator } from "../../../redux/book-reducer";
import { getBookById } from "../../../redux/book-selectors";
import { AppStoreType } from "../../../redux/redux-store";
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
    bookRatingId: string
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => ({
    bookId: ownProps.bookId,
    bookRatingId: getBookById(state, ownProps.bookId)?.bookRating.id as string
})

type OwnPropsType = {
    bookId: string,
}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(AddBookOpinionContainer)