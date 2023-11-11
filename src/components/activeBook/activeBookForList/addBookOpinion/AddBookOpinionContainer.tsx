import React from "react";
import { connect } from "react-redux";
import { updateBookRatingRequestThunkCreator } from "../../../../redux/reducers/book-reducer";
import { AppStoreType, ExtractConnectType } from "../../../../redux/redux-store";
import { getUserId } from "../../../../redux/selectors/user-selectors";
import { BookOpinionType } from "../../../../types/books/bookOpinionType";
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
    userId: string,
    resizableButton?: boolean
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => {
    const curUserId = getUserId(state) as string;

    return {
        bookId: ownProps.bookId,
        bookRatingId: ownProps.bookRatingId,
        userId: curUserId,
        resizableButton: ownProps.resizableButton
    }
}

type OwnPropsType = {
    bookId: string,
    bookRatingId: string,
    bookOpinion?: BookOpinionType,
    resizableButton?: boolean
}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(AddBookOpinionContainer)