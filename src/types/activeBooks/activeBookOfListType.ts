export type ActiveBookOfListType = {
    id: string,
    totalNumberPages: number,
    numberPagesRead: number,
    book: {
        id: string,
        title: string,
        imageDataBase64: string,
        bookRatingId?: string,
        averageRating: number
    }
    hasOpinion: boolean
}