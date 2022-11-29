import React from "react";
import { ActiveBooksStatisticType } from "../../types/activeBooksStatisticType";
import { Divider, List } from 'antd';

const ActiveBooksStatistic: React.FC<ActiveBooksStatisticType> = (statistic: ActiveBooksStatisticType) => {
    return (
        <>
            <Divider orientation="center">Total stats</Divider>
            <div style={{"textAlign": "center", "marginTop": "50px"}}>
                <h3>Average number of pages read per day: {statistic.averagePagesReadPerDay}</h3>
                <h3>Average number of pages read per week: {statistic.averagePagesReadPerWeek}</h3>
                <h3>Average number of pages read per mouth: {statistic.averagePagesReadPerMouth}</h3>
            </div>
        </>
    )
}

export default ActiveBooksStatistic;