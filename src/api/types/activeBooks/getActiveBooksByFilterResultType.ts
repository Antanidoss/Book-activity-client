export type GetActiveBooksByFilterResultType = {
    activeBooks: { 
        totalCount: number,
        items: Array<{
            id: string,
            totalNumberPages: number,
            numberPagesRead: number,
            book: {
                id: string,
                title: string,
                imageDataBase64: string,
                averageRating: number,
                hasOpinion: boolean,
                bookOpinions: {
                    totalCount: number
                }
            },
        }>
    }
}