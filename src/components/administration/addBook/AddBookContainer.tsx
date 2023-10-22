import React from 'react';
import { connect } from 'react-redux';
import { addBookRequestThunkCreator, getAuthorsByNameRequestThunkCreator } from '../../../redux/reducers/book-reducer';
import { AppStoreType, ExtractConnectType } from '../../../redux/redux-store';
import AddBook from './AddBook';
import { AuthorForAddBookType } from '../../../types/books/authorForAddBookType';
import { getAuthorsForAddBook } from '../../../redux/selectors/book-selectors';

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
    authors: Array<AuthorForAddBookType>
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    authors: getAuthorsForAddBook(state)
})

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, unknown, AppStoreType>(mapStateToProps, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default connectStore(AddBookContainer);