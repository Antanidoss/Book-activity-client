export type GetBooksByFilterResultType = {
    books: {
        totalCount: number,
        items: Array<{
            id: string,
            title: string,
            description: string,
            imageDataBase64: string,
            isActiveBook: boolean,
            averageRating: number,
            bookOpinions: {
                totalCount: number
            }
        }>
    }
}