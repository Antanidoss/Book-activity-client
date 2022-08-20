import { type } from '@testing-library/user-event/dist/type'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { addActiveBookRequestThunkCreator } from "../../../redux/activeBook-reducer"
import { AppStoreType } from '../../../redux/redux-store'
import AddActiveBook from './AddActiveBook'

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

export type PropsType = MapDispatchToPropsType & OwnProps;

export default compose<React.ComponentType>(
    connect<null, MapDispatchToPropsType, OwnProps, AppStoreType>(null, mapDispatchToProps)
)(AddActiveBookContainer)