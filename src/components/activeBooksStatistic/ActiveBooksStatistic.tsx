import React from "react";
import { ActiveBooksStatisticType } from "../../types/activeBooksStatisticType";

const ActiveBooksStatistic: React.FC<ActiveBooksStatisticType> = (statistic: ActiveBooksStatisticType) => {
    return (
        <div>{statistic.averagePagesReadPerDay}</div>
    )
}

export default ActiveBooksStatistic;