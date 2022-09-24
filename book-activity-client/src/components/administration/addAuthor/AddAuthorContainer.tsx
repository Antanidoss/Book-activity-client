import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { addAuthorRequestThunkCreator } from '../../../redux/author-reducer'
import { AppStoreType } from '../../../redux/redux-store'
import AddAuthor from './AddAuthor'

const AddAuthorContainer: React.FC<PropsType> = (props) => {
    return <AddAuthor {...props} />
}

type MapDispatchToPropsType = {
    addAuthor: typeof addAuthorRequestThunkCreator
}

const mapDispatchToProps = ({
    addAuthor: addAuthorRequestThunkCreator
})

export type PropsType = MapDispatchToPropsType

export default compose<React.ComponentType>(
    connect<null, MapDispatchToPropsType, null, AppStoreType>(null, mapDispatchToProps)
)(AddAuthorContainer);