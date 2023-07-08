export type ActiveBooksStatisticType = {
    readingCalendar: Array<NumberOfPagesReadPerDay>,
    averagePagesReadPerDay: number,
    averagePagesReadPerWeek: number,
    averagePagesReadPerMouth: number,
    amountDaysOfReads: number
}

export type NumberOfPagesReadPerDay = {
    countPagesRead: number,
    date: string
}