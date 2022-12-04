import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { getActiveBooksStatisticThunkCreator } from "../../../redux/activeBooksStatistic-reducer";
import { getCurUserStatistics } from "../../../redux/activeBooksStatistic-selectors";
import { AppStoreType } from "../../../redux/redux-store";
import { getIsAuthenticated } from "../../../redux/user-selectors";
import { ActiveBooksStatisticType } from "../../../types/activeBooksStatisticType";
import ActiveBooksStatistic from "../ActiveBooksStatistic";

const ActiveBooksStatisticForCurUserContainer: React.FC<PropsType> = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.getActiveBooksStatistic().then(() => setLoading(false));
    }, [])

    return loading ? <div style={{textAlign: "center", marginTop: "20%"}}><Spin size="large" spinning={loading} /></div> : <ActiveBooksStatistic {...props.statistic} />
}

type MapDispatchToPropsType = {
    getActiveBooksStatistic: typeof getActiveBooksStatisticThunkCreator
}

const mapDispatchToProps = {
    getActiveBooksStatistic: getActiveBooksStatisticThunkCreator
}

type MapStateToPropsType = {
   statistic: ActiveBooksStatisticType,
   isAuthenticated: boolean
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    statistic: getCurUserStatistics(state) as ActiveBooksStatisticType,
    isAuthenticated: getIsAuthenticated(state),
})

type OwnPropsType = {}

type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T
const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default compose<React.ComponentType>(connectStore, withAuthRedirect)(ActiveBooksStatisticForCurUserContainer);