import { BookNoteType } from "./bookNoteType"
import { BookOpinionType } from "./bookOpinionType"

export type ActiveBook = {
    id: string,
    totalNumberPages: number,
    numberPagesRead: number,
    book: {
        id: string,
        title: string,
        imageData: ArrayBuffer,
        bookRatingId?: string
    }
    notes?: Array<BookNoteType>,
    bookOpinion?: BookOpinionType
}