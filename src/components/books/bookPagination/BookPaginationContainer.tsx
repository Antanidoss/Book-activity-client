import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getBooksByFilter, updateCurrentPage } from '../../../redux/reducers/book-reducer';
import { getPageNumber, getPageSize, getTotalBookCount } from '../../../redux/selectors/book-selectors';
import { AppStoreType } from '../../../redux/redux-store';
import BookPagination from './BookPagination';

const BookPaginationContainer: React.FC<PropsType> = (props) => {
    return <BookPagination {...props} />
}

type MapStateToPropsType = {
    currentPage: number,
    totalBookCount: number,
    pageSize: number
}

type MapDispatchToPropsType = {
    getBooksByFilter: typeof getBooksByFilter
    updateCurrentPage: typeof updateCurrentPage
}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
   currentPage: getPageNumber(state),
   totalBookCount: getTotalBookCount(state),
   pageSize: getPageSize(state)
})

const mapDispatchToProps: MapDispatchToPropsType = {
    getBooksByFilter: getBooksByFilter,
    updateCurrentPage: updateCurrentPage
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, mapDispatchToProps)
)(BookPaginationContainer);