export type BookFilterType = {
    bookTitle?: string | null
    averageRatingFrom: number,
    averageRatingTo: number,
}

export const BookFilterTypeDefault: BookFilterType = {
    averageRatingFrom: 0,
    averageRatingTo: 5
}