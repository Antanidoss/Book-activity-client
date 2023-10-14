import React from 'react'
import { connect } from 'react-redux'
import { addAuthorRequestThunkCreator } from '../../../redux/reducers/author-reducer'
import { AppStoreType, ExtractConnectType } from '../../../redux/redux-store'
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

const connectStore = connect<unknown, MapDispatchToPropsType, unknown, AppStoreType>(null, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default connectStore(AddAuthorContainer);