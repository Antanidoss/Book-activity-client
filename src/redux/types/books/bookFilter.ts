export type BookFilterType = {
    bookTitle?: string | null
    averageRatingFrom: number,
    averageRatingTo: number,
    categories: Array<{label: string, value: string}>
}

export const BookFilterTypeDefault: BookFilterType = {
    averageRatingFrom: 0,
    averageRatingTo: 5,
    categories: []
}

export const isDefaultFilter = (filter: BookFilterType) => {
    return (filter.bookTitle === undefined || filter.bookTitle === "")
        && filter.averageRatingFrom === 0
        && filter.averageRatingTo === 5
        && !filter.categories.length 
}