import { BookOpinionType } from "../bookOpinionType"

export type ActiveBookFilterResultType = {
    id: string,
    totalNumberPages: number,
    numberPagesRead: number,
    book: {
        id: string,
        title: string,
        imageData: ArrayBuffer
    }
    notes?: Array<{
        id: string,
        note: string,
        noteColor: number
    }>,
    bookRatingId: string,
    bookOpinion: BookOpinionType
}

export type ActiveBooksFilterResultType = {
    activeBooks: { items:  ActiveBookFilterResultType[] },
    totalCount: number
}