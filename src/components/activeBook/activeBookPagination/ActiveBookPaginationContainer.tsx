import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getActiveBooksByFilterThunkCreator, updateCurrentPageNumber } from '../../../redux/activeBook-reducer';
import { getPageNumber, getPageSize, getTotalActiveBookCount } from '../../../redux/activeBook-selectors';
import { AppStoreType } from '../../../redux/redux-store';
import ActiveBookPagination from './ActiveBookPagination';

const ActiveBookPaginationContainer: React.FC<PropsType> = (props) => {
    return <ActiveBookPagination {...props} />
}

type MapStateToPropsType = {
    currentPage: number,
    totalActiveBookCount: number,
    pageSize: number
}

type MapDispatchToPropsType = {
    getActiveBooksByFilter: typeof getActiveBooksByFilterThunkCreator
    updateCurrentPage: typeof updateCurrentPageNumber
}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
   currentPage: getPageNumber(state),
   totalActiveBookCount: getTotalActiveBookCount(state),
   pageSize: getPageSize(state)
})

const mapDispatchToProps: MapDispatchToPropsType = {
    getActiveBooksByFilter: getActiveBooksByFilterThunkCreator,
    updateCurrentPage: updateCurrentPageNumber
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, mapDispatchToProps)
)(ActiveBookPaginationContainer);