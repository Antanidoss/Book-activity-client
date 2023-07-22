export type ActiveBookOfListType = {
    id: string,
    totalNumberPages: number,
    numberPagesRead: number,
    book: {
        id: string,
        title: string,
        imageData: ArrayBuffer,
        bookRatingId?: string
    }
    hasOpinion: boolean
}