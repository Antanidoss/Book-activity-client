import React, { useEffect, useState } from "react";
import { Col, Divider, Spin } from "antd";
import { Link } from "react-router-dom";
import { activeBooksStatisticApi } from "../../../../api";
import { ActiveBookStatisticByDay } from "../../../../api/activeBooksStatistics/models";

const StatisticsPerDay: React.FC<{day: string, userId?: string, show: boolean, onClose: () => void}> = (props) => {
    const [loading, setLoading] = useState(true);
    const [activeBookStatisticsByDay, setActiveBookStatisticByDay] = useState<ActiveBookStatisticByDay[]>();

    useEffect(() => {
        if (props.show) {
            activeBooksStatisticApi.getActiveBooksStatisticByDay(props.day, props.userId).then(res => {
                setActiveBookStatisticByDay(res.data.result);
                setLoading(false)
            });
        }
    }, [])

    if (loading) return <div style={{ textAlign: "center", marginTop: "20%" }}><Spin size="large" spinning={loading} /></div>

    const statistics = activeBookStatisticsByDay !== undefined && activeBookStatisticsByDay.length !== 0
        ? activeBookStatisticsByDay.map(statistics => {
            return (
                <Col style={{fontSize: "15px", textAlign: "center", marginBottom: "25px"}}>
                    <Link to={`/book?bookId=${statistics.bookId}`}>{statistics.bookTitle}</Link>: {statistics.countPagesRead} pages read
                </Col>
            )
        })
        : "On this day you have not read"

    return (
        <Col style={{fontSize: "15px"}}>
            <Divider>{new Date(props.day).toDateString()}</Divider>
            {statistics}
        </Col>
    )
}

export default StatisticsPerDay;