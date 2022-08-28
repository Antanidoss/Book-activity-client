import React from 'react'
import { connect } from 'react-redux'
import { addActiveBookRequestThunkCreator } from "../../../redux/activeBook-reducer"
import { AppStoreType } from '../../../redux/redux-store'
import AddActiveBook from './AddActiveBook'
import { InferableComponentEnhancerWithProps } from 'react-redux'

const AddActiveBookContainer: React.FC<PropsType> = (props) => {
    return <AddActiveBook {...props}/>
}

export type OwnProps = {
    bookId: string
}

type MapDispatchToPropsType = {
    addActiveBook: typeof addActiveBookRequestThunkCreator
}

const mapDispatchToProps = {
    addActiveBook: addActiveBookRequestThunkCreator
}

type MapStateToProps = {
    bookId: string
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnProps): MapStateToProps => ({
    bookId: ownProps.bookId
})

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToProps, MapDispatchToPropsType, OwnProps, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(AddActiveBookContainer)