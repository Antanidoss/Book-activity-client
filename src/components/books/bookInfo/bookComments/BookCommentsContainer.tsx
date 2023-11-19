import React from "react";
import { BookOpinionForBookInfo } from "../../../../types/books/bookInfoType";
import { AppStoreType, ExtractConnectType } from "../../../../redux/redux-store";
import { connect } from "react-redux";
import BookComments from "./BookComments";

const BookCommentsContainer: React.FC<PropsType> = (props) => {
    return <BookComments {...props} />
}

type MapStateToPropsType = {
    bookOpinions: Array<BookOpinionForBookInfo>
}

type MapDispatchToPropsType = {
    
}

const mapDispatchToProps = {
    
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => ({
  bookOpinions: ownProps.bookOpinions  
})

type OwnPropsType = {
    bookOpinions: Array<BookOpinionForBookInfo>
}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(BookCommentsContainer)