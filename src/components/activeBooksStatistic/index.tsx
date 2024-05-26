import React, { useEffect, useState } from "react";
import { Divider, Spin } from 'antd';
import ReadingCalendarStatistic from "./ReadingCalendarStatistic";
import { activeBooksStatisticApi } from "../../api";
import { ActiveBooksStatistic as ActiveBooksStatisticModel } from "../../api/activeBooksStatistics/models";

const ActiveBooksStatistic: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [statistic, setStatistic] = useState<ActiveBooksStatisticModel>();

    useEffect(() => {
        activeBooksStatisticApi.getActiveBooksStatistic().then(result => {
            setStatistic(result.data);
            setLoading(false);
        });
    }, [])

    if (loading) return <div id="1233122" style={{textAlign: "center", marginTop: "20%"}}><Spin size="large" spinning={loading} /></div>

    return (
        <>
            <Divider style={{ marginTop: "50px" }} orientation="center">Calendar statistics</Divider>
            <ReadingCalendarStatistic statistic={statistic as ActiveBooksStatisticModel} />

            <Divider style={{marginTop: "100px"}} orientation="center">Total stats</Divider>
            <div style={{ "textAlign": "center", "marginTop": "50px" }}>
                <h3>Average number of pages read per day: {statistic?.averagePagesReadPerDay}</h3>
                <h3>Average number of pages read per week: {statistic?.averagePagesReadPerWeek}</h3>
                <h3>Average number of pages read per mouth: {statistic?.averagePagesReadPerMouth}</h3>
            </div>
        </>
    )
}

export default ActiveBooksStatistic;