import React from 'react';
import { connect } from 'react-redux';
import { addBookRequestThunkCreator } from '../../../redux/reducers/book-reducer';
import { getAuthorsByNameRequestThunkCreator } from '../../../redux/reducers/author-reducer';
import { AppStoreType, ExtractConnectType } from '../../../redux/redux-store';
import AddBook from './AddBook';
import { AuthorType } from '../../../types/authors/authorType';
import { getAuthors } from '../../../redux/selectors/author-slectors';

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

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, unknown, AppStoreType>(mapStateToProps, mapDispatchToProps);
export type PropsType = ExtractConnectType<typeof connectStore>;

export default connectStore(AddBookContainer);