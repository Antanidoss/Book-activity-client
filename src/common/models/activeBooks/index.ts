export enum SortBy {
  CreateDate,
  CreateDateDescending,
  UpdateDateDescending,
}

export type ActiveBookFilterType = {
  bookTitle?: string;
  withFullRead: boolean;
  sortBy: SortBy;
};

export const isActiveBookDefaultFilter = (filter: ActiveBookFilterType) => {
  return (
    (filter.bookTitle === undefined || filter.bookTitle === '') &&
    filter.sortBy === SortBy.CreateDateDescending &&
    filter.withFullRead
  );
};
