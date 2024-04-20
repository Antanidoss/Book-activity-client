import React from 'react';
import { connect } from 'react-redux';
import { addBookRequestThunkCreator, getAuthorsByNameRequestThunkCreator, getCategoriesByTitleRequestThunkCreator } from '../../../redux/reducers/book-reducer';
import { AppStoreType, ExtractConnectType } from '../../../redux/redux-store';
import AddBook from './AddBook';

const AddBookContainer: React.FC<PropsType> = (props) => {
    return <AddBook {...props} />
}

type MapDispatchToPropsType = {
    addBook: typeof addBookRequestThunkCreator,
    getAuthors: typeof getAuthorsByNameRequestThunkCreator,
    getCategories: typeof getCategoriesByTitleRequestThunkCreator
}

const mapDispatchToProps: MapDispatchToPropsType = {
    addBook: addBookRequestThunkCreator,
    getAuthors: getAuthorsByNameRequestThunkCreator,
    getCategories: getCategoriesByTitleRequestThunkCreator
}

const connectStore = connect<unknown, MapDispatchToPropsType, unknown, AppStoreType>(null, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default connectStore(AddBookContainer);