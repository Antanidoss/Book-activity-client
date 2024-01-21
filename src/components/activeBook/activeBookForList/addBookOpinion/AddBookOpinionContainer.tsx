import React from "react";
import { connect } from "react-redux";
import { addBookOpinionThunkCreator } from "../../../../redux/reducers/book-reducer";
import { AppStoreType, ExtractConnectType } from "../../../../redux/redux-store";
import { getIsAuthenticated, getUserId } from "../../../../redux/selectors/user-selectors";
import AddBookOpinion from "./AddBookOpinion";

const AddBookOpinionContainer: React.FC<PropsType> = (props) => {
    return <AddBookOpinion {...props} />
}

type MapDispatchToPropsType = {
    addBookOpinion: typeof addBookOpinionThunkCreator,
}

const mapDispatchToProps = {
    addBookOpinion: addBookOpinionThunkCreator,
}

type MapStateToPropsType = {
    bookId: string,
    userId: string,
    resizableButton?: boolean,
    onAddedOpinion?: () => void,
    isAuthenticated: boolean
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => ({
    bookId: ownProps.bookId,
    userId: getUserId(state) as string,
    resizableButton: ownProps.resizableButton,
    onAddedOpinion: ownProps.onAddedOpinion,
    isAuthenticated: getIsAuthenticated(state)
})

type OwnPropsType = {
    bookId: string,
    resizableButton?: boolean,
    onAddedOpinion?: () => void
}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(AddBookOpinionContainer)