import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { getActiveBooksStatisticThunkCreator } from "../../redux/reducers/activeBooksStatistic-reducer";
import { getCurUserStatistics } from "../../redux/selectors/activeBooksStatistic-selectors";
import { AppStoreType, ExtractConnectType } from "../../redux/redux-store";
import { getIsAuthenticated } from "../../redux/selectors/user-selectors";
import { ActiveBooksStatisticType } from "../../types/activeBooks/activeBooksStatisticType";
import ActiveBooksStatistic from "./ActiveBooksStatistic";

const ActiveBooksStatisticForCurUserContainer: React.FC<PropsType> = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.getActiveBooksStatistic().then(() => setLoading(false));
    }, [])

    return loading
        ? <div style={{textAlign: "center", marginTop: "20%"}}><Spin size="large" spinning={loading} /></div>
        : <ActiveBooksStatistic {...props} />
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

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => ({
    statistic: getCurUserStatistics(state) as ActiveBooksStatisticType,
    isAuthenticated: getIsAuthenticated(state)
})

type OwnPropsType = {}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default compose<React.ComponentType>(connectStore, withAuthRedirect)(ActiveBooksStatisticForCurUserContainer);