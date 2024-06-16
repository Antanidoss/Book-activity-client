export type ActiveBooksStatistic = {
  readingCalendar?: Array<NumberOfPagesReadPerDay>;
  averagePagesReadPerDay: number;
  averagePagesReadPerWeek: number;
  averagePagesReadPerMouth: number;
  numberPagesReadPerYear: number;
};

export type NumberOfPagesReadPerDay = {
  countPagesRead: number;
  date: string;
};

export type ActiveBookStatisticByDay = {
  bookId?: string;
  bookTitle?: string;
  bookImageData?: string;
  countPagesRead: number;
};
