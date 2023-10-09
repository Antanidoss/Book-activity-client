import React, { useEffect, useState } from "react";
import { PropsType } from "./StatisticsPerDayContainer";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";

const StatisticsPerDay: React.FC<PropsType> = (props) => {
    var statistics = props.activeBookStatisticsByDay !== undefined && props.activeBookStatisticsByDay.length != 0
        ? props.activeBookStatisticsByDay.map(statistics => {
            return (
                <Col style={{fontSize: "15px", textAlign: "center", marginBottom: "20px"}}><Link to="#">{statistics.bookTitle}</Link>: {statistics.countPagesRead} pages read</Col>
            )
        })
        : <div></div>

    return (
        <Col>
            {statistics}
        </Col>
    )
}

export default StatisticsPerDay;