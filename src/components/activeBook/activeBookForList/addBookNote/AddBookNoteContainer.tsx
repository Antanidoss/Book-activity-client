import React from "react";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import { addBookNoteThunkCreator } from "../../../../redux/activeBook-reducer";
import { AppStoreType } from "../../../../redux/redux-store";
import AddBookNote from "./AddBookNote";

const AddBookNoteContainer: React.FC<PropsType> = (props) => {
    return <AddBookNote {...props}/>
}

type MapDispatchToPropsType = {
    addBookNote: typeof addBookNoteThunkCreator
}

const mapDispatchToProps =  {
    addBookNote: addBookNoteThunkCreator
}

type MapStateToPropsType = {
    activeBookId: string
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => ({
    activeBookId: ownProps.activeBookId   
})

type OwnPropsType = {
    activeBookId: string
}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(AddBookNoteContainer)