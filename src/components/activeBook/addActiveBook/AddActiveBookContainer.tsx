import React from 'react'
import { connect } from 'react-redux'
import { addActiveBookRequestThunkCreator } from "../../../redux/reducers/activeBook-reducer"
import { AppStoreType, ExtractConnectType } from '../../../redux/redux-store'
import AddActiveBook from './AddActiveBook'
import { setActiveBookStatus } from '../../../redux/reducers/book-reducer'
import { getIsAuthenticated } from '../../../redux/selectors/user-selectors'

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
    bookId: string,
    isAuthenticated: boolean
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => ({
    bookId: ownProps.bookId,
    isAuthenticated: getIsAuthenticated(state)
})

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(AddActiveBookContainer)