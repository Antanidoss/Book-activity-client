import React from 'react';
import { connect } from 'react-redux';
import { getActiveBooksByFilterThunkCreator, updateCurrentPageNumber, updateFilter } from '../../../redux/reducers/activeBook-reducer';
import { getFilter } from '../../../redux/selectors/activeBook-selectors';
import { AppStoreType, ExtractConnectType } from '../../../redux/redux-store';
import ActiveBookFilter from './ActiveBookFilter';
import { ActiveBookFilterType } from '../../../redux/types/activeBooks/activeBookFilter';

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

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, unknown, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(ActiveBookFilterContainer);