import React from 'react';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { removeActiveBookThunkCreator } from '../../../redux/reducers/activeBook-reducer';
import { AppStoreType } from '../../../redux/redux-store';
import { ActiveBookOfListType } from '../../../types/activeBooks/activeBookOfListType';
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
    activeBook: ActiveBookOfListType
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => ({
    activeBook: ownProps.activeBook
})

type OwnPropsType = {
    activeBook: ActiveBookOfListType,
}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(ActiveBookForListContainer)