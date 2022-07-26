import React from 'react';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { updateActiveBookThunkCreator } from '../../../redux/activeBook-reducer';
import { AppStoreType } from '../../../redux/redux-store';
import UpdateActiveBook from './UpdateActiveBook';

const UpdateActiveBookContainer: React.FC<PropsType> = (props) => {
    return <UpdateActiveBook {...props} />
}

type MapDispatchToPropsType = {
    updateActiveBook: typeof updateActiveBookThunkCreator,
}

const mapDispatchToProps = {
    updateActiveBook: updateActiveBookThunkCreator,
}

type MapStateToPropsType = {
    activeBookId: string,
    numberPagesRead: number,
    totalNumberPages: number
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => ({
    activeBookId: ownProps.activeBookId,
    numberPagesRead: ownProps.numberPagesRead,
    totalNumberPages: ownProps.totalNumberPages

})

type OwnPropsType = {
    activeBookId: string,
    numberPagesRead: number,
    totalNumberPages: number
}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(UpdateActiveBookContainer)