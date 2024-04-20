import React, { useState } from "react";
import { Col, Tooltip } from "antd";
import date from 'date-and-time';
import "./ReadingCalendarStatistic.css"
import StatisticsPerDayContainer from "./StatisticsPerDay/StatisticsPerDayContainer";
import { ActiveBooksStatisticType, NumberOfPagesReadPerDay } from "../../../redux/types/activeBooks/activeBooksStatisticType";

const ReadingCalendarStatistic: React.FC<{statistic: ActiveBooksStatisticType, userId?: string}> = (props: {statistic: ActiveBooksStatisticType, userId?: string}) => {
    const [curDaySelected, setCurDaySelected] = useState("");
    const [showStatisticsPerDay, setShowStatisticsPerDay] = useState(false);

    const createCalendarStatiscs = () => {
        const result: Array<JSX.Element> = [];
        const rowCount = 7;

        const currentDate = new Date();
        for (let i = 0; i < rowCount; i++) {
            result.push(<tr key={i} style={{ height: "10px" }}>{createRowStatistics(new Date(currentDate))}</tr>)

            currentDate.setDate(currentDate.getDate() - 1);
        }

        return result.reverse();
    }

    const createRowStatistics = (currentDate: Date) => {
        const rowStatistics: Array<JSX.Element> = [];
        let numberOfPagesReadPerDay: NumberOfPagesReadPerDay | undefined;
        let formatDate: string;

        for (let j = 0; j < 52; j++) {
            formatDate = date.format(currentDate, "DD-MM-YYYY");
            numberOfPagesReadPerDay = props.statistic.readingCalendar?.find(n => n.date === formatDate)

            let tooltipTitle: string;
            let backgroundColor: string;

            if (numberOfPagesReadPerDay === undefined) {
                tooltipTitle = `0 pages read on ${currentDate.toDateString()}`
                backgroundColor = "#ebedf0";
            } else {
                tooltipTitle = `${numberOfPagesReadPerDay.countPagesRead} pages read on ${currentDate.toDateString()}`
                backgroundColor = "#4096ff";
            }

            const formatDateForDayStatistic = date.format(currentDate, "MM.DD.YYYY");

            rowStatistics.unshift(
                <Tooltip key={formatDate} title={tooltipTitle}>
                    <td key={formatDate} data-date={formatDate} tabIndex={-1} onClick={() => onClickDayStatistics(formatDateForDayStatistic)} className="calendarReading-day" style={{ backgroundColor: backgroundColor }} />
                </Tooltip>
            )

            currentDate.setDate(currentDate.getDate() - 7);
        }

        return rowStatistics;
    }

    const createMonthsLabels = () => {
        const result: Array<JSX.Element> = [];
        let colSpan: number;
        const currentDate = new Date();
        const monthsCount = 12;

        for (let i = monthsCount - 1; i >= 0; i--) {
            colSpan = i % 2 === 0 ? 5 : 4;

            result.push(
                <td key={i} colSpan={colSpan} style={{ position: "relative" }}>
                    <span>{getMonthStrByNumber(date.addMonths(currentDate, -i).getMonth())}</span>
                    <span aria-hidden={true} style={{ position: "absolute", top: "0" }}></span>
                </td>)
        }

        return result;
    }

    const onClickDayStatistics = (day: string) => {
        setCurDaySelected(day);
        setShowStatisticsPerDay(!showStatisticsPerDay);
    }

    const getMonthStrByNumber = (monthNumber: number) => {
        switch (monthNumber) {
            case 0: return "Dec";
            case 1: return "Jan";
            case 2: return "Feb";
            case 3: return "Mar";
            case 4: return "Apr";
            case 5: return "May";
            case 6: return "Jun";
            case 7: return "Jul";
            case 8: return "Aug";
            case 9: return "Sep";
            case 10: return "Oct";
            case 11: return "Nov";
        }
    }

    return (
        <>
            <Col style={{ marginTop: "100px", textAlign: "center", overflowX: "auto" }}>
                <div style={{ display: "inline-block" }}>
                    <div style={{ textAlign: "left", paddingBottom: "10px" }}>{props.statistic.numberPagesReadPerYear} pages read per year</div>
                    <table id="calendarStatistics-table">
                        <thead>
                            <tr style={{ height: "13px" }}>
                                <td key={0} style={{ width: "10px" }} />
                                {createMonthsLabels()}
                            </tr>
                        </thead>
                        <tbody>
                            {createCalendarStatiscs()}
                        </tbody>
                    </table>
                </div>
            </Col>

            <StatisticsPerDayContainer day={curDaySelected} show={showStatisticsPerDay} userId={props.userId} onClose={() => {setShowStatisticsPerDay(false)}} />
        </>
    )
}

export default ReadingCalendarStatistic;