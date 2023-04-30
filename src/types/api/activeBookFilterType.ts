export type ActiveBookFilterType = {
    bookTitle?: string,
    withFullRead: boolean,
    sortBy: SortBy
}

export enum SortBy {
    CreateDate,
    CreateDateDescending,
    UpdateDateDescending,
}