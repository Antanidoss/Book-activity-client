export type ActiveBooksStatisticType = {
    readingCalendar?: Array<NumberOfPagesReadPerDay>,
    averagePagesReadPerDay: number,
    averagePagesReadPerWeek: number,
    averagePagesReadPerMouth: number,
    numberPagesReadPerYear: number
}

export type NumberOfPagesReadPerDay = {
    countPagesRead: number,
    date: string
}