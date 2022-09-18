import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addBookRequestThunkCreator } from '../../../redux/book-reducer';
import { AppStoreType } from '../../../redux/redux-store';
import AddBook from './AddBook';

const AddBookContainer: React.FC<PropsType> = (props) => {
    return <AddBook {...props} />
}

type MapDispatchToPropsType = {
    addBook: typeof addBookRequestThunkCreator
}

const mapDispatchToProps = ({
    addBook: addBookRequestThunkCreator
})

export type PropsType = MapDispatchToPropsType

export default compose<React.ComponentType>(
    connect<null, MapDispatchToPropsType, null, AppStoreType>(null, mapDispatchToProps)
)(AddBookContainer);