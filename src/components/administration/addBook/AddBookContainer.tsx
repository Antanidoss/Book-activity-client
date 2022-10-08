import React from 'react';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { addBookRequestThunkCreator } from '../../../redux/book-reducer';
import { getAuthorsByNameRequestThunkCreator } from '../../../redux/author-reducer';
import { AppStoreType } from '../../../redux/redux-store';
import AddBook from './AddBook';
import { AuthorType } from '../../../types/authorType';
import { getAuthors } from '../../../redux/author-slectors';

const AddBookContainer: React.FC<PropsType> = (props) => {
    return <AddBook {...props} />
}

type MapDispatchToPropsType = {
    addBook: typeof addBookRequestThunkCreator,
    getAuthors: typeof getAuthorsByNameRequestThunkCreator
}

const mapDispatchToProps: MapDispatchToPropsType = {
    addBook: addBookRequestThunkCreator,
    getAuthors: getAuthorsByNameRequestThunkCreator
}

type MapStateToPropsType = {
    authors: Array<AuthorType>
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    authors: getAuthors(state)
})

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T;
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, unknown, AppStoreType>(mapStateToProps, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default connectStore(AddBookContainer);