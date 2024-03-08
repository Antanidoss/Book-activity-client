import React, { useEffect, useState } from "react";
import { getActiveBookStatisticByDayThunkCreator } from "../../../../redux/reducers/activeBooksStatistic-reducer";
import { getActiveBookStatisticsByDay } from "../../../../redux/selectors/activeBooksStatistic-selectors";
import { AppStoreType, ExtractConnectType } from "../../../../redux/redux-store";
import { connect } from "react-redux";
import { Spin } from "antd";
import CustomDrawer from "../../../common/CustomDrawer";
import StatisticsPerDay from "./StatisticsPerDay";
import { ActiveBookStatisticByDayType } from "../../../../redux/types/activeBooks/activeBookStatisticByDayType";

const StatisticsPerDayContainer: React.FC<PropsType> = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.show) {
            props.getActiveBookStatisticByDay(props.day, props.userId).then(() => setLoading(false));
        }
    }, [props.show])

    return (
        <CustomDrawer onClose={props.onClose} open={props.show} direction="right" size={600}>
            {loading ? <div style={{ textAlign: "center", marginTop: "20%" }}><Spin size="large" spinning={loading} /></div> : <StatisticsPerDay {...props} />}
        </CustomDrawer>
    )
}

type MapDispatchToPropsType = {
    getActiveBookStatisticByDay: typeof getActiveBookStatisticByDayThunkCreator
}

const mapDispatchToProps = {
    getActiveBookStatisticByDay: getActiveBookStatisticByDayThunkCreator
}

type MapStateToPropsType = {
    activeBookStatisticsByDay: Array<ActiveBookStatisticByDayType>,
    day: string,
    userId?: string,
    show: boolean,
    onClose: () => void
}

const mapStateToProps = (state: AppStoreType, ownProps: OwnPropsType): MapStateToPropsType => ({
    activeBookStatisticsByDay: getActiveBookStatisticsByDay(state) as Array<ActiveBookStatisticByDayType>,
    day: ownProps.day,
    userId: ownProps.userId,
    show: ownProps.show,
    onClose: ownProps.onClose
})

type OwnPropsType = {
    day: string,
    userId?: string,
    show: boolean,
    onClose: () => void
}

const connectStore = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps, mapDispatchToProps)
export type PropsType = ExtractConnectType<typeof connectStore>

export default connectStore(StatisticsPerDayContainer);