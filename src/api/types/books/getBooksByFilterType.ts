export type GetBooksByFilterType = {
    bookTitle?: string | null
    averageRatingFrom: number,
    averageRatingTo: number,
    categories: Array<{value: string}>
}