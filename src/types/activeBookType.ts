import { BookNoteType } from "./bookNoteType"
import { BookOpinionType } from "./bookOpinionType"

export type ActiveBook = {
    id: string,
    totalNumberPages: number,
    numberPagesRead: number,
    bookId: string,
    bookTitle: string,
    imageData: string,
    notes?: Array<BookNoteType>,
    bookRatingId?: string
    bookOpinion?: BookOpinionType
}