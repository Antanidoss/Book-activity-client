import React from 'react';
import { connect } from 'react-redux';
import { getActiveBooksByFilterThunkCreator, updateCurrentPageNumber, updateFilter } from '../../../redux/reducers/activeBook-reducer';
import { getFilter } from '../../../redux/selectors/activeBook-selectors';
import { AppStoreType, ExtractConnectType } from '../../../redux/redux-store';
import { ActiveBookFilterType } from '../../../types/activeBooks/activeBookFilterType';
import ActiveBookFilter from './ActiveBookFilter';

const ActiveBookFilterContainer: React.FC<PropsType> = (props) => {
    return <ActiveBookFilter {...props}/>
}

type MapDispatchToPropsType = {
    getActiveBooks: typeof getActiveBooksByFilterThunkCreator,
    updateActiveBookFilter: typeof updateFilter,
    updateCurrentPageNumber: typeof updateCurrentPageNumber
}

const mapDispatchToProps = {
    getActiveBooks: getActiveBooksByFilterThunkCreator,
    updateActiveBookFilter: updateFilter,
    updateCurrentPageNumber: updateCurrentPageNumber
}

type MapStateToPropsType = {
    activeBookFilter: ActiveBookFilterType
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    activeBookFilter: getFilter(state)
})

type OwnPropsType = {}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(ActiveBookFilterContainer);