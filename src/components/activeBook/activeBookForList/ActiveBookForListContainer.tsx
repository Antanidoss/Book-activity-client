import React from 'react';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { removeActiveBookThunkCreator } from '../../../redux/reducers/activeBook-reducer';
import { AppStoreType } from '../../../redux/redux-store';
import { ActiveBook } from '../../../types/activeBookType';
import ActiveBookForList from './ActiveBookForList';

const ActiveBookForListContainer: React.FC<PropsType> = (props) => {
    return (
        <ActiveBookForList {...props} />
    )
}

type MapDispatchToPropsType = {
    removeActiveBook: typeof removeActiveBookThunkCreator,
}

const mapDispatchToProps =  {
    removeActiveBook: removeActiveBookThunkCreator,
}

type MapStateToPropsType = {
    activeBook: ActiveBook
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => ({
    activeBook: ownProps.activeBook
})

type OwnPropsType = {
    activeBook: ActiveBook,
}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(ActiveBookForListContainer)