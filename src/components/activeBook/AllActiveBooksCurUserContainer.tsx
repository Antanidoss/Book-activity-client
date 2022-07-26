import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getActiveBooksByFilterThunkCreator, removeActiveBookThunkCreator } from '../../redux/activeBook-reducer';
import { getActiveBooks, getPageNumber, getTotalActiveBookCount } from '../../redux/activeBook-selectors';
import { AppStoreType } from '../../redux/redux-store';
import { getIsAuthenticated } from '../../redux/user-selectors';
import { ActiveBook } from '../../types/activeBookType';
import AllCurUserActiveBooks from './AllActiveBooksCurUser';

const AllCurUserActiveBooksContainer: React.FC<PropsType> = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.getActiveBooks().then(() => setLoading(false));
    }, [])

    return loading ? <div style={{textAlign: "center", marginTop: "20%"}}><Spin size="large" spinning={loading} /></div> : <AllCurUserActiveBooks {...props} />
}

type MapDispatchToPropsType = {
    getActiveBooks: typeof getActiveBooksByFilterThunkCreator,
    removeActiveBook: typeof removeActiveBookThunkCreator
}

const mapDispatchToProps = {
    getActiveBooks: getActiveBooksByFilterThunkCreator,
    removeActiveBook: removeActiveBookThunkCreator,
}

type MapStateToPropsType = {
    activeBooks: Array<ActiveBook>,
    isAuthenticated: boolean,
    pageNumber: number,
    totalActiveBookCount: number
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    activeBooks: getActiveBooks(state),
    isAuthenticated: getIsAuthenticated(state),
    pageNumber: getPageNumber(state),
    totalActiveBookCount: getTotalActiveBookCount(state)
})

type OwnPropsType = {

}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default compose<React.ComponentType>(connectStore, withAuthRedirect)(AllCurUserActiveBooksContainer);