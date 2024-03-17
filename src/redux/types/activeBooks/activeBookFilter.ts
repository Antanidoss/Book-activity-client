export enum SortBy {
    CreateDate,
    CreateDateDescending,
    UpdateDateDescending,
}

export type ActiveBookFilterType = {
    bookTitle?: string,
    withFullRead: boolean,
    sortBy: SortBy
}

export const ActiveBookFilterDefault: ActiveBookFilterType = {
    withFullRead: true,
    sortBy: SortBy.CreateDateDescending
}

export const isDefaultFilter = (filter: ActiveBookFilterType) => {
    return (filter.bookTitle === undefined || filter.bookTitle === "") && filter.sortBy === SortBy.CreateDateDescending && filter.withFullRead;
}