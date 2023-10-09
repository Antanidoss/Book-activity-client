import React from "react";
import { Divider } from 'antd';
import ReadingCalendarStatistic from "./ReadingCalendarStatistic/ReadingCalendarStatistic";
import { PropsType } from "./ActiveBooksStatisticForCurUserContainer";

const ActiveBooksStatistic: React.FC<PropsType> = (props: PropsType) => {
    return (
        <>
            <Divider style={{ marginTop: "50px" }} orientation="center">Calendar statistics</Divider>
            <ReadingCalendarStatistic {...props} />

            <Divider style={{marginTop: "100px"}} orientation="center">Total stats</Divider>
            <div style={{ "textAlign": "center", "marginTop": "50px" }}>
                <h3>Average number of pages read per day: {props.statistic.averagePagesReadPerDay}</h3>
                <h3>Average number of pages read per week: {props.statistic.averagePagesReadPerWeek}</h3>
                <h3>Average number of pages read per mouth: {props.statistic.averagePagesReadPerMouth}</h3>
            </div>
        </>
    )
}

export default ActiveBooksStatistic;