export type ActiveBookFilterType = {
    bookTitle?: string,
    withFullRead: boolean,
    sortBy: SortBy
}

enum SortBy {
    CreateDate,
    CreateDateDescending,
    UpdateDateDescending,
}