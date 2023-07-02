import React from "react";
import { ActiveBooksStatisticType } from "../../types/activeBooksStatisticType";
import { Divider } from 'antd';

const ActiveBooksStatistic: React.FC<ActiveBooksStatisticType> = (statistic: ActiveBooksStatisticType) => {
    const createCalendarStatiscs = () => {
        let result: Array<JSX.Element> = [];
        const rowCount = 7;

        for (let i = 0; i < rowCount; i++) {
            result.push(<tr style={{ height: "10px" }}>{createRowStatistics()}</tr>)
        }

        return result;
    }

    const createRowStatistics = () => {
        let rowStatistics: Array<JSX.Element> = [];

        for (let j = 0; j < 52; j++) {
            rowStatistics.push(<td tabIndex={-1} style={{
                width: "10px",
                borderRadius: "2px",
                fill: "ebedf0",
                backgroundColor: "#ebedf0",
                outline: "1px solid rgba(27, 31, 35, 0.06)"
            }}><span></span></td>)
        }

        return rowStatistics;
    }

    const createMonthsLabels = () => {
        let result: Array<JSX.Element> = [];
        let colSpan: number;
        const monthNumber = new Date().getMonth()
        const monthsCount = 11;

        for (let i = monthsCount; i >= 0; i--) {

            if (i == 0 || i == 2 || i == 4 || i == 6) {
                colSpan = 5;
            } else {
                colSpan = 4
            }

            result.push(<td colSpan={colSpan} style={{ position: "relative" }}>
                <span>{getMonthStrByNumber(monthNumber - i)}</span>
                <span aria-hidden={true} style={{ position: "absolute", top: "0" }}></span>
            </td>)
        }

        return result;
    }

    const getMonthStrByNumber = (monthNumber: number) => {
        if (monthNumber < 1) {
            monthNumber = 12 - -monthNumber
        }

        switch (monthNumber) {
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
            case 12: return "Dec";
        }
    }

    return (
        <>
            <Divider orientation="center">Total stats</Divider>
            <div style={{ "textAlign": "center", "marginTop": "50px" }}>
                <h3>Average number of pages read per day: {statistic.averagePagesReadPerDay}</h3>
                <h3>Average number of pages read per week: {statistic.averagePagesReadPerWeek}</h3>
                <h3>Average number of pages read per mouth: {statistic.averagePagesReadPerMouth}</h3>
            </div>
            <div style={{ maxWidth: "100%", marginTop: "200px" }}>
                <table style={{ borderSpacing: "7px", borderCollapse: "separate", margin: "0 auto", border: "1px solid #d0d7de", borderRadius: "6px", padding: "20px" }}>
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
        </>
    )
}

export default ActiveBooksStatistic;