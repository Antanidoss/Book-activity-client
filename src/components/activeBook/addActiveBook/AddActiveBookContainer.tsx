import React from 'react'
import { connect } from 'react-redux'
import { addActiveBookRequestThunkCreator } from "../../../redux/activeBook-reducer"
import { AppStoreType } from '../../../redux/redux-store'
import AddActiveBook from './AddActiveBook'
import { InferableComponentEnhancerWithProps } from 'react-redux'
import { setActiveBookStatus } from '../../../redux/book-reducer'

const AddActiveBookContainer: React.FC<PropsType> = (props) => {
    return <AddActiveBook {...props}/>
}

export type OwnPropsType = {
    bookId: string
}

type MapDispatchToPropsType = {
    addActiveBook: typeof addActiveBookRequestThunkCreator,
    setActiveBookStatus: typeof setActiveBookStatus
}

const mapDispatchToProps = {
    addActiveBook: addActiveBookRequestThunkCreator,
    setActiveBookStatus: (bookId: string) => setActiveBookStatus(bookId)
}

type MapStateToPropsType = {
    bookId: string
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => ({
    bookId: ownProps.bookId
})

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(AddActiveBookContainer)