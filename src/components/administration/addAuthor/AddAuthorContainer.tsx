import React from 'react'
import { connect, InferableComponentEnhancerWithProps } from 'react-redux'
import { addAuthorRequestThunkCreator } from '../../../redux/reducers/author-reducer'
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

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T;
const connectStore = connect<unknown, MapDispatchToPropsType, unknown, AppStoreType>(null, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default connectStore(AddAuthorContainer);