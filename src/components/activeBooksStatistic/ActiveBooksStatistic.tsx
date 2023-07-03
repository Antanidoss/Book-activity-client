import React from "react";
import { ActiveBooksStatisticType } from "../../types/activeBooksStatisticType";
import { Divider, Tooltip } from 'antd';
import date from 'date-and-time';
import "./ActiveBooksStatistic.css"

const ActiveBooksStatistic: React.FC<ActiveBooksStatisticType> = (statistic: ActiveBooksStatisticType) => {
    const createCalendarStatiscs = () => {
        let result: Array<JSX.Element> = [];
        const rowCount = 7;

        let currentDate = new Date();
        for (let i = 0; i < rowCount; i++) {
            result.push(<tr style={{ height: "10px" }}>{createRowStatistics(currentDate)}</tr>)

            currentDate = date.addDays(currentDate, -1);
        }

        return result;
    }

    const createRowStatistics = (currentDate: Date) => {
        let rowStatistics: Array<JSX.Element> = [];

        for (let j = 0; j < 52; j++) {
            rowStatistics.unshift(
                <Tooltip title={`${0} pages read on ${currentDate.toDateString()}`}>
                    <td data-date={date.format(currentDate, "DD-MM-YYYY")} tabIndex={-1} className="calendarReading-day"><span></span></td>
                </Tooltip>
            )

            currentDate = date.addDays(currentDate, -7);

            if (currentDate > new Date()) {
                break;
            }
        }

        return rowStatistics;
    }

    const createMonthsLabels = () => {
        let result: Array<JSX.Element> = [];
        let colSpan: number;
        const currentDate = new Date();
        const monthsCount = 11;

        for (let i = monthsCount; i >= 0; i--) {

            if (i == 0 || i == 2 || i == 4 || i == 6) {
                colSpan = 5;
            } else {
                colSpan = 4
            }

            result.push(<td colSpan={colSpan} style={{ position: "relative" }}>
                <span>{getMonthStrByNumber(date.addMonths(currentDate, -i).getMonth())}</span>
                <span aria-hidden={true} style={{ position: "absolute", top: "0" }}></span>
            </td>)
        }

        return result;
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
            <Divider style={{marginTop: "50px"}} orientation="center">Calendar statistics</Divider>
            <div style={{ maxWidth: "100%" }}>
                <table id="calendarStatistics-table">
                    <thead>
                        <tr style={{ height: "13px" }}>
                            <td style={{ width: "10px" }} />
                            { createMonthsLabels() }
                        </tr>
                    </thead>
                    <tbody>
                        { createCalendarStatiscs() }
                    </tbody>
                </table>
            </div>

            <Divider style={{marginTop: "100px"}} orientation="center">Total stats</Divider>
            <div style={{ "textAlign": "center", "marginTop": "50px" }}>
                <h3>Average number of pages read per day: {statistic.averagePagesReadPerDay}</h3>
                <h3>Average number of pages read per week: {statistic.averagePagesReadPerWeek}</h3>
                <h3>Average number of pages read per mouth: {statistic.averagePagesReadPerMouth}</h3>
            </div>
        </>
    )
}

export default ActiveBooksStatistic;