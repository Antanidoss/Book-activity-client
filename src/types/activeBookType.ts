import { BookNoteType } from "./bookNoteType"
import { BookType } from "./bookType"

export type ActiveBook = {
    id: string,
    totalNumberPages: number,
    numberPagesRead: number,
    book: BookType
    notes?: Array<BookNoteType>
}