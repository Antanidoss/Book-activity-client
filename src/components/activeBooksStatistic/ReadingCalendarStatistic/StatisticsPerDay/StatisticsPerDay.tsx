import React from "react";
import { PropsType } from "./StatisticsPerDayContainer";
import { Col, Divider } from "antd";
import { Link } from "react-router-dom";

const StatisticsPerDay: React.FC<PropsType> = (props) => {
    var statistics = props.activeBookStatisticsByDay !== undefined && props.activeBookStatisticsByDay.length != 0
        ? props.activeBookStatisticsByDay.map(statistics => {
            return (
                <Col style={{fontSize: "15px", textAlign: "center", marginBottom: "25px"}}><Link to="#">{statistics.bookTitle}</Link>: {statistics.countPagesRead} pages read</Col>
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